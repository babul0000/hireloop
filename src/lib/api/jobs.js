// import { serverFetch } from "../core/server";

import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getJobs = async () => {
    return serverFetch('/jobs');
}

export const getJobById = async (jobId) => {
    console.log(jobId);

    return serverFetch(`/api/jobs/${jobId}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const resolvedBaseUrl = baseUrl;
    if (!resolvedBaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SERVER_URL for jobs API');
    }

    // Backend এ route হলো: GET /jobs (না যে /api/jobs)
    const res = await fetch(`${resolvedBaseUrl}/jobs?companyId=${companyId}&status=${status}`);
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Failed to fetch jobs (${res.status}): ${text}`);
    }
    // Unexpected end of JSON input guard
    const text = await res.text();
    if (!text) {
        return [];
    }
    try {
        return JSON.parse(text);
    } catch {
        return [];
    }
}
