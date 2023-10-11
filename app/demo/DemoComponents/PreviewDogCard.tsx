import React from 'react'
import styles from '../../styles/dogcard.module.css'
import Image from 'next/image'

interface PreviewDogCardProps {
    name: string,
    img: string
}

export default function PreviewDogCard({name, img}: PreviewDogCardProps) {
  return (
    <div className={styles.dog_preview_container}>
        <Image 
            loader={() => img} 
            unoptimized 
            src={img} 
            alt='dog image' 
            fill 
            style={{pointerEvents: 'none', objectFit: 'cover'}}
            priority
        />
         <b className={styles.dog_name}>{name?.toUpperCase()}</b>
    </div>
  )
}
