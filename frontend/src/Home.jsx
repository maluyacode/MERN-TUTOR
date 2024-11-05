import React, { useEffect } from 'react'
import AdminSideBar from './layouts/AdminSideBar'
import { auth } from './utils/firebase';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const logout = () => {
        auth.signOut();
        navigate('/login');
    }

    return (
        <AdminSideBar>
            <div>Home</div>
            <Button onClick={logout}>Logout</Button>
        </AdminSideBar>
    )
}