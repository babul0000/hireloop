import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobsForm = async() => {
    const company = await getLoggedInRecruiterCompany();
    console.log(company, "company in post job form");
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobsForm;