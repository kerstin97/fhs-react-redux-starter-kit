import React from 'react'
import styles from './Button.module.css'

export const Button = ({ onClick, children, type = 'submit' }) => {
  return (
  <button type = {type} onClick={() => console.log(onClick)} className={`${styles.button}`}>
    {children}
  </button>
  )
}
