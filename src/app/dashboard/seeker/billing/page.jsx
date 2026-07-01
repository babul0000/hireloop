'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Progress } from '@heroui/react';
import { CreditCard, Star, Rocket, Check, ArrowUpRight } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';

export default function BillingPage() {
    const { data: session, isPending } = authClient.useSession();
    const [usage, setUsage] = useState({ count: 0, limit: 3, percent: 0 });
    const [planName, setPlanName] = useState('Free');

    const user = session?.user;

    useEffect(() => {
        if (!user) return;

        // Fetch applications and current plan limits
        const loadPlanAndUsage = async () => {
            try {
                // Get plan details
                const planId = user.plan || 'seeker_free';
                const planRes = await fetch(`/api/plans?plan_id=${planId}`);
                const planData = await planRes.json();

                // Get applicant applications
                const appRes = await fetch(`/api/applications?applicantId=${user.id}`);
                const appData = await appRes.json();

                const count = Array.isArray(appData) ? appData.length : 0;
                const limit = planData?.maxApplicationsPerMonth || 3;
                const percent = Math.min((count / limit) * 100, 100);

                setPlanName(planData?.name || 'Free');
                setUsage({ count, limit, percent });
            } catch (err) {
                console.error("Failed to load plan and usage metrics:", err);
            }
        };

        loadPlanAndUsage();
    }, [user]);

    if (isPending) {
        return (
            <div className="flex min-h-screen justify-center items-center text-zinc-400">
                Loading billing dashboard...
            </div>
        );
    }

    const plans = [
        {
            name: 'Free',
            id: 'seeker_free',
            price: '$0',
            features: ['Apply to up to 3 jobs/mo', 'Browse & save up to 10 jobs', 'Basic profile listing'],
            active: user?.plan === 'seeker_free' || !user?.plan,
        },
        {
            name: 'Pro',
            id: 'seeker_pro',
            price: '$19',
            features: ['Apply to up to 30 jobs/mo', 'Unlimited saved jobs', 'Salary Insights', 'Priority Queue'],
            active: user?.plan === 'seeker_pro',
        },
        {
            name: 'Premium',
            id: 'seeker_premium',
            price: '$39',
            features: ['Everything in Pro', 'Unlimited Applications', 'Profile Feeds Boost', '24/7 Priority Support'],
            active: user?.plan === 'seeker_premium',
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-white min-h-screen">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <CreditCard className="w-8 h-8 text-fuchsia-400" /> Subscription & Billing
                </h1>
                <p className="text-zinc-400 text-sm">
                    Manage your subscription plan, view applications quota, and upgrade your tier.
                </p>
            </div>

            {/* Current Quota Status */}
            <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Current Plan Status</span>
                        <h2 className="text-xl font-bold text-white mt-1">
                            Applied to {usage.count} of {usage.limit} jobs this month
                        </h2>
                    </div>
                    <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-purple-950/40 text-purple-400 border border-purple-800/50">
                        Tier: {planName}
                    </span>
                </div>

                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 rounded-full"
                        style={{ width: `${usage.percent}%` }}
                    />
                </div>
            </Card>

            {/* Upgrade Options Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-indigo-400" /> Available Subscription Plans
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {plans.map((plan, idx) => (
                        <Card
                            key={idx}
                            className={`p-6 rounded-[28px] border flex flex-col justify-between min-h-[380px] shadow-2xl ${
                                plan.active
                                    ? 'border-purple-500 bg-purple-950/10'
                                    : 'border-zinc-800 bg-zinc-900'
                            }`}
                        >
                            <div>
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                                    {plan.active && (
                                        <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-800/40">
                                            Current Tier
                                        </span>
                                    )}
                                </div>
                                <div className="my-4 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">{plan.price}</span>
                                    <span className="text-xs text-zinc-500">/month</span>
                                </div>
                                <hr className="border-zinc-800 mb-4" />
                                <ul className="space-y-2.5">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6">
                                {plan.active ? (
                                    <Button disabled className="w-full bg-zinc-800 text-zinc-500 rounded-xl font-semibold cursor-default">
                                        Active Plan
                                    </Button>
                                ) : (
                                    <form action="/api/checkout_sessions" method="POST">
                                        <input type="hidden" name="plan_id" value={plan.id} />
                                        <Button
                                            type="submit"
                                            className="w-full bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 flex items-center justify-center gap-1"
                                        >
                                            Upgrade Tier <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
