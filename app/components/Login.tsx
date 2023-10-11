import { Button, Dialog } from '@mui/material'
import styles from '../styles/login.module.css'
import React, { useState } from 'react'
import { SignUpButton, useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import { useConvexAuth } from 'convex/react'
import PreviewDogCard from './PreviewDogCard'

interface LoginProps {
    signIn: any
}

export default function Login({signIn} : LoginProps) {

    const router = useRouter();

    const buttonSx = {
        color: 'white'
    };

    const handleLogin = async (e: any) => {
        signIn();
    }

    const handleRouteDemo = () => {
        router.push('/demo');
    }

    return (
        <>
            <div className={styles.login_container}>
                <div className={styles.graphic_side}>
                    <PreviewDogCard name='Koji' img='./koji.jpg'/>
                </div>
                <div className={styles.login_side}>
                    <h1>PupTop</h1>
                    <Button sx={buttonSx} onClick={handleLogin} variant='contained'>Sign In or Sign Up</Button>
                    <Button sx={buttonSx} variant='contained' onClick={handleRouteDemo}>Demo</Button>
                </div>
            </div>
        </>
        
    )
}
