import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PetsIcon from '@mui/icons-material/Pets';

import styles from '../styles/footer.module.css'
import { Button } from '@mui/material';

export default function Footer() {

    const addBtnSx = {
        color: '#009eff',
        borderRadius: '50%',
        border: '7px solid #009eff',
        fontSize: '4.5rem',
        backgroundColor: 'white',
        cursor: 'pointer'
    }

    const navBtnSx = {
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
            bgcolor: '#009eff',
            boxShadow: 'none'
        },
    }

    return (
        <div className={styles.footer}>
            <Button variant='contained' sx={navBtnSx}>
                <div className={styles.menu_btn}>
                    <LeaderboardIcon />
                    <p>Leaderboard</p>
                </div>
            </Button>
            <div className={styles.btn_container}>
                <Button><AddIcon sx={addBtnSx} /></Button>
                <p>Add</p>
            </div>
            <Button variant='contained' sx={navBtnSx}>
                <div className={styles.menu_btn}>
                    <PetsIcon />
                    <p>Your Dogs</p>
                </div>
            </Button>
        </div>
    )
}
