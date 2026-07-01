'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Avatar, TextField, Label, Input } from '@heroui/react';
import { Person, Envelope, Key, Briefcase } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const user = session?.user;

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await authClient.user.update({
                name: name
            });
            alert("Profile updated successfully!");
        } catch (e) {
            alert("Failed to update profile: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen justify-center items-center text-zinc-400">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen justify-center items-center text-zinc-400">
                Please sign in to view your profile.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 text-white min-h-screen py-12">
            <div className="flex flex-col gap-2 border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Person className="w-8 h-8 text-fuchsia-400" /> My Profile
                </h1>
                <p className="text-zinc-400 text-sm">
                    Manage your personal details, email address, and platform account type.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                {/* User Avatar Summary Card */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl flex flex-col items-center justify-center space-y-4 text-center h-fit">
                    <Avatar className="w-24 h-24 text-3xl font-bold bg-gradient-to-br from-fuchsia-500 to-violet-600 border-2 border-white/10 shadow-lg">
                        {user.name ? user.name.slice(0,2).toUpperCase() : 'US'}
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-bold text-white">{user.name}</h2>
                        <span className="text-xs text-zinc-500 block mt-1">{user.email}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-purple-950/40 text-purple-400 border border-purple-800/60 capitalize">
                        <Briefcase className="w-3.5 h-3.5" />
                        {user.role} Account
                    </span>
                </Card>

                {/* Edit details form */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
                            Account Information
                        </h2>

                        <div className="space-y-4">
                            <TextField name="name" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Full Name</Label>
                                <Input
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 px-4 text-sm"
                                />
                            </TextField>

                            <TextField name="email" className="flex flex-col gap-1.5 opacity-60">
                                <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Address</Label>
                                <Input
                                    disabled
                                    value={user.email}
                                    className="w-full bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 px-4 text-sm cursor-not-allowed"
                                />
                            </TextField>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-zinc-800">
                            <Button
                                type="submit"
                                isLoading={isSaving}
                                disabled={isSaving}
                                className="bg-white text-black font-semibold rounded-xl px-6 h-11"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
