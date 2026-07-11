import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Briefcase, Plus, Eye, TrendingUp } from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/StatCard';
import PostJobModal from '../components/PostJobModal';
import type { DashboardJob } from '../types';

export default function CompanyDashboard() {
    const { t } = useTranslation();
    const [stats, setStats] = useState<DashboardJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get('/api/applications/my-applicants');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to fetch dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const totalApplicants = stats.reduce((acc, curr) => acc + curr.totalApplicants, 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
                            {t('company_dashboard')}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {t('welcome_employer')}
                        </p>
                    </div>

                    {/* POST JOB BUTTON */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-[0.98] transition-all"
                    >
                        <Plus size={20} /> Post New Job
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard icon={Briefcase} value={stats.length} label={t('active_listings')} gradient="from-primary-500 to-primary-600" />
                    <StatCard icon={Users} value={totalApplicants} label={t('total_applicants')} gradient="from-accent-500 to-accent-600" />
                    <StatCard icon={TrendingUp} value="12" label={t('interviews')} gradient="from-emerald-500 to-emerald-600" />
                </div>

                {/* Listings Table */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-700/50">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('my_listings')}</h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-200 border-t-primary-600" />
                        </div>
                    ) : stats.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-700/30">
                                        <th className="text-left px-8 py-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{t('job_title')}</th>
                                        <th className="text-left px-8 py-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{t('applicants')}</th>
                                        <th className="text-right px-8 py-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/30">
                                    {stats.map((job, idx) => (
                                        <tr key={idx} className="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-gray-900 dark:text-white text-lg">{job.jobTitle}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                                                                {String.fromCharCode(64 + i)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-primary-600 dark:text-primary-400 font-black">+{job.totalApplicants}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                                                    <Eye size={16} /> {t('view_resumes')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Briefcase size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 font-medium">No active listings yet</p>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="mt-4 text-primary-600 dark:text-primary-400 font-bold hover:underline"
                            >
                                Post your first job
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* POST JOB MODAL */}
            <PostJobModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchDashboard}
            />
        </div>
    );
}