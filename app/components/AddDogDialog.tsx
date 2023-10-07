import React, { useState } from 'react'
import styles from '../styles/adddogdialog.module.css'
import TextField from '@mui/material/TextField';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, Divider } from '@mui/material';
import PreviewDogCard from './PreviewDogCard';

interface AddDogDialogProps {
    close: any
}

export default function AddDogDialog({close} : AddDogDialogProps) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const handleImageUpload = (e : any) => {
        if(e.target.files){
            const file = e.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    }

    return (
        <div className={styles.dog_form_container}>
            <h2 className={styles.h2}>Add Dog</h2>
            <TextField variant='outlined' label='Name' onChange={e => setName(e.target.value)}/>
            <div>
                <label 
                    htmlFor='dog-img'
                    style={{cursor: 'pointer'}}
                >
                    <AddAPhotoIcon />
                </label>
            </div>
            <input 
                type='file' 
                accept='image/*' 
                id='dog-img' 
                style={{display: 'none'}}
                onChange={handleImageUpload}
            />
            {image && <PreviewDogCard name={name} img={image} />}
            <Button variant='contained' sx={{color: 'white', width: '100%'}}>Submit</Button>
            <Button variant='outlined' sx={{width: '100%'}} onClick={close}>Cancel</Button>
        </div>
    )
}
