"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import ConvexClientProvider from "./components/ConvexClientProvider";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import styles from "./page.module.css"
import Header from "./components/Header";
import Login from "./components/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'


export default function Home() {

  // const { loginWithPopup } = useAuth0();

  // const [authenticate, setAuthenticate] = useState(false);
  

  const mainTheme = createTheme({
    palette: {
      primary: {
        main: '#009eff',
      }, 
    }
  });

  return (
    <ThemeProvider theme={mainTheme}>
        <SignInButton afterSignInUrl="/main" mode="modal" />
    </ThemeProvider>
    
  );
}
