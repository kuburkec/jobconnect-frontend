import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, CheckCircle, Clock, Briefcase } from 'lucide-react';
import api from '../services/api';

interface MyApplication {
    id: number;
    jobTitle: string;
    companyName: string;
    appliedAt: string;
    status: string;
}

export default function UserProfile() {
    const { t } = useTranslation();
    const [apps, setApps] = useState<MyApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/api/auth/my-applications');
            setApps(res.data);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Profile Header */}
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/20">
                        <User size={36} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">{t('my_profile')}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('manage_applications')}</p>
                    </div>
                </div>

                {/* Applications */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Clock size={22} className="text-primary-500" />
                    {t('application_history')}
                </h2>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-200 border-t-primary-600" />
                    </div>
                ) : apps.length > 0 ? (
                    <div className="space-y-4">
                        {apps.map((app) => (
                            <div key={app.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.jobTitle}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{app.companyName}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {t('applied_on')}: {new Date(app.appliedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full text-sm">
                                    <CheckCircle size={16} /> {t('status_sent')}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                        <Briefcase size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{t('no_applications_yet')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}