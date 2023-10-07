import React, { useState } from 'react'
import styles from '../styles/adddogdialog.module.css'
import TextField from '@mui/material/TextField';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button } from '@mui/material';
import PreviewDogCard from './PreviewDogCard';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';

interface AddDogDialogProps {
    close: any
}

export default function AddDogDialog({close} : AddDogDialogProps) {

    const [name, setName] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const { user } = useClerk();

    const generateUploadUrl = useMutation(api.dogs.generateUploadUrl);
    const submitDog = useMutation(api.dogs.submitDog);

    const handleImageUpload = (e : any) => {
        if(e.target.files){
            const file = e.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
            setImage(file);
        }
    }

    const handleSubmit = async () => {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": image!.type },
            body: image,
        });
        
        const {storageId} = await result.json();

        await submitDog({storageId, author: user ? user?.id : '', name: name })
        setImage(null);
        setImagePreview('');
        close();
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
            {image && <PreviewDogCard name={name} img={imagePreview} />}
            <Button variant='contained' sx={{color: 'white', width: '100%'}} onClick={handleSubmit}>Submit</Button>
            <Button variant='outlined' sx={{width: '100%'}} onClick={close}>Cancel</Button>
        </div>
    )
}
