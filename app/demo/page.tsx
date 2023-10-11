"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'
import Header from './DemoComponents/Header';
import VotingPlatform from './DemoComponents/VotingPlatform';
import Footer from './DemoComponents/Footer';

export default function Demo() {

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
