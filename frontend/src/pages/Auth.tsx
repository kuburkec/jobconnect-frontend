import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, ArrowRight, User, Building2, Loader2, Sparkles } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
        userType: 'Candidate' as 'Candidate' | 'Company'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // LOGIN
                const res = await api.post('/api/auth/login', {
                    email: form.email,
                    password: form.password
                });

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userType', form.userType);
                localStorage.setItem('email', form.email);
                navigate('/');

            } else {
                // REGISTER — must include userType
                const res = await api.post('/api/auth/register', {
                    email: form.email,
                    password: form.password,
                    userType: form.userType
                });

                // Registration successful — switch to login
                setIsLogin(true);
                setForm({ ...form, password: '' });
                alert(t('register_success'));
            }

        } catch (err: any) {
            console.error('Auth error:', err);
            const message = err.response?.data?.message
                || err.response?.data?.[0]?.description
                || err.response?.data
                || t('auth_error');
            setError(typeof message === 'string' ? message : JSON.stringify(message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20 px-4 py-8">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/25 mb-4">
                        <Sparkles size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                        {isLogin ? t('welcome_back') : t('start_journey')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        {isLogin ? t('login_subtitle') : t('register_subtitle')}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-slate-700/50 p-8">

                    {/* Role Toggle (Both Login and Register) */}
                    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-slate-700/50 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, userType: 'Candidate' })}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${form.userType === 'Candidate'
                                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            <User size={16} /> {t('candidate')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, userType: 'Company' })}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${form.userType === 'Company'
                                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            <Building2 size={16} /> {t('company')}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder={t('email')}
                                className="input-field pl-12"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                placeholder={t('password')}
                                className="input-field pl-12"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? t('login_btn') : t('register_btn')}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Login/Register */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                            {isLogin ? t('no_account') : t('already_account')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
