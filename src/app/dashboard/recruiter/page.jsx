import React from 'react';
import { getUserSession } from "@/lib/core/session";
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { db } from "@/lib/db";

const RecruiterDashboardHomePage = async () => {
    const user = await getUserSession();
    
    // Find company for recruiter
    const company = await db.collection('companies').findOne({ recruiterId: user?.id });
    
    let totalJobs = 0;
    let activeJobs = 0;
    let closedJobs = 0;
    let totalApplicants = 0;

    if (company) {
        const companyIdStr = company._id.toString();
        // Fetch company jobs
        const jobs = await db.collection('jobs').find({ 
            $or: [
                { companyId: company._id },
                { companyId: companyIdStr }
            ]
        }).toArray();

        totalJobs = jobs.length;
        activeJobs = jobs.filter(j => j.status?.toLowerCase() === 'active').length;
        closedJobs = jobs.filter(j => j.status?.toLowerCase() === 'inactive' || j.status?.toLowerCase() === 'closed').length;

        // Get application count
        const jobIds = jobs.map(j => j._id.toString());
        const jobObjectIds = jobs.map(j => j._id);
        totalApplicants = await db.collection('application').countDocuments({
            $or: [
                { jobId: { $in: jobIds } },
                { jobId: { $in: jobObjectIds } }
            ]
        });
    }

    const recruiterStats = [
        { title: "Total Job Posts", value: totalJobs.toString(), icon: Briefcase },
        { title: "Total Applicants", value: totalApplicants.toString(), icon: Persons },
        { title: "Active Jobs", value: activeJobs.toString(), icon: Thunderbolt },
        { title: "Jobs Closed", value: closedJobs.toString(), icon: CircleCheck },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 text-white min-h-screen">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Welcome back, {user?.name || "Recruiter"}
                </h1>
                <p className="text-zinc-400 text-sm">
                    Here's a summary of your organization's hiring activity.
                </p>
            </div>
            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;