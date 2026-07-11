import { Building2, MapPin, Clock, ArrowUpRight, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Job } from '../types';

interface JobCardProps {
    job: Job;
    index?: number;
}

const categoryColors: Record<string, string> = {
    IT: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Construction: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Healthcare: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Finance: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    Education: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

const categoryIcons: Record<string, string> = {
    IT: '💻', Construction: '🏗️', Healthcare: '🏥', Finance: '💰', Education: '🎓',
};

export default function JobCard({ job, index = 0 }: JobCardProps) {
    const { t } = useTranslation();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const colorClass = categoryColors[job.category] || 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    const icon = categoryIcons[job.category] || '💼';

    return (
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-5 lg:p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${colorClass}`}>{icon}</div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${colorClass}`}>{job.category}</span>
                    </div>
                    <button onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-400 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5"><Building2 size={14} className="text-primary-500" /><span className="font-medium text-gray-700 dark:text-gray-300">{job.companyName}</span></div>
                    <div className="flex items-center gap-1.5"><MapPin size={14} /><span>Balkans</span></div>
                    <div className="flex items-center gap-1.5"><Clock size={14} /><span>{new Date(job.createdAt).toLocaleDateString()}</span></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-5 leading-relaxed">{job.description}</p>
                <Link to={`/job/${job.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 dark:bg-slate-700 text-white font-semibold text-sm hover:bg-primary-600 dark:hover:bg-primary-600 transition-colors group/link">
                    {t('view_details')}
                    <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    );
}