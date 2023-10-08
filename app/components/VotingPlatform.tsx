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
    const {user} = useClerk();

    const getUsers = useQuery(api.users.getUsers);
    const addUser = useMutation(api.users.addUser);
    const updateUser = useMutation(api.users.updateUser);

    const userVotedList = getUsers?.filter(x => x.userId === user?.id)[0].dogsVoted;
    const userConvexId = getUsers?.filter(x => x.userId === user?.id)[0]._id;

    const [swipeDirection, setSwipeDirection] = useState(0);
    const [autoSwipe, setAutoSwipe] = useState(0);
    const [currDog, setCurrDog] = useState<any>(null);

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
        addUser({userId: user ? user?.id : 'none'});
        if(dogs) {
            for(let i = 0; i < dogs?.length; i++) {
                if(userVotedList.includes(dogs[i]._id as string)){
                    continue;
                } else {
                    setCurrDog(dogs[i]);
                    break;
                }
            }
        }
    }, [dogs])

    useEffect(() => {
        if(swipeDirection === -1) {
            updateDogScore({id: currDog._id, score: currDog.score - 1 });
            updateUser({id: userConvexId, dogId: currDog._id});
            setTimeout(() => {
                setSwipeDirection(0);
                if(dogs) {
                    for(let i = 0; i < dogs?.length; i++) {
                        if(userVotedList.includes(dogs[i]._id as string)){
                            continue;
                        } else {
                            setCurrDog(dogs[i]);
                            break;
                        }
                    }
                }
            }, 500)
        }
        else if(swipeDirection === 1) {
            updateDogScore({id: currDog._id, score: currDog.score + 1 });
            updateUser({id: userConvexId, dogId: currDog._id});
            setTimeout(() => {
                setSwipeDirection(0);
                if(dogs) {
                    for(let i = 0; i < dogs?.length; i++) {
                        if(userVotedList.includes(dogs[i]._id as string)){
                            continue;
                        } else {
                            setCurrDog(dogs[i]);
                            break;
                        }
                    }
                }
            }, 500)
        }
        
    }, [swipeDirection]);

    return (
        <div className={styles.voting_platform_container}>
            {(currDog) ? 
                <DogCard 
                    key={currDog._id} 
                    name={currDog.name} 
                    img={currDog.url} 
                    swipe={handleSwipeDirection}
                    autoSwipe={autoSwipe}
                />
                : <p>No More Dogs</p>
            
            }
            <div className={styles.vote_btn_container}>
                <Button 
                    sx={autoSwipe === -1 || swipeDirection === -1 ? leftVotingBtnActiveSx : leftVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(dogs && currDog)} 
                    variant='outlined'
                    onClick={() => handleBtnSwipe('left')}
                    onTouchStart={() => handleBtnSwipe('left')}
                >
                    <NotInterestedIcon sx={{fontSize: '2rem'}}/>
                </Button>
                <Button 
                    sx={autoSwipe === 1 || swipeDirection === 1 ? rightVotingBtnActiveSx : rightVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(dogs && currDog)} 
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
