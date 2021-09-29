import React from 'react'
import Logout from './Auth/Logout';
import { useAuth } from '../contexts/AuthContext'

export default function TodoItems() {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Todo Items</h1>
            {currentUser && <Logout />}
        </div>
    )
}
