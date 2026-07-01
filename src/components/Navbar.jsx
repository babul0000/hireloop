"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Button, Avatar } from "@heroui/react";

import {
    Code,
    Bars,
    Xmark,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// const navLinks = [
//     {
//         label: "Browse Jobs",
//         href: "/jobs",
//     },
//     {
//         label: "Company",
//         href: "/company",
//     },
//     {
//         label: "Pricing",
//         href: "/plans",
//     },
// ];

// const dashboardLinks = {
//     seeker: '/dashboard/seeker',
//     recruiter: '/dashboard/recruiter'
// }

// if(user?.email){
//     navLinks.push(
//         {
//             label: 'Dashboard',
//             href: dashboardLinks[user?.role || 'seeker']
//         }
//     )
// }

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const navLinks = useMemo(() => {
        const links = [
            { label: "Browse Jobs", href: "/jobs" },
            { label: "Companies", href: "/jobs" },
            { label: "Pricing", href: "/plans" },
        ];

        if (user?.email) {
            const dashboardLinks = {
                seeker: "/dashboard/seeker",
                recruiter: "/dashboard/recruiter",
                admin: "/dashboard/admin",
            };

            links.push({
                label: "Dashboard",
                href: dashboardLinks[user?.role || "seeker"],
            });
        }

        return links;
    }, [user]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020209]/95 backdrop-blur-xl px-4 py-3 shadow-black/20 md:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-white/5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/20">
                        <Code className="text-white w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-white">HiringLoop</p>
                        <p className="text-xs text-slate-400">AI hiring marketplace</p>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 transition hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            <Avatar className="h-10 w-10 border border-white/10 bg-slate-950">
                                <Avatar.Image
                                    alt={user?.name}
                                    src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                                />
                                <Avatar.Fallback>{user?.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                            </Avatar>
                            <Button onClick={handleSignOut} radius="lg" className="bg-white text-black px-4 py-2 font-semibold">
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/signin" className="text-sm font-medium text-slate-300 transition hover:text-white">
                                Sign In
                            </Link>
                            <Link href="/signup" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-slate-200">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <Xmark className="h-5 w-5" /> : <Bars className="h-5 w-5" />}
                </button>
            </div>

            {isOpen && (
                <div className="mt-4 rounded-3xl border border-white/10 bg-[#070712]/95 p-5 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden">
                    <div className="space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                        {user ? (
                            <Button onClick={handleSignOut} radius="lg" className="w-full bg-white text-black">
                                Sign Out
                            </Button>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    href="/signin"
                                    className="block rounded-2xl px-4 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-slate-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;