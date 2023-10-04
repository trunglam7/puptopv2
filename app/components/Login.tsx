import { Button } from '@mui/material'
import styles from '../styles/login.module.css'
import React from 'react'
import DogCardTemplate from './DogCardTemplate'
import { SignUpButton, useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import { useConvexAuth } from 'convex/react'

interface LoginProps {
    signIn: any
}


export default function Login({signIn} : LoginProps) {

    const buttonSx = {
        color: 'white'
    };

    const handleLogin = async (e: any) => {
        signIn();
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_side}>
                <h1>PupTop</h1>
                <Button sx={buttonSx} onClick={handleLogin} variant='contained'>Sign In or Sign Up</Button>
            </div>
        </div>
    )
}
