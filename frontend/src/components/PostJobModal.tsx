import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Briefcase, Building2, FileText, Tag, Loader2, CheckCircle } from 'lucide-react';
import api from '../services/api';

interface PostJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PostJobModal({ isOpen, onClose, onSuccess }: PostJobModalProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        title: '',
        companyName: '',
        category: 'IT',
        description: ''
    });

    const categories = ['IT', 'Construction', 'Healthcare', 'Finance', 'Education'];

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/api/jobs', form);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setForm({ title: '', companyName: '', category: 'IT', description: '' });
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden animate-slide-up">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                            {success ? 'Posted!' : 'Post a New Job'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {success ? 'Your job listing is now live.' : 'Fill in the details below.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {success ? (
                    <div className="px-8 py-16 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                            <CheckCircle size={40} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">Job posted successfully!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                        {/* Job Title */}
                        <div className="relative">
                            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                placeholder="Job Title (e.g., Senior React Developer)"
                                className="input-field pl-12"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                            />
                        </div>

                        {/* Company Name */}
                        <div className="relative">
                            <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                placeholder="Company Name"
                                className="input-field pl-12"
                                value={form.companyName}
                                onChange={e => setForm({ ...form, companyName: e.target.value })}
                            />
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                className="input-field pl-12 appearance-none cursor-pointer"
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <FileText size={18} className="absolute left-4 top-4 text-gray-400" />
                            <textarea
                                required
                                rows={4}
                                placeholder="Job Description — tell applicants about the role, requirements, and benefits..."
                                className="input-field pl-12 pt-3 resize-none"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold shadow-lg shadow-primary-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>Post Job <Briefcase size={18} /></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}