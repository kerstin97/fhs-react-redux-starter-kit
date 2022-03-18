import React from 'react'
import styles from './DecimalInput.module.css'

export const DecimalInput = ({ label, id }) => {
  return (
    <div className={`${styles.inputfield}`}>
      <label htmlFor={id}>{label}</label>
      <input type='number' id={id} name={id}></input>
    </div>
  )
}
