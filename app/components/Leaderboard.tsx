import React from 'react'
import styles from '../styles/leaderboard.module.css'
import { Button, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import DogProfile from './DogProfile'
import { useClerk } from '@clerk/clerk-react';

interface LeaderboardProps {
    close: () => void;
}

export default function Leaderboard({close} : LeaderboardProps) {

    const dogs = useQuery(api.dogs.getDogs);
    const {user} = useClerk();
    const sortedDogs = dogs?.sort((a, b) => b.score - a.score);
    const sortedPersonal = sortedDogs?.filter(dog => dog.author === user?.id);

    return (
        <div className={styles.leaderboard_container}>
            <div className={styles.leaderboard_header}>
                <h2>Leaderboard</h2>
                <Button onClick={close} aria-label='close'><CloseIcon /></Button>
            </div>
            <Divider />
            <div className={styles.leaderboards}>
                <div className={styles.global_leaderboard}>
                    <h2>Global</h2>
                    {sortedDogs?.map((dog, index) => (
                        <div className={styles.leaderboard_entries} key={dog._id}>
                            <b>{index + 1}</b>
                            <DogProfile key={dog._id} name={dog.name} img={dog.url}/>
                        </div>
                    ))}
                </div>

                <div className={styles.personal_leaderboard}>
                    <h2>Personal</h2>
                    {sortedPersonal?.length ? sortedPersonal?.map((dog, index) => (
                        <div className={styles.leaderboard_entries} key={dog._id}>
                            <b>{index + 1}</b>
                            <DogProfile name={dog.name} img={dog.url}/>
                        </div>
                    )) : <p>You have no dogs</p>}
                </div>
            </div>
        </div>
    )
}
