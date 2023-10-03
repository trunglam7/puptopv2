"use client"
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useConvexAuth } from "convex/react";
import { useRouter } from 'next/navigation';
import { SignInButton } from '@clerk/clerk-react';

export default function Main() {

    const router = useRouter();
    const { isLoading, isAuthenticated } = useConvexAuth();

    const mainTheme = createTheme({
        palette: {
          primary: {
            main: '#009eff',
          }, 
        }
    });

    return (
        <ThemeProvider theme={mainTheme}>
            {isAuthenticated ? 
                <>
                    <Header />
                    <main className={styles.main}>
                        main
                    </main>
                    <Footer />
                </> : <SignInButton afterSignInUrl="/main" mode="modal" />
            }
        </ThemeProvider>
    )
}
