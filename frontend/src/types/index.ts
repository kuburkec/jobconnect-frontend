export interface Job {
    id: number;
    title: string;
    description: string;
    companyName: string;
    category: string;
    postedByUserId: string;
    createdAt: string;
}

export interface Application {
    id: number;
    jobId: number;
    candidateEmail: string;
    appliedAt: string;
    job?: Job;
}

export interface DashboardJob {
    jobTitle: string;
    totalApplicants: number;
    applicants: { candidateEmail: string; appliedAt: string }[];
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    userType: 'Candidate' | 'Company';
}

export interface AuthResponse {
    token: string;
    userType: string;
    email: string;
}