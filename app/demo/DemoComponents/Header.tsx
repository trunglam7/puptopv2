import React, { useEffect, useState } from 'react'
import styles from '../../styles/header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, Drawer } from '@mui/material';
import { useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Header() {

    const [toggleMenu, setToggleMenu] = useState(false);

    const router = useRouter();

    const openMenu = () => {
        setToggleMenu(true);
    }

    const closeMenu = () => {
        setToggleMenu(false);
    }

    const handleSignOut = () => {
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
                        <p style={{textAlign: 'center'}}>DEMO</p>
                        <br />
                        <Divider />
                        <br />
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
