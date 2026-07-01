import React from 'react';
import { db } from "@/lib/db";
import { Table, Chip } from '@heroui/react';
import { CreditCard, Envelope, Star } from '@gravity-ui/icons';

export default async function AdminPaymentsPage() {
    const rawSubs = await db.collection("subscriptions")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    const subscriptions = rawSubs.map(sub => ({
        _id: sub._id.toString(),
        email: sub.email || 'unknown@user.com',
        planId: sub.planId || 'seeker_free',
        createdAt: sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'N/A'
    }));

    const getPlanBadgeStyles = (planId) => {
        switch(planId) {
            case 'seeker_pro': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'seeker_premium': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'recruiter_growth': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
            case 'recruiter_enterprise': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getPlanLabel = (planId) => {
        switch(planId) {
            case 'seeker_pro': return 'Seeker Pro';
            case 'seeker_premium': return 'Seeker Premium';
            case 'recruiter_growth': return 'Recruiter Growth';
            case 'recruiter_enterprise': return 'Recruiter Enterprise';
            default: return 'Free Seeker';
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 to-violet-500 bg-clip-text text-transparent flex items-center gap-2">
                        <CreditCard className="w-8 h-8 text-fuchsia-400" /> Subscription Payments
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Track subscription sales transactions and package logs. Total purchases: {subscriptions.length}
                    </p>
                </div>

                <div className="w-full bg-[#121214] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-zinc-400">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-400 font-medium select-none bg-zinc-950/20">
                                    <th className="py-4 px-6">Transaction ID</th>
                                    <th className="py-4 px-6">User Email</th>
                                    <th className="py-4 px-6">Purchased Package</th>
                                    <th className="py-4 px-6">Billing Mode</th>
                                    <th className="py-4 px-6">Payment Date</th>
                                    <th className="py-4 px-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60 bg-[#121214]">
                                {subscriptions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-10 text-center text-zinc-600">
                                            No payment records found.
                                        </td>
                                    </tr>
                                ) : (
                                    subscriptions.map((sub) => (
                                        <tr key={sub._id} className="hover:bg-zinc-900/40 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs text-zinc-500">
                                                {sub._id}
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-zinc-200">
                                                <div className="flex items-center gap-2">
                                                    <Envelope className="w-4 h-4 text-zinc-500" />
                                                    <span>{sub.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getPlanBadgeStyles(sub.planId)}`}>
                                                    {getPlanLabel(sub.planId)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-zinc-400">
                                                Stripe Subscription
                                            </td>
                                            <td className="py-4 px-6 text-zinc-400">
                                                {sub.createdAt}
                                            </td>
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <Chip size="sm" color="success" variant="flat">
                                                    Succeeded
                                                </Chip>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
