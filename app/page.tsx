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


export default function Home() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [taskName, setTaskName] = useState('');

  const mainTheme = createTheme({
    palette: {
      primary: {
        main: '#009eff',
      }, 
    }
  });

  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.createTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const updateTask = useMutation(api.tasks.updateTask);

  const addTaskHandler = () => {
    createTask({isCompleted: false, text: taskName});
  }

  const deleteTaskHandler = (taskId : any) => {
    deleteTask({id: taskId});
  }

  const finishTaskHandler = (taskId : any) => {
    updateTask({id: taskId})
  }

  const authenticateUser = () => {
    setIsAuthenticated(true);
  }

  const logoutHandler = () => {
    setIsAuthenticated(false);
  }
  
  return (
    <ThemeProvider theme={mainTheme}>
      {isAuthenticated ? 
        <>
          <Header logout={logoutHandler}/>
          <main className={styles.main}>
            {/* {tasks?.map(({ _id, text }) => (
              <div key={_id}>
                <div>{text}</div>
                <button onClick={() => finishTaskHandler(_id)}>Finish</button>
                <button onClick={() => deleteTaskHandler(_id)}>Delete</button>
              </div>
            ))}
            <input placeholder="Task Name" onChange={e => setTaskName(e.target.value)}/>
            <button onClick={addTaskHandler}>Add Task</button>
            <div>
              <LoginButton />
            </div> */}
            Main
          </main>
          <Footer />
        </> :
        <Login authenticate={authenticateUser}/>}
    </ThemeProvider>
    
  );
}
