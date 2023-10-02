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
            {/* <div className={styles.hero_container}>
                <div className={styles.card_container_one}>
                    <img className={styles.card_img} src='/koji.jpg' />
                    <p className={styles.dog_name}>Koji</p>
                </div>
                <div className={styles.card_container_two}>
                    <img className={styles.card_img} src='/rosie.jpg' />
                    <p className={styles.dog_name}>Rosie</p>
                </div>
            </div> */}
            <div className={styles.login_side}>
                <h1>PupTop</h1>
                <Button variant='contained' sx={buttonSx} onClick={() => authenticate()}>Log In or Sign Up</Button>
            </div>
        </div>
    )
}
