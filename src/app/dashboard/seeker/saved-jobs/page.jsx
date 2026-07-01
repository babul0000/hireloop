'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@heroui/react';
import { MapPin, Briefcase, Bookmark, TrashBin, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

export default function SavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Hydrate from localStorage or load mock data
        const local = localStorage.getItem('saved_jobs');
        if (local) {
            try {
                setSavedJobs(JSON.parse(local));
            } catch (e) {
                console.error(e);
            }
        } else {
            // Default premium mock saved jobs for onboarding
            const mockSaved = [
                {
                    _id: 'job_mock_1',
                    jobTitle: 'Senior Frontend Engineer',
                    companyName: 'Vercel',
                    companyLogo: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=1',
                    location: 'San Francisco, CA',
                    isRemote: true,
                    jobType: 'Full-time',
                    minSalary: '140000',
                    maxSalary: '180000',
                },
                {
                    _id: 'job_mock_2',
                    jobTitle: 'Staff Backend Developer',
                    companyName: 'Supabase',
                    companyLogo: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=2',
                    location: 'Singapore',
                    isRemote: true,
                    jobType: 'Full-time',
                    minSalary: '150000',
                    maxSalary: '200000',
                }
            ];
            localStorage.setItem('saved_jobs', JSON.stringify(mockSaved));
            setSavedJobs(mockSaved);
        }
    }, []);

    const removeJob = (id) => {
        const updated = savedJobs.filter(j => j._id !== id);
        setSavedJobs(updated);
        localStorage.setItem('saved_jobs', JSON.stringify(updated));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 text-white min-h-screen">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Bookmark className="w-8 h-8 text-fuchsia-400" /> Saved Jobs
                </h1>
                <p className="text-zinc-400 text-sm">
                    Manage the job postings you bookmarked for later review.
                </p>
            </div>

            {savedJobs.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
                    <Bookmark className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-zinc-300">No bookmarked positions</h3>
                    <p className="text-zinc-500 text-sm mt-1 mb-6">
                        Explore open positions and save them to keep track of your search.
                    </p>
                    <Link href="/jobs">
                        <Button className="bg-white text-black font-semibold rounded-xl px-6">
                            Find Jobs
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {savedJobs.map((job) => (
                        <Card key={job._id} className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {job.companyLogo && (
                                            <img
                                                src={job.companyLogo}
                                                alt={job.companyName}
                                                className="w-10 h-10 object-contain rounded-xl bg-zinc-950 p-1 border border-zinc-800"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-white text-lg leading-tight">{job.jobTitle}</h3>
                                            <p className="text-sm text-zinc-400 mt-0.5">{job.companyName}</p>
                                        </div>
                                    </div>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="danger"
                                        onClick={() => removeJob(job._id)}
                                        className="text-zinc-400 hover:text-red-500 rounded-xl"
                                        aria-label="Remove saved job"
                                    >
                                        <TrashBin className="w-5 h-5" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full border border-zinc-800 text-xs">
                                        <MapPin className="text-purple-400 w-3.5 h-3.5" />
                                        <span>{job.location} {job.isRemote && "(Remote)"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full border border-zinc-800 text-xs">
                                        <Briefcase className="text-purple-400 w-3.5 h-3.5" />
                                        <span className="capitalize">{job.jobType}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-3">
                                <Link href={`/jobs/${job._id}`}>
                                    <Button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl flex items-center gap-1.5">
                                        Apply Now <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
