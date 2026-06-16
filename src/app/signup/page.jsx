"use client";

import React, { useState, Suspense } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

// ১. মূল সাইন-আপ ফর্মের লজিক এবং UI আলাদা ইন্টারনাল কম্পোনেন্টে রাখা হলো
function SignupFormContent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("seeker");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        // রোল চেক করে সঠিকভাবে ডাইনামিক প্ল্যান অ্যাসাইন করা হলো
        const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free';
        console.log("Submitting with Role:", role, "Plan:", plan);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                plan
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

            {/* Header Container */}
            <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSignup} className="flex flex-col gap-5">

                {/* Name Field */}
                <TextField isRequired name="name" className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                    <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                        <Person className="text-zinc-400 pointer-events-none" size={16} />
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                        />
                    </InputGroup>
                </TextField>

                {/* Email Field */}
                <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                    <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                        <At className="text-zinc-400 pointer-events-none" size={16} />
                        <Input
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                        />
                    </InputGroup>
                </TextField>

                {/* Password Field */}
                <TextField isRequired name="password" className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                    <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                        <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                        <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                        />
                        <button
                            className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                    </InputGroup>
                </TextField>

                {/* Role Selection (Fixed State Update Bug) */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subscription plan</Label>
                    {/* ফিক্স: হিরোইউআই অনুযায়ী onChange এর বদলে value এবং onValueChange ব্যবহার করা হলো */}
                    <RadioGroup 
                        value={role} 
                        onValueChange={(value) => setRole(value)} 
                        orientation="horizontal"
                        className="flex gap-4 mt-1"
                    >
                        <Radio value="seeker">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label className="cursor-pointer">Job Seeker</Label>
                            </Radio.Content>
                        </Radio>
                        <Radio value="recruiter">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label className="cursor-pointer">Recruiter</Label>
                            </Radio.Content>
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Dynamic Status Badges */}
                {error && (
                    <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                        <span className="font-semibold">Error:</span> {error}
                    </div>
                )}

                {success && (
                    <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                        <span className="font-semibold">Success:</span> {success}
                    </div>
                )}

                {/* Action Button */}
                <Button
                    type="submit"
                    color="primary"
                    className="w-full font-semibold rounded-xl text-sm h-12"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    Sign Up
                </Button>

                {/* Navigation Option */}
                <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link href={`/signin?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                        Sign in instead
                    </Link>
                </div>

            </form>
        </Card>
    );
}

// ২. ডিফল্ট এক্সপোর্টে পুরো পেজটিকে Suspense দিয়ে র‍্যাপ করা হলো (যা Vercel বিল্ড ফেইলর আটকাবে)
export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Suspense fallback={<div className="text-zinc-500 text-sm">Loading registration screen...</div>}>
                <SignupFormContent />
            </Suspense>
        </div>
    );
}