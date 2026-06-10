"use client";

import { Button } from "@heroui/react";
// Using 'Lock' and 'ArrowLeft' as they exist in the library
import { Lock, ArrowLeft } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            {/* Icon Wrapper */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-danger-100 text-danger-600">
                <Lock className="h-10 w-10" />
            </div>

            {/* Content */}
            <h1 className="mb-2 text-4xl font-bold text-foreground">Access Denied</h1>
            <p className="mb-8 max-w-md text-default-500">
                You do not have permission to view this page. If you believe this is an error, 
                please contact your administrator or navigate back to safety.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
                <Button 
                    variant="flat" 
                    onPress={() => router.back()}
                    startContent={<ArrowLeft className="h-4 w-4" />}
                >
                    Go Back
                </Button>
                <Button 
                    color="primary" 
                    onPress={() => router.push("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}