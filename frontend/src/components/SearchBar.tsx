import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
    const { t } = useTranslation();
    const [focused, setFocused] = useState(false);

    return (
        <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
            <div className={`absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors ${focused ? 'text-primary-500' : 'text-gray-400'}`}>
                <Search size={20} />
            </div>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="w-full pl-14 pr-12 py-4 lg:py-5 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl shadow-lg shadow-gray-200/30 dark:shadow-black/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-base lg:text-lg"
                placeholder={placeholder || t('search_placeholder')} />
            {value && (
                <button onClick={() => onChange('')} className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <X size={18} />
                </button>
            )}
        </div>
    );
}