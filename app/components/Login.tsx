import { Button } from '@mui/material'
import styles from '../styles/login.module.css'
import React from 'react'
import DogCardTemplate from './DogCardTemplate'
import { SignUpButton } from '@clerk/clerk-react'


export default function Login() {

    const buttonSx = {
        color: 'white'
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_side}>
                <h1>PupTop</h1>
                <SignUpButton mode='modal'/>
            </div>
        </div>
    )
}
