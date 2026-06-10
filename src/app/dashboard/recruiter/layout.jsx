import { requireRole } from '@/lib/core/session';
import React from 'react';

const recruiterLayout = async({children}) => {
    await requireRole('seeker')
    return children;
};

export default recruiterLayout;