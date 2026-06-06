import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companise';

const CompanyPage = async() => {
    const user =  await getUserSession()
    console.log(user, "company user");

    const company = await getRecruiterCompany(user?.id);
    
    return (
        <div>
            <div>
                <CompanyProfile recruiter={user} recruiterCompany={company} />
            </div>
            company 
        </div>
    );
};

export default CompanyPage;