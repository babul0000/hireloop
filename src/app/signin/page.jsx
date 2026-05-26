"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Button,
} from "@heroui/react";

import {
  Person,
  Envelope,
  Lock,
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
      <label className="mb-1 block text-sm text-gray-300 capitalize">
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
          className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400"
        />
      </div>
    </div>
  );
};

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    const { email, password } = formData;

    // Validation
    if (!email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const result =
        await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
        });

      if (result?.error) {
        return setError(
          result.error.message || "Login failed"
        );
      }

      setSuccess("Login successful!");


      setFormData({
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4">

      {/* Glow */}
      <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Person
              className="text-white"
              width={36}
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Premium Login Experience
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <InputField
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            icon={<Envelope width={18} />}
          />

          {/* Password */}
          <InputField
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            icon={<Lock width={18} />}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-cyan-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition hover:scale-[1.02]"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="ml-1 text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}