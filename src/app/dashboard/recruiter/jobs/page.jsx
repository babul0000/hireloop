import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";

// Gravity UI Icons
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

import Link from 'next/link';
import { ShieldExclamation, Clock, Factory } from "@gravity-ui/icons";

const RecruiterJobs = async () => {
    const company = await getLoggedInRecruiterCompany();
    console.log(company, "testing company data")

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
                        Your company profile for <strong className="text-white">{company.name}</strong> is currently pending admin approval. You will be able to manage jobs once approved.
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

    const jobs = await getCompanyJobs(company._id) || [];
    
    console.log(jobs, "jobs data")

    // Helper to determine status chip coloring
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'danger';
            default:
                return 'warning';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">
                    Manage All Jobs
                </h2>

                <p className="text-sm text-default-500">
                    View, update, and manage your current job postings.
                </p>
            </div>

            <Table aria-label="Company jobs management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px]">

                        <Table.Header>
                            <Table.Column
                                isRowHeader
                                defaultWidth="2fr"
                                id="jobTitle"
                                minWidth={200}
                            >
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1.2fr"
                                id="typeCategory"
                                minWidth={150}
                            >
                                Type / Category
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="location"
                                minWidth={120}
                            >
                                Location
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="status"
                                minWidth={100}
                            >
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1.2fr"
                                id="actions"
                                minWidth={150}
                            >
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body
                            emptyContent={"No jobs found for this company."}
                        >
                            {jobs.map((job) => (
                                <Table.Row key={job._id?.$oid || job._id}>

                                    {/* Job Title */}
                                    <Table.Cell>
                                        <div className="font-medium text-default-800">
                                            {job.jobTitle}
                                        </div>
                                    </Table.Cell>

                                    {/* Type / Category */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm capitalize font-medium">
                                                {job.jobType}
                                            </span>

                                            <span className="text-xs text-default-400 capitalize">
                                                {job.jobCategory}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* Location */}
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">
                                            {job.isRemote
                                                ? "Remote"
                                                : job.location}
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <Chip
                                            color={getStatusColor(job.status)}
                                            size="sm"
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {job.status || "Unknown"}
                                        </Chip>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">

                                            <Tooltip content="View Details">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label="View details"
                                                >
                                                    <Eye className="w-4 h-4 text-default-500" />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Edit Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label="Edit job"
                                                >
                                                    <Pencil className="w-4 h-4 text-default-500" />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Delete Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    aria-label="Delete job"
                                                >
                                                    <TrashBin className="w-4 h-4 text-danger" />
                                                </Button>
                                            </Tooltip>

                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;