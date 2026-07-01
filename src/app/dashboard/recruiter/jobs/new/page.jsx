import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

import Link from 'next/link';
import { Clock, Factory } from "@gravity-ui/icons";

const PostJobsForm = async() => {
    const company = await getLoggedInRecruiterCompany();
    console.log(company, "company in post job form");

    if (!company || !company._id) {
        return (
            <div className="w-full min-h-[70vh] flex flex-col justify-center items-center text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto">
                        <Factory className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100">Company Profile Required</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        To manage and post jobs, you must first register your company profile.
                    </p>
                    <Link 
                        href="/dashboard/recruiter/company" 
                        className="inline-block w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition"
                    >
                        Create Company Profile
                    </Link>
                </div>
            </div>
        );
    }

    if (company.status !== 'Approved') {
        return (
            <div className="w-full min-h-[70vh] flex flex-col justify-center items-center text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100">Approval Pending</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Your company profile for <strong className="text-white">{company.name}</strong> is currently pending admin approval. You will be able to post jobs once approved.
                    </p>
                    <Link 
                        href="/dashboard/recruiter/company" 
                        className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
                    >
                        View Company Details
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobsForm;