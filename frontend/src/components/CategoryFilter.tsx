import { useTranslation } from 'react-i18next';
import { Laptop, HardHat, HeartPulse, Landmark, GraduationCap, LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
    selected: string;
    onSelect: (category: string) => void;
}

const categories = [
    { id: 'All', icon: LayoutGrid, color: 'from-gray-500 to-gray-600' },
    { id: 'IT', icon: Laptop, color: 'from-blue-500 to-blue-600' },
    { id: 'Construction', icon: HardHat, color: 'from-amber-500 to-amber-600' },
    { id: 'Healthcare', icon: HeartPulse, color: 'from-emerald-500 to-emerald-600' },
    { id: 'Finance', icon: Landmark, color: 'from-violet-500 to-violet-600' },
    { id: 'Education', icon: GraduationCap, color: 'from-rose-500 to-rose-600' },
];

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">{t('filter_by_category')}</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selected === cat.id;
                    return (
                        <button key={cat.id} onClick={() => onSelect(cat.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 min-w-fit ${isActive ? `bg-gradient-to-r ${cat.color} text-white shadow-lg` : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700'
                                }`}>
                            <Icon size={18} /><span>{t(`cat_${cat.id.toLowerCase()}`)}</span>
                            {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-white/80" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}