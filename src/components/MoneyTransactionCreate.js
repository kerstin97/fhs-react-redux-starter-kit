import React from 'react'
import { Button } from './Button'
import { SelectInput } from './SelectInput'
import { TextInput } from './TextInput'
import styles from './MoneyTransactionCreate.module.css'

export const MoneyTransactionCreate = () => {
  return (
    <form className={`${styles.transaction}`}>
      <SelectInput label='User' id='user'></SelectInput>
      <TextInput type="text" id="amount" label="Amount"></TextInput>
      <Button onClick="Create Transaction">Create</Button>
    </form>
  )
}
