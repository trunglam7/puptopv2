import { Button } from '@mui/material'
import styles from '../styles/login.module.css'
import React from 'react'
import DogCardTemplate from './DogCardTemplate'

interface LoginProps {
    authenticate: any
}

export default function Login({authenticate} : LoginProps) {

    const buttonSx = {
        color: 'white'
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_side}>
                <h1>PupTop</h1>
                <Button variant='contained' sx={buttonSx} onClick={() => authenticate()}>Log In or Sign Up</Button>
            </div>
        </div>
    )
}
