import React, { useState } from 'react'
import styles from '../../styles/adddogdialog.module.css'
import TextField from '@mui/material/TextField';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Backdrop, Button, CircularProgress } from '@mui/material';
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
    const [submitting, setSubmitting] = useState(false);

    const generateUploadUrl = useMutation(api.dogs.generateUploadUrl);
    const submitDog = useMutation(api.dogs.submitDogDemo);

    const handleImageUpload = (e : any) => {
        if(e.target.files){
            const file = e.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
            setImage(file);
        }
    }

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": image!.type },
                body: image,
            });
            
            const {storageId} = await result.json();

            await submitDog({storageId, author: 'demo', name: name })
        } catch (err) {
            console.log("Unable to submit dog:", err);
        } finally {
            setImage(null);
            setImagePreview('');
            setSubmitting(false);
            close();
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
            {image && <PreviewDogCard name={name} img={imagePreview} />}
            <Button variant='contained' sx={{color: 'white', width: '100%'}} onClick={handleSubmit}>Submit</Button>
            <Button variant='outlined' sx={{width: '100%'}} onClick={close}>Cancel</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={submitting}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
