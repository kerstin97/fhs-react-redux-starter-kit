import React from 'react'
import styles from './TextInput.module.css'

export const TextInput = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className={`${styles.inputfield}`}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id = {id} name={name} value={value} onChange={onChange}></input>
    </div>
  )
}
