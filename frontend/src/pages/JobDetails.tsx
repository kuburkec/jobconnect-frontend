import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building2, Calendar, ChevronLeft, Send, Briefcase, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react';
import api from '../services/api';
import type { Job } from '../types';

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [job, setJob] = useState<Job | null>(null);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchJob(); }, [id]);

    const fetchJob = async () => {
        try {
            const res = await api.get(`/api/jobs/${id}`);
            setJob(res.data);
        } catch (err) {
            console.error('Failed to fetch job:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        setApplying(true);
        try {
            await api.post('/api/applications/apply', { jobId: parseInt(id!) });
            setApplied(true);
        } catch (err: any) {
            alert(err.response?.data?.message || t('apply_error'));
        } finally {
            setApplying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
        </div>
    );

    if (!job) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
            <p className="text-gray-500 dark:text-gray-400">Job not found</p>
        </div>
    );

    const categoryColors: Record<string, string> = {
        IT: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        Construction: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        Healthcare: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
        Finance: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
        Education: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-sm mb-6 transition-colors">
                    <ChevronLeft size={18} /> {t('back_to_list')}
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700/50 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[job.category] || 'bg-gray-50 text-gray-700'}`}>
                                    {job.category}
                                </span>
                                <span className="text-sm text-gray-400 flex items-center gap-1.5">
                                    <Calendar size={14} /> {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">{job.title}</h1>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <Building2 size={20} className="text-primary-500" />
                                <span className="font-bold text-lg">{job.companyName}</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700/50 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Briefcase size={20} className="text-primary-500" />
                                {t('job_description')}
                            </h3>
                            <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-6 text-white shadow-xl shadow-primary-500/20">
                                <h3 className="font-bold text-lg mb-2">Ready to apply?</h3>
                                <p className="text-primary-100 text-sm mb-6">Submit your application now and get noticed by the hiring team.</p>
                                {applied ? (
                                    <div className="flex items-center justify-center gap-2 py-3 bg-white/20 rounded-xl font-bold">
                                        <CheckCircle size={20} /> {t('apply_success')}
                                    </div>
                                ) : (
                                    <button onClick={handleApply} disabled={applying}
                                        className="w-full py-3.5 bg-white text-primary-700 rounded-xl font-bold shadow-lg hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                                        {applying ? <Loader2 size={20} className="animate-spin" /> : <>
                                            <Send size={18} /> {t('apply_now')}
                                        </>}
                                    </button>
                                )}
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">{t('quick_stats')}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                                            <Briefcase size={18} className="text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">{t('role_type')}</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{t('full_time')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                                            <MapPin size={18} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">{t('location')}</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{t('remote_local')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                                            <Clock size={18} className="text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">{t('posted_on')}</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{new Date(job.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}