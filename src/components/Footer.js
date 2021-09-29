import React from 'react'

export default function Footer() {
    return (
        <footer className="text-center text-white bg-info p-4">
            <p className="bold">
                <em>
                    &copy; {new Date().getFullYear()} Michael Russell
                </em>
            </p>   
        </footer>
    )
}
