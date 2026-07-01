import React from 'react';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import { Briefcase, CreditCard, Clock, Star, ArrowRight } from '@gravity-ui/icons';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';

const SeekerPage = async () => {
    const user = await getUserSession();
    const applications = await getApplicationsByApplicant(user?.id) || [];
    const plan = await getPlanById(user?.plan || 'seeker_free');

    const totalApplications = applications.length;

    const stats = [
        { title: "Applications", value: totalApplications, description: "Positions applied to", icon: Briefcase, color: "text-sky-400" },
        { title: "Active Plan", value: plan?.name || "Free", description: `Limit: ${plan?.maxApplicationsPerMonth || 3} / mo`, icon: Star, color: "text-fuchsia-400" },
        { title: "Profile Status", value: "Active", description: "Visible to recruiters", icon: Clock, color: "text-emerald-400" },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-white min-h-screen">
            {/* Welcoming Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                        Welcome back, {user?.name || "Job Seeker"}
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Here's your job search overview and applications status.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/jobs">
                        <Button className="bg-white text-black font-semibold rounded-xl">
                            Browse Jobs
                        </Button>
                    </Link>
                    <Link href="/dashboard/seeker/billing">
                        <Button variant="bordered" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-xl">
                            Upgrade Plan
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Seeker Metrics Row */}
            <div className="grid gap-5 sm:grid-cols-3">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-xs text-zinc-400">{stat.description}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions & Recent Activity Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Applications Preview */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-zinc-100">Recent Applications</h2>
                        {totalApplications > 0 && (
                            <Link href="/dashboard/seeker/applications" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        )}
                    </div>

                    <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden p-4">
                        {totalApplications === 0 ? (
                            <div className="text-center py-10 text-zinc-500 text-sm">
                                You haven't applied to any positions yet.
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800/60">
                                {applications.slice(0, 3).map((app, idx) => (
                                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-semibold text-sm text-zinc-200">{app.jobTitle}</h4>
                                            <p className="text-xs text-zinc-500 mt-1">{app.companyName}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700 capitalize">
                                                {app.status || "applied"}
                                            </span>
                                            <p className="text-[10px] text-zinc-500 mt-1">
                                                {new Date(app.createdAt?.$date || app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Account details / Quick Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-zinc-100">Account details</h2>
                    <Card className="border border-white/10 bg-[#121214] rounded-2xl p-6 space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider block">Registered Email</span>
                            <span className="text-sm font-medium text-zinc-300 break-all">{user?.email}</span>
                        </div>
                        <hr className="border-zinc-800/80" />
                        <div className="space-y-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider block">Current Plan Status</span>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-zinc-200">{plan?.name || "Free Seeker Plan"}</span>
                                <span className="text-xs px-2 py-0.5 bg-purple-950/40 text-purple-400 border border-purple-800/60 rounded-full font-medium">
                                    Active
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SeekerPage;