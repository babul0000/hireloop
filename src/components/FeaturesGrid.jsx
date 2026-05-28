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

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.03] hover:-translate-y-1">
      
      {/* Icon Box */}
      <div className="flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-xl border border-[#222] bg-gradient-to-b from-[#111] to-[#0a0a0a] text-fuchsia-400 shadow-inner transition-all duration-300 group-hover:border-fuchsia-500/30 group-hover:text-fuchsia-300">
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="pt-1">
        <h3 className="text-[17px] font-medium tracking-wide text-slate-100">
          {title}
        </h3>

        <p className="mt-1.5 max-w-xs text-[14px] leading-relaxed text-slate-400">
          {description}
        </p>
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
    <section className="bg-[#0b0b0c] px-6 py-20 text-white">
      
      {/* Header */}
      <div className="mb-16 flex flex-col items-center text-center">
        
        <div className="mb-5 flex items-center gap-2 rounded-full border border-indigo-900/30 bg-indigo-950/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-sm bg-indigo-500"></span>

          FEATURES JOB

          <span className="h-1.5 w-1.5 rounded-sm bg-indigo-500"></span>
        </div>

        <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-100 md:text-5xl">
          Everything you need
          <br />
          to succeed
        </h2>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}