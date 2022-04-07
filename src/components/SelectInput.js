import React from 'react'
import styles from './SelectInput.module.css'

export const SelectInput = ({ label, id, name, data, onChange }) => {
  return (
    <div className={`${styles.inputfield}`}>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={`${id}-select`} onChange={onChange}>
      <option key="0" value="0" defaultValue>select user</option>
        {data.map((user) => (
          <option key={user.id} value={user.id} >
            {user.name}
          </option>
        ))}
      </select>
    </div>
  )
}
