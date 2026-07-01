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
    <section className="bg-[#020206] px-6 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-violet-300">
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
            Pricing
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Pay for the leverage, not the listings.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Simple, transparent plans built for modern recruiting and hiring teams.
          </p>
        </div>

        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-lg shadow-black/20">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                billingPeriod === "monthly"
                  ? "bg-white text-black shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                billingPeriod === "yearly"
                  ? "bg-white text-black shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Yearly
              <span className="rounded-full bg-fuchsia-600 px-2 py-0.5 text-[10px] font-bold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`group flex flex-col justify-between rounded-[32px] border p-8 transition duration-300 ${
                  plan.isPopular
                    ? "border-violet-400/20 bg-white/5 shadow-[0_35px_60px_-35px_rgba(139,92,246,0.7)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#121216] text-fuchsia-400">
                        <Icon size={18} />
                      </div>
                      <span className="text-lg font-semibold text-white">{plan.name}</span>
                    </div>
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-3xl">$</span>
                      <span className="text-4xl font-semibold tracking-tight">
                        {billingPeriod === "yearly" ? Math.floor(plan.price * 0.75) : plan.price}
                      </span>
                      <span className="text-xs text-slate-500">/month</span>
                    </div>
                  </div>
                  <p className="mb-8 text-sm text-slate-300">{plan.description}</p>
                  <ul className="space-y-4 text-sm text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200">
                          <Plus size={12} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`mt-10 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition duration-200 ${
                    plan.isPopular
                      ? "bg-violet-400 text-black hover:bg-violet-300"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  Choose This Plan
                  <ArrowUpRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
