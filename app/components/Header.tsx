import React, { useState } from 'react'
import styles from '../styles/header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer } from '@mui/material';
import { useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export default function Header() {

    const router = useRouter();

    const [toggleMenu, setToggleMenu] = useState(false);
    const { signOut } = useClerk();

    const openMenu = () => {
        setToggleMenu(true);
    }

    const closeMenu = () => {
        setToggleMenu(false);
    }

    const handleSignOut = () => {
        signOut();
        router.push('/');
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.app_name}>PupTop</h1>
            <Button onClick={openMenu}><MenuIcon sx={{color:'white'}}/></Button>
            <Drawer
                open={toggleMenu}
                onClose={closeMenu}
                anchor='right'
            >
                <div className={styles.menu_container}>
                    <div className={styles.menu_top}>
                        <Button>
                            <div className={styles.menu_btn}>
                                <SettingsIcon />
                                <p>Settings</p>
                            </div>
                        </Button>
                        <Button onClick={handleSignOut}>
                            <div className={styles.menu_btn}>
                                <LogoutIcon />
                                <p>Log Out</p>
                            </div>
                        </Button>
                    </div>
                   
                    <Button onClick={closeMenu}>
                        <CloseIcon />
                    </Button>
                </div>
            </Drawer>
        </header>
    )
}
