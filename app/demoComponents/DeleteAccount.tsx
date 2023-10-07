import { Button, Dialog, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../styles/deleteaccount.module.css'

interface DeleteAccountProps {
    open: boolean,
    close: () => void,
}

export default function DeleteAccount({open, close} : DeleteAccountProps) {

    const [username, setUsername] = useState('');

    const handleDeleteAccount = () => {
        close();
    }

    const handleCancelDelete = () => {
        setUsername('');
        close();
    }

    return (
        <Dialog open={open} onClose={close}>
            <form id='delete-form' className={styles.delete_container}>
                <p>Please enter your username to confirm deletion:</p>
                <TextField 
                    id="username-input" 
                    label="Username" 
                    variant="outlined" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button variant='contained' onClick={handleDeleteAccount} sx={{color: 'white'}}>Delete Account</Button>
                <Button variant='outlined' onClick={handleCancelDelete}>Cancel</Button>
            </form>   
        </Dialog>
    )
}
