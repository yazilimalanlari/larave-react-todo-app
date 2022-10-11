import { useState } from 'react';
import api from '../app/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = e => {
        setIsSubmit(true);
        e.preventDefault();
        
        if (!email || !password) {
            alert('E-Mail and password is required!');
            setIsSubmit(false);
        } else {
            api.post('auth/login', { email, password })
                .then(result => {
                    if (result.status !== 'success') throw new Error();
                    localStorage.setItem('auth', true);
                    navigate('/');
                })
                .catch(result => {
                    setError(result.message === 'Unauthorized' ? 'You entered the wrong email or password!' : 'There is a problem!')
                    setIsSubmit(false);
                });
        }
    }

    return (
        <div className="content">
            <div className="login">
                <h1>Sign In</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="E-Mail address" onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    {error != null && <div className="error">{error}</div>}
                    <button disabled={isSubmit}>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;