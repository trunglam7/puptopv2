"use client";

import React from 'react'
import VotingPlatform from '../demoComponents/VotingPlatform'
import Header from '../demoComponents/Header'
import Footer from '../demoComponents/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Home() {

    const mainTheme = createTheme({
        palette: {
          primary: {
            main: '#009eff',
          }, 
        }
      });

    return (
        <ThemeProvider theme={mainTheme}>
            <Header />
            <VotingPlatform />
            <Footer />
        </ThemeProvider>
    )
}
