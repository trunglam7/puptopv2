import React, { useEffect, useState } from 'react'
import styles from '../styles/votingplatform.module.css'
import DogCard from './DogCard'
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';

export default function VotingPlatform() {

    const dogs = useQuery(api.dogs.getDogs);
    const updateDogScore = useMutation(api.dogs.updateScore);
    const updateUser = useMutation(api.users.updateUser);
    const addUser = useMutation(api.users.addUser);
    const {user} = useClerk();

    const getUsers = useQuery(api.users.getUsers);
    const usersVoteList = getUsers?.filter(x => x.userId === user?.id)[0].dogsVoted;
    const updatedDogsList = dogs?.filter(dog => !usersVoteList?.includes(dog._id));

    const userConvexId = getUsers?.filter(x => x.userId === user?.id)[0]._id;

    //const [currDog, setCurrDog] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(0);
    const [autoSwipe, setAutoSwipe] = useState(0);

    const leftVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'red',
            bgcolor: 'coral',
            borderColor: 'coral'
        }
    }

    const leftVotingBtnActiveSx = {
        borderRadius: '2rem',
        color: 'red',
        bgcolor: 'coral',
        borderColor: 'coral'
    }

    const rightVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'green',
            bgcolor: 'aquamarine',
            borderColor: 'aquamarine'
        }
    }

    const rightVotingBtnActiveSx = {
        borderRadius: '2rem',
        color: 'green',
        bgcolor: 'aquamarine',
        borderColor: 'aquamarine'
    }

    const handleSwipeDirection = (direction : number, threshold: number) => {
        direction > threshold ? setSwipeDirection(1) : direction < (-1 * threshold) ? setSwipeDirection(-1): setSwipeDirection(0);
        setAutoSwipe(0);
    }

    const handleBtnSwipe = (direction : string) => {
        if(direction === 'left'){
            setAutoSwipe(-1)
        } else if (direction === 'right') {
            setAutoSwipe(1)
        } else {
            setAutoSwipe(0)
        }
    }

    useEffect(() => {
        if(swipeDirection === -1) {
            updateDogScore({id: updatedDogsList ? updatedDogsList[0]._id : '', score: updatedDogsList ? updatedDogsList[0].score - 1 : 0});
            updateUser({id: userConvexId, dogId: updatedDogsList ? updatedDogsList[0]._id : ''});
            setTimeout(() => {
                //setCurrDog(currDog + 1);
                setSwipeDirection(0);
            }, 500)
        }
        else if(swipeDirection === 1) {
            updateDogScore({id: updatedDogsList ? updatedDogsList[0]._id : '', score: updatedDogsList ? updatedDogsList[0].score + 1 : 0});
            updateUser({id: userConvexId, dogId: updatedDogsList ? updatedDogsList[0]._id : ''});
            setTimeout(() => {
                //setCurrDog(currDog + 1);
                setSwipeDirection(0);
            }, 500)
        }
        
    }, [swipeDirection]);

    useEffect(() => {
        addUser({userId: user ? user.id : ''});
    }, [])

    if(!updatedDogsList) return;

    return (
        <div className={styles.voting_platform_container}>
            {
                (updatedDogsList[0]) ? 
                <DogCard 
                    key={updatedDogsList[0]._id} 
                    name={updatedDogsList[0].name} 
                    img={updatedDogsList[0].url} 
                    swipe={handleSwipeDirection}
                    autoSwipe={autoSwipe}
                />
                : <p>No More Dogs</p>
            }

         <div className={styles.vote_btn_container}>
                <Button 
                    sx={autoSwipe === -1 || swipeDirection === -1 ? leftVotingBtnActiveSx : leftVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(updatedDogsList && updatedDogsList[0])} 
                    variant='outlined'
                    onClick={() => handleBtnSwipe('left')}
                    onTouchStart={() => handleBtnSwipe('left')}
                >
                    <NotInterestedIcon sx={{fontSize: '2rem'}}/>
                </Button>
                <Button 
                    sx={autoSwipe === 1 || swipeDirection === 1 ? rightVotingBtnActiveSx : rightVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(updatedDogsList && updatedDogsList[0])} 
                    variant='outlined'
                    onClick={() => handleBtnSwipe('right')}
                    onTouchStart={() => handleBtnSwipe('right')}
                >
                    <FavoriteIcon sx={{fontSize: '2rem'}}/>
                </Button>   
            </div>
        </div>
    )
}
