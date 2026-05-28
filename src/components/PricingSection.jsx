"use client";

import React, { useState } from "react";

import {
    Star,
    ChartLine,
    CirclePlus,
    Plus,
    ArrowUpRight,
} from "@gravity-ui/icons";

export default function PricingSection() {
    const [billingPeriod, setBillingPeriod] = useState("monthly");

    const plans = [
        {
            name: "Starter",
            icon: Star,
            price: 0,
            description: "Start building your insights hub:",
            features: [
                "Daily AI match brief (top 5)",
                "Verified salary bands",
                "Company insight dashboards",
                "1-click apply, unlimited",
            ],
            isPopular: false,
        },
        {
            name: "Growth",
            icon: ChartLine,
            price: 17,
            description: "Scale faster with premium tools:",
            features: [
                "Advanced AI job matching",
                "Verified salary insights",
                "Priority applications",
                "Unlimited dashboard access",
            ],
            isPopular: true,
        },
        {
            name: "Premium",
            icon: CirclePlus,
            price: 99,
            description: "Everything you need to dominate:",
            features: [
                "Everything in Growth",
                "Multi-profile career portfolios",
                "Shared talent rooms",
                "Recruiter view access",
            ],
            isPopular: false,
        },
    ];

    return (
        <section className="bg-[#050506] px-6 py-24 text-white">

            {/* Top Badge */}
            <div className="mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full border border-indigo-900/30 bg-indigo-950/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                    <span className="h-1.5 w-1.5 rounded-sm bg-indigo-500"></span>

                    Pricing

                    <span className="h-1.5 w-1.5 rounded-sm bg-indigo-500"></span>
                </div>
            </div>

            {/* Heading */}
            <h2 className="mx-auto mb-10 max-w-2xl text-center text-4xl font-semibold leading-tight tracking-tight text-slate-100 md:text-5xl">
                Pay for the leverage,
                <br />
                not the listings
            </h2>

            {/* Toggle */}
            <div className="mb-16 flex justify-center">
                <div className="flex items-center rounded-full border border-[#222226] bg-[#121214] p-1.5 shadow-inner">

                    <button
                        onClick={() => setBillingPeriod("monthly")}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${billingPeriod === "monthly"
                                ? "bg-white text-black shadow-md"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setBillingPeriod("yearly")}
                        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${billingPeriod === "yearly"
                                ? "bg-white text-black shadow-md"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        <span>Yearly</span>

                        <span className="rounded-full bg-fuchsia-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            25%
                        </span>
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                {plans.map((plan, index) => {
                    const Icon = plan.icon;

                    return (
                        <div
                            key={index}
                            className={`group relative flex flex-col justify-between rounded-2xl border bg-[#0d0d0f] p-8 transition-all duration-300 ${plan.isPopular
                                    ? "border-zinc-700 shadow-xl shadow-white/[0.03]"
                                    : "border-zinc-900 hover:border-zinc-800"
                                }`}
                        >
                            <div>

                                {/* Header */}
                                <div className="mb-8 flex items-center justify-between">

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-[#161619] text-fuchsia-400">
                                            <Icon size={16} />
                                        </div>

                                        <span className="text-lg font-medium text-slate-200">
                                            {plan.name}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline text-slate-100">
                                        <span className="text-3xl">$</span>

                                        <span className="text-4xl font-semibold tracking-tight">
                                            {billingPeriod === "yearly"
                                                ? Math.floor(plan.price * 0.75)
                                                : plan.price}
                                        </span>

                                        <span className="ml-1 text-xs text-zinc-500">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-6 text-sm font-medium text-slate-300">
                                    {plan.description}
                                </p>

                                {/* Features */}
                                <ul className="mb-10 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-sm text-zinc-400"
                                        >
                                            <div className="mt-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-500">
                                                <Plus size={12} />
                                            </div>

                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Button */}
                            <button
                                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-200 group-hover:scale-[1.01] active:scale-[0.99] ${plan.isPopular
                                        ? "bg-white text-black hover:bg-neutral-100"
                                        : "bg-[#222225] text-slate-200 hover:bg-[#2b2b2f]"
                                    }`}
                            >
                                <span>Choose This Plan</span>

                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}