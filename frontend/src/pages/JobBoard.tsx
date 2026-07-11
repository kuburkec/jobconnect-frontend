import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, TrendingUp } from 'lucide-react';
import api from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import type { Job } from '../types';

export default function JobBoard() {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchJobs();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search, category]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/jobs?search=${search}&category=${category}`);
            setJobs(res.data);
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-slate-900 pt-28 pb-16 lg:pt-36 lg:pb-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary-200/30 to-transparent dark:from-primary-900/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-accent-200/20 to-transparent dark:from-accent-900/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
                        <TrendingUp size={16} />
                        <span>1,200+ jobs available</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        {t('hero_title')} <span className="gradient-text">{t('hero_blue')}</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                        {t('hero_subtitle')}
                    </p>
                    <SearchBar value={search} onChange={setSearch} />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <CategoryFilter selected={category} onSelect={setCategory} />
                        </div>
                    </aside>

                    {/* Job Grid */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {jobs.length} <span className="text-gray-400 font-normal">{t('results_found')}</span>
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
                            </div>
                        ) : jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {jobs.map((job, idx) => (
                                    <JobCard key={job.id} job={job} index={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/50">
                                <Briefcase size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 font-medium">{t('no_results')}</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}