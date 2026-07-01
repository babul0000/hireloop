"use client";

import Link from "next/link";

import {
    Code,
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
} from "@gravity-ui/icons";

const productLinks = [
    { label: "Job discovery", href: "/jobs" },
    { label: "Recruiter tools", href: "/dashboard/recruiter" },
    { label: "Salary data", href: "/plans" },
    { label: "Resume help", href: "/" },
];

const navigationLinks = [
    { label: "Help center", href: "/" },
    { label: "Career library", href: "/" },
    { label: "Contact", href: "/" },
];

const resourceLinks = [
    { label: "Brand guideline", href: "/" },
    { label: "Newsroom", href: "/" },
];

const Footer = () => {
    return (
        <footer className="w-full bg-[#03040a] px-6 py-14 text-white md:px-12 lg:px-16">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-6">
                    <Link href="/" className="inline-flex items-center gap-3 rounded-3xl px-3 py-2 transition hover:bg-white/5">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/20">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">HiringLoop</h2>
                            <p className="text-sm text-slate-400">AI hiring marketplace</p>
                        </div>
                    </Link>
                    <p className="max-w-sm text-sm leading-7 text-slate-400">
                        Empowering ambitious professionals and modern hiring teams with smart matches, company insights, and faster growth.
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                        <Link href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white transition hover:bg-white/10">
                            <LogoFacebook className="w-5 h-5" />
                        </Link>
                        <Link href="https://github.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white transition hover:bg-white/10">
                            <LogoGithub className="w-5 h-5" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white transition hover:bg-white/10">
                            <LogoLinkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">Product</h3>
                    <div className="space-y-4">{productLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="block text-sm text-slate-300 transition hover:text-white">
                            {link.label}
                        </Link>
                    ))}</div>
                </div>

                <div>
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">Navigate</h3>
                    <div className="space-y-4">{navigationLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="block text-sm text-slate-300 transition hover:text-white">
                            {link.label}
                        </Link>
                    ))}</div>
                </div>

                <div>
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">Resources</h3>
                    <div className="space-y-4">{resourceLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="block text-sm text-slate-300 transition hover:text-white">
                            {link.label}
                        </Link>
                    ))}</div>
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-slate-500 md:flex-row">
                <p className="text-sm">© {new Date().getFullYear()} HiringLoop. Crafted for fast hiring and career growth.</p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                    <Link href="/" className="transition hover:text-white">Terms of Service</Link>
                    <span className="text-slate-600">•</span>
                    <Link href="/" className="transition hover:text-white">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;