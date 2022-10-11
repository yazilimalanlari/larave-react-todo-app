import Todo from '../components/todo';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth') !== 'true') {
            navigate('/login');
        }
    }, []);

    return (
        <div className="content">
            <Todo />
        </div>
    );
}

export default Home;