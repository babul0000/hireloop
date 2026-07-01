import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardRedirector() {
    const user = await getUserSession();
    if (!user) {
        redirect("/signin");
    }

    const dashboardLinks = {
        seeker: "/dashboard/seeker",
        recruiter: "/dashboard/recruiter",
        admin: "/dashboard/admin",
    };

    redirect(dashboardLinks[user.role || "seeker"]);
}
