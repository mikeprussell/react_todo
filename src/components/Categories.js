import React from 'react'
import Logout from './Auth/Logout';
import { useAuth } from '../contexts/AuthContext'

export default function Categories() {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Categories</h1>
            {currentUser && <Logout />}
        </div>
    )
}
