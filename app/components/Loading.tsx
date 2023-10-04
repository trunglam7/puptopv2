import { CircularProgress } from '@mui/material'
import React from 'react'
import styles from '../styles/loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loading_container}>
        <CircularProgress />
    </div>
  )
}
