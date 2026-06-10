import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const SeekerPage = async() => {
    const user = await getUserSession()
    const jobs = await getApplicationsByApplicant(user.id)
    return (
        <div>
            SeekerPage: {jobs.length}
        </div>
    );
};

export default SeekerPage;