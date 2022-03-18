import React from 'react'
import styles from './TextInput.module.css'

export const TextInput = ({ label, type, id }) => {
  return (
    <div className={`${styles.inputfield}`}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id = {id} name={id}></input>
    </div>
  )
}
