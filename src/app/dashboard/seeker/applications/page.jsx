import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ApplicationsTable from './ApplicationsClient';


const ApplicationPage = async() => {
    const user = getUserSession()
    const jobs = await getApplicationsByApplicant(user.id);
    console.log(jobs);
    return (
        <div>
            <ApplicationsTable jobs={jobs}/>
            {/* ApplicationPage:  */}
        </div>
    );
};

export default ApplicationPage;