
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { getJobById } from '@/lib/api/jobs';
import JobApplyPage from './JobApply';


const ApplyPage = async({params}) => {
    const {id} = await params;
    const user = await getUserSession()
    console.log(user, "apply user");

    if(!user){
        redirect(`/signin?redirect=/jobs/${id}/apply`)
    }
    
    if(user.role !== "seeker"){
        return(
            <div className='flex items-center justify-center min-h-screen'>
                <p>You must be a job seeker to apply for jobs.</p>
            </div>
        )
    }

    const job = await getJobById(id);
    console.log(job);
    
    return (
        <div>
            apply for job:
            <JobApplyPage applicant={user} job={job}/>
        </div>
    );
};

export default ApplyPage;