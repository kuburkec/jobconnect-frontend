import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, LogOut, LayoutDashboard, Sun, Moon, Globe, User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDark = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        setLangMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/auth');
    };

    const langLabels: Record<string, string> = { en: 'English', sq: 'Shqip', mk: 'Македонски' };
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-black/20 border-b border-gray-100 dark:border-slate-800'
                : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                            <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="text-xl lg:text-2xl font-black tracking-tight">
                            <span className="text-gray-900 dark:text-white">Job</span>
                            <span className="gradient-text">Connect</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/')
                                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}>{t('cat_all')}</Link>
                        {token && userType === 'Company' && (
                            <Link to="/dashboard" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${isActive('/dashboard')
                                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}><LayoutDashboard size={16} />{t('nav_dashboard')}</Link>
                        )}
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3">
                        <button onClick={toggleDark} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle dark mode">
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div className="relative">
                            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                                <Globe size={16} />
                                <span className="hidden sm:inline uppercase">{i18n.language}</span>
                                <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {langMenuOpen && (
                                <>
                                    <div className="fixed inset-0" onClick={() => setLangMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-slate-700 overflow-hidden animate-fade-in">
                                        {['en', 'sq', 'mk'].map((lng) => (
                                            <button key={lng} onClick={() => changeLanguage(lng)}
                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-3 ${i18n.language === lng
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                                    }`}>
                                                <span className={`w-2 h-2 rounded-full ${i18n.language === lng ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                                {langLabels[lng]}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {token ? (
                            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <LogOut size={16} /><span className="hidden sm:inline">{t('logout')}</span>
                            </button>
                        ) : (
                            <Link to="/auth" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-[0.98] transition-all">
                                <User size={16} />{t('login')}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}