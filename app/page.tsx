"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import ConvexClientProvider from "./components/ConvexClientProvider";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";

export default function Home() {

  const [taskName, setTaskName] = useState('');
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

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => (
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
      </div>
    </main>
  );
}
