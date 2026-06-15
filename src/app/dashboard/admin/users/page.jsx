import { getUsersList } from '@/lib/api/user';
import React from 'react';

const AdminUserPage = async() => {
    const users = await getUsersList()
    console.log(users.users, "admin users");
    
    return (
        <div>
            <h2>users: {users.users.length}</h2>
        </div>
    );
};

export default AdminUserPage;