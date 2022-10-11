import '../assets/css/theme.scss';
import Layout from '../components/global/Layout';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

// Pages
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App;