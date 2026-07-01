import React from 'react';
import { db } from "@/lib/db";
import { deleteJobAction } from "@/lib/actions/jobs";
import AdminJobsTableClient from "./AdminJobsTableClient";

export default async function AdminJobsPage() {
    const rawJobs = await db.collection("jobs")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    const jobs = rawJobs.map(job => ({
        _id: job._id.toString(),
        jobTitle: job.jobTitle || 'Untitled Position',
        companyName: job.companyName || 'Confidential',
        jobCategory: job.jobCategory || 'Technology',
        jobType: job.jobType || 'Full-time',
        status: job.status || 'Active',
        location: job.location || 'Remote',
        createdAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'
    }));

    return (
        <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                        Job Postings Management
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Monitor, review, and delete active postings across the portal. Total postings: {jobs.length}
                    </p>
                </div>

                <AdminJobsTableClient initialJobs={jobs} />
            </div>
        </div>
    );
}
