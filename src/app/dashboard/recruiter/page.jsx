"use client"
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const RecruiterPage = () => {

    const {data: session, isPending} = useSession();
    if(isPending){
        <div>loading....</div>
    }
    const user = session?.user;
    console.log(user);
    
    return (
        <div>
            <h2 className='text-2xl'>Welcome Back {user?.name}</h2>

            <div>
                <DashboardStats/>
            </div>
            
        </div>
    );
};

export default RecruiterPage;