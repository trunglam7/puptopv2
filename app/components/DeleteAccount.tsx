import { Button, Dialog, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../styles/deleteaccount.module.css'
import { useClerk } from '@clerk/clerk-react';

interface DeleteAccountProps {
    open: boolean,
    close: () => void,
    user: any
}

export default function DeleteAccount({open, close, user} : DeleteAccountProps) {

    const [username, setUsername] = useState('');
    const { signOut } = useClerk();

    const handleDeleteAccount = () => {
        user?.delete().then(() => signOut())
            .catch((err : any) => console.log("Unable to delete account:", err));
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
                <Button variant='contained' onClick={handleDeleteAccount} sx={{color: 'white'}} disabled={username != user.username}>Delete Account</Button>
                <Button variant='outlined' onClick={handleCancelDelete}>Cancel</Button>
            </form>   
        </Dialog>
    )
}
