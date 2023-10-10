import React from 'react'
import styles from '../styles/leaderboard.module.css'
import { Button, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import DogProfile from './DogProfile'

interface LeaderboardProps {
    close: () => void;
}

export default function Leaderboard({close} : LeaderboardProps) {

    const dogs = useQuery(api.dogs.getDogsDemo);
    const sortedDogs = dogs?.sort((a, b) => b.score - a.score);

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
                    {sortedDogs?.map((dog, index) => (
                        <div className={styles.leaderboard_entries} key={dog._id}>
                            <b>{index + 1}</b>
                            <DogProfile key={dog._id} name={dog.name} img={dog.url}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
