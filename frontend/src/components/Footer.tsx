import { Briefcase } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                            </div>
                            <span className="text-lg font-black">
                                <span className="text-gray-900 dark:text-white">Job</span>
                                <span className="gradient-text">Connect</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Connect with your perfect job opportunity
                        </p>
                    </div>

                    {/* For Candidates */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">For Candidates</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Browse Jobs</a></li>
                            <li><a href="/auth" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sign Up</a></li>
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">My Applications</a></li>
                        </ul>
                    </div>

                    {/* For Companies */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">For Companies</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="/auth" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Post a Job</a></li>
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © {2026} JobConnect. Created by B.I Kubur. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}