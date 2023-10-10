import React, { useState } from 'react'
import styles from '../styles/leaderboard.module.css'
import { Button, Divider } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import DogProfile from './DogProfile'
import { useClerk } from '@clerk/clerk-react';

interface LeaderboardProps {
    close: () => void;
}

export default function Leaderboard({close} : LeaderboardProps) {

    const dogs = useQuery(api.dogs.getDogs);
    const deleteDog = useMutation(api.dogs.deleteDog);
    const {user} = useClerk();
    const sortedDogs = dogs?.sort((a, b) => b.score - a.score);
    const sortedPersonal = sortedDogs?.filter(dog => dog.author === user?.id);
    const sortedGlobal = sortedDogs?.slice(0, 3);
    const [openEdit, setOpenEdit] = useState(false);

    const handleDeleteDog = (dogId: any) => {
        deleteDog({id: dogId});
    }

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
                    {sortedGlobal?.map((dog, index) => (
                        <div className={styles.leaderboard_entries} key={dog._id}>
                            <b className={
                                        index + 1 === 1 ? styles.first_place :
                                        index + 1 === 2 ? styles.second_place :
                                        styles.third_place}
                            >{index + 1}</b>
                            <DogProfile key={dog._id} name={dog.name} img={dog.url}/>
                        </div>
                    ))}
                </div>

                <div className={styles.personal_leaderboard}>
                    <div className={styles.personal_header}>
                        <h2>Personal</h2>
                        {!openEdit && <Button onClick={() => setOpenEdit(true)}><EditIcon /></Button>}
                        {openEdit && <Button onClick={() => setOpenEdit(false)}><CancelIcon /></Button>}
                    </div>
                    {sortedPersonal?.length ? sortedDogs?.map((dog, index) => {

                        if (dog.author === user?.id) {
                            return (
                                <div className={styles.leaderboard_entries_personal} key={dog._id}>
                                    <div className={styles.left_side_personal}>
                                        <b>{index + 1}</b>
                                        <DogProfile name={dog.name} img={dog.url}/>
                                    </div>
                                    {openEdit && <Button onClick={() => handleDeleteDog(dog._id)}><RemoveCircleOutlineIcon style={{color: 'red'}}/></Button>}
                                </div>
                            )
                        } else {
                            return null;
                        }

                    }) : <p>You have no dogs</p>}
                </div>
            </div>
        </div>
    )
}
