"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, Form } from "@heroui/react";

import {
    Person,
    Envelope,
    Lock,
    Picture,
    Check,
    TriangleExclamation,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

/* =========================
   Reusable Input Component
========================= */
const InputField = ({
    name,
    type = "text",
    placeholder,
    icon,
    value,
    onChange,
}) => {
    return (
        <div className="w-full">
            <label className="text-sm text-gray-300 mb-1 block capitalize">
                {name}
            </label>

            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>

                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="h-14 w-full pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400 outline-none transition"
                />
            </div>
        </div>
    );
};

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        const { name, image, email, password } = formData;

        if (!name || !image || !email || !password) {
            return setError("All fields are required");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            setLoading(true);

            const result = await authClient.signUp.email({
                name,
                image,
                email,
                password,
            });

            if (result?.error) {
                return setError(
                    result.error.message || "Signup failed"
                );
            }

            setSuccess("Account created successfully!");

            setFormData({
                name: "",
                image: "",
                email: "",
                password: "",
            });
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[-100px] left-[-100px] h-72 w-72 bg-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 bg-blue-500/20 blur-3xl rounded-full" />

            {/* Card */}
            <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
                        <Person className="text-white" width={36} />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                        Premium Signup Experience
                    </p>
                </div>

                {/* Success */}
                {success && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        <Check width={18} />
                        {success}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        <TriangleExclamation width={18} />
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <InputField
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={<Person width={18} />}
                    />

                    <InputField
                        name="image"
                        placeholder="Profile image URL"
                        value={formData.image}
                        onChange={handleChange}
                        icon={<Picture width={18} />}
                    />

                    <InputField
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Envelope width={18} />}
                    />

                    <InputField
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={<Lock width={18} />}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?
                    <Link
                        href="/login"
                        className="ml-1 text-cyan-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}