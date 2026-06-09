import { serverFetch } from "../core/server"

export const getApplicationsByApplicant = async(applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`)
}



// import { serverFetch } from "../core/server";

// export const getApplicationsByApplicant = async (applicantId) => {
//     return serverFetch(`/api/applications?applicantId=${applicantId}`);
// }