import React from 'react';
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/core/session";
import { Card, Button } from "@heroui/react";
import { Persons, House, Briefcase, Star, Clock } from "@gravity-ui/icons";
import DashboardStats from "@/components/dashboard/DashboardStats";
import Link from 'next/link';

const AdmindashboardPage = async () => {
    const user = await getUserSession();

    // Query stats dynamically from database collections
    const totalUsers = await db.collection("user").countDocuments();
    const totalCompanies = await db.collection("companies").countDocuments();
    const pendingCompanies = await db.collection("companies").countDocuments({ status: "Pending" });
    const totalJobs = await db.collection("jobs").countDocuments();

    const adminStats = [
        { title: "Total Users", value: totalUsers.toString(), icon: Persons },
        { title: "Registered Companies", value: totalCompanies.toString(), icon: House },
        { title: "Pending Approvals", value: pendingCompanies.toString(), icon: Clock },
        { title: "Total Job Posts", value: totalJobs.toString(), icon: Briefcase },
    ];

    // Fetch latest registrations for recent updates widgets
    const recentCompanies = await db.collection("companies")
        .find()
        .sort({ createdAt: -1 })
        .limit(3)
        .toArray();

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-white min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                        Admin Control Panel
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Welcome back, {user?.name || "Administrator"}. Here is your live platform status metrics tracker.
                    </p>
                </div>
            </div>

            {/* Platform Stats */}
            <DashboardStats statsData={adminStats} />

            {/* Admin Tasks & Recent Companies List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Companies for Review */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-zinc-100">Recent Companies</h2>
                        <Link href="/dashboard/admin/companies" className="text-xs text-purple-400 hover:underline">
                            Manage Companies
                        </Link>
                    </div>

                    <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-4 divide-y divide-zinc-800/60">
                        {recentCompanies.length === 0 ? (
                            <div className="text-center py-10 text-zinc-500 text-sm">
                                No registered companies found.
                            </div>
                        ) : (
                            recentCompanies.map((company, idx) => (
                                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-xs text-zinc-300">
                                            {company.name ? company.name.slice(0,2).toUpperCase() : 'CO'}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-zinc-200">{company.name}</h4>
                                            <p className="text-xs text-zinc-500 mt-1">{company.industry || "Technology"}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                                        company.status === 'Approved'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                             : company.status === 'Rejected'
                                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    }`}>
                                        {company.status || "Pending"}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Direct Control Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-zinc-100">Portal Actions</h2>
                    <Card className="border border-white/10 bg-[#121214] rounded-2xl p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/dashboard/admin/users" className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition text-center">
                                <span className="text-sm font-semibold block text-zinc-200 mb-1">User Management</span>
                                <span className="text-xs text-zinc-500">Edit roles, toggle suspension</span>
                            </Link>
                            <Link href="/dashboard/admin/companies" className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition text-center">
                                <span className="text-sm font-semibold block text-zinc-200 mb-1">Company Audits</span>
                                <span className="text-xs text-zinc-500">Approve/Reject requests</span>
                            </Link>
                            <Link href="/dashboard/admin/jobs" className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition text-center">
                                <span className="text-sm font-semibold block text-zinc-200 mb-1">Manage Jobs</span>
                                <span className="text-xs text-zinc-500">Search, delete active jobs</span>
                            </Link>
                            <Link href="/dashboard/admin/payments" className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition text-center">
                                <span className="text-sm font-semibold block text-zinc-200 mb-1">Payment logs</span>
                                <span className="text-xs text-zinc-500">View checkout history</span>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdmindashboardPage;