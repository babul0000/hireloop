import React from "react";

import {
  Magnifier,
  ChartLine,
  ChartColumn,
  Bookmark,
  LayoutCells,
  Square,
  ArrowUpRight,
  Star,
} from "@gravity-ui/icons";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group flex flex-col gap-5 rounded-[28px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-white/10">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-violet-500/10 text-fuchsia-300 shadow-lg shadow-fuchsia-500/10">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturesGrid() {
  const features = [
    {
      icon: Magnifier,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
    },
    {
      icon: ChartLine,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
    },
    {
      icon: ChartColumn,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
    },
    {
      icon: Bookmark,
      title: "Saved Jobs",
      description: "Manage applications and favorites easily.",
    },
    {
      icon: Star,
      title: "One-Click Apply",
      description: "Apply to jobs quickly with a single click.",
    },
    {
      icon: LayoutCells,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
    },
    {
      icon: Square,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills perfectly.",
    },
    {
      icon: ArrowUpRight,
      title: "Career Growth",
      description: "Boost your career with expert interview tips.",
    },
  ];

  return (
    <section className="bg-[#050507] px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-violet-300">
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
            FEATURE HIGHLIGHTS
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Everything you need to succeed.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Powerful recruiting tools, meaningful insights, and the career support you need to move faster.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
