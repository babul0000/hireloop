'use server';

import { serverMutation } from "./core/server";

export const createJobs = async (newJobsData) => {
    return serverMutation('/jobs', newJobsData);
}



// const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// export const createJobs = async (newJobsData) => {

//     const res = await fetch(`${baseUrl}/jobs`, {
//         method: "POST",

//         headers: {
//             "content-type": "application/json",
//         },

//         body: JSON.stringify(newJobsData),
//     });

//     return res.json();
// };