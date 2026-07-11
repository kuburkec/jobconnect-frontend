import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    gradient: string;
}

export default function StatCard({ icon: Icon, value, label, gradient }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon size={22} className="text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
        </div>
    );
}