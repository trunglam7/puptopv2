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
    const [preview, setPreview] = useState(false);

    const buttonSx = {
        color: 'white'
    };

    const handleLogin = async (e: any) => {
        signIn();
    }

    const switchDemo = () => {
        router.push('/demo');
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
                    <Button sx={buttonSx} onClick={switchDemo} variant='contained'>Demo</Button>
                    <Button sx={buttonSx} variant='contained' onClick={() => setPreview(true)}>Video</Button>
                </div>
            </div>
            <Dialog open={preview} onClose={handleClosePreview}>
                <video controls>
                    <source src="./PupTop_recording.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Dialog>
        </>
        
    )
}
