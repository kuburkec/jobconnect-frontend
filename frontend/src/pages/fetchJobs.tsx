import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Calendar, ChevronLeft, Send } from 'lucide-react';
import api from '../services/api';

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        api.get(`/api/jobs/${id}`).then(res => setJob(res.data));
    }, [id]);

    if (!job) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-6 hover:underline">
                <ChevronLeft size={20} /> {t('back_to_list')}
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1 font-medium"><Building2 size={18} /> {job.companyName}</span>
                            <span className="flex items-center gap-1"><Calendar size={18} /> {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                        {t(`cat_${job.category.toLowerCase()}`)}
                    </span>
                </div>

                <div className="prose max-w-none text-gray-700 mb-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('job_description')}</h3>
                    <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
                </div>

                <button
                    onClick={() => alert(t('apply_success'))}
                    className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    <Send size={20} /> {t('apply_now')}
                </button>
            </div>
        </div>
    );
}
