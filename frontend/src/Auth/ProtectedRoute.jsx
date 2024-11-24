import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    console.log(user)
    if (user) {

        if (user.role !== 'admin') {
            // alert("You are not allowed")
            return <Navigate to={'/'} />
        }
        return children

    } else {
        // alert("Please login first")
        return <Navigate to='/login' />
    }

}

export default ProtectedRoute