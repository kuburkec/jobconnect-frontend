import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JobBoard from './pages/JobBoard';
import JobDetails from './pages/JobDetails';
import Auth from './pages/Auth';
import CompanyDashboard from './pages/CompanyDashboard';
import UserProfile from './pages/UserProfile';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<JobBoard />} />
                        <Route path="/job/:id" element={<JobDetails />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/dashboard" element={<CompanyDashboard />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;