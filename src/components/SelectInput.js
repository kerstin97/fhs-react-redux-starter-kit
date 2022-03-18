import React from 'react'
import styles from './SelectInput.module.css'

export const SelectInput = ({ label, id }) => {
  return (
    <div className={`${styles.inputfield}`}>
      <label htmlFor={id}>{label}</label>
      <select name={id} id={`${id}-select`}>
        <option value="Araz">Araz</option>
        <option value="Kerstin">Kerstin</option>
      </select>
    </div>
  )
}
