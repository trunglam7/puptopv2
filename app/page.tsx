"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import styles from "./page.module.css"
import Header from "./components/Header";
import Login from "./components/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { SignInButton, useClerk } from "@clerk/clerk-react";
import { Button, CircularProgress } from "@mui/material";
import Loading from "./components/Loading";
import VotingPlatform from "./components/VotingPlatform";


export default function Home() {

  const { openSignIn } = useClerk();
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
                <VotingPlatform />
                <Footer />
            </> : isLoading ? <Loading /> : <Login signIn={openSignIn}/>
        }
    </ThemeProvider>
)
}
