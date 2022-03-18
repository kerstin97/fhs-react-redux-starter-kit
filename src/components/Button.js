import React from 'react'
import styles from './Button.module.css'

export const Button = ({ onClick, children }) => {
  return (
  <button onClick={() => alert(onClick)} className={`${styles.button}`}>
    {children}
  </button>
  )
}
