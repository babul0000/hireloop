import { getJobById } from '@/lib/api/jobs';
import React from 'react';

const JobApplyPage = async({job, applicant}) => {
    

    
    return (
        <div>
            job apply
            apply for job: {job.jobTitle}
        </div>
    );
};

export default JobApplyPage;