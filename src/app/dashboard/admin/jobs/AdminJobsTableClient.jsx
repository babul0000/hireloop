'use client';

import React, { useState, useTransition } from 'react';
import { Table, Button, Chip } from '@heroui/react';
import { TrashBin, Magnifier } from '@gravity-ui/icons';
import { deleteJobAction } from '@/lib/actions/jobs';

export default function AdminJobsTableClient({ initialJobs }) {
    const [jobs, setJobs] = useState(initialJobs);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const filteredJobs = jobs.filter(job => 
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteClick = (id) => {
        setPendingDeleteId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (!pendingDeleteId) return;

        startTransition(async () => {
            const res = await deleteJobAction(pendingDeleteId);
            if (res.success) {
                setJobs(prev => prev.filter(j => j._id !== pendingDeleteId));
            } else {
                alert("Failed to delete job: " + res.error);
            }
            setIsConfirmOpen(false);
            setPendingDeleteId(null);
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'success';
            case 'inactive': return 'danger';
            default: return 'warning';
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
                <Magnifier className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search by job title, company, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 pl-10 pr-4 text-sm placeholder:text-zinc-500 focus:border-zinc-700 outline-none transition"
                />
            </div>

            {/* Table */}
            <div className="w-full bg-[#121214] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-zinc-400">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-400 font-medium select-none bg-zinc-950/20">
                                <th className="py-4 px-6">Job Title</th>
                                <th className="py-4 px-6">Company</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Type</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6">Posted</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 bg-[#121214]">
                            {filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-10 text-center text-zinc-600">
                                        No job postings found matching search parameters.
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-zinc-900/40 transition-colors">
                                        <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                                            {job.jobTitle}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {job.companyName}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-zinc-400 capitalize">
                                            {job.jobCategory}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-zinc-400 capitalize">
                                            {job.jobType}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <Chip size="sm" variant="flat" color={getStatusColor(job.status)}>
                                                {job.status}
                                            </Chip>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-zinc-500">
                                            {job.createdAt}
                                        </td>
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                color="danger"
                                                onClick={() => handleDeleteClick(job._id)}
                                                className="hover:text-red-500 rounded-xl"
                                                aria-label="Delete job posting"
                                            >
                                                <TrashBin className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
                    <div className="w-full max-w-sm bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6 text-white">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-zinc-100">
                                Confirm Deletion
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Are you sure you want to permanently delete this job posting? This action cannot be undone and will delete all applicants associated with it.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                            <button
                                disabled={isPending}
                                onClick={() => { setIsConfirmOpen(false); setPendingDeleteId(null); }}
                                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isPending}
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors flex items-center justify-center min-w-[76px]"
                            >
                                {isPending ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
