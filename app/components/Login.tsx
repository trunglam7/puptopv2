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

    const [preview, setPreview] = useState(false);

    const buttonSx = {
        color: 'white'
    };

    const handleLogin = async (e: any) => {
        signIn();
    }

    const handleClosePreview = () => {
        setPreview(false);
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
                    <Button sx={buttonSx} variant='contained' onClick={() => setPreview(true)}>Demo</Button>
                </div>
            </div>
            <Dialog open={preview} onClose={handleClosePreview}>
                <iframe src="https://drive.google.com/file/d/1yYamgjeuuXvcF5bLUYL6ImOAB0Dr4vNW/preview" 
                    allow="autoplay" allowFullScreen>
                </iframe>
            </Dialog>
        </>
        
    )
}
