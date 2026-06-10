import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ApplicationPage = async() => {
    const user = getUserSession()
    const jobs = await getApplicationsByApplicant(user.id);
    console.log(jobs);
    return (
        <div>
            ApplicationPage: {jobs.length}
        </div>
    );
};

export default ApplicationPage;