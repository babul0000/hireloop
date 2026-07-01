'use server'

import { serverFetch, serverMutation } from "../core/server";

// export const getJobs = async () =>{
//     return serverFetch('/api/jobs');
// }


import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const createJob = async (newJobData) => {
    return serverMutation('/jobs', newJobData);
}

export const deleteJobAction = async (jobId) => {
    try {
        const id = typeof jobId === 'string' ? new ObjectId(jobId) : jobId;
        const res = await db.collection('jobs').deleteOne({ _id: id });
        revalidatePath('/dashboard/admin/jobs');
        revalidatePath('/dashboard/recruiter/jobs');
        return { success: true, deletedCount: res.deletedCount };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createJob = async (newJobData) => {
//     const res = await fetch(`${baseUrl}/api/jobs`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newJobData),
//     });

//     return res.json();
// }