import React from 'react'
import { Button } from './Button'
import { SelectInput } from './SelectInput'
import { TextInput } from './TextInput'
import styles from './MoneyTransactionCreate.module.css'
import { useFormik } from 'formik'
import { object, number } from 'yup'

export const MoneyTransactionCreate = ({ users, creditorId }) => {
  const transactionSchema = object({
    amount: number()
  })

  const formik = useFormik({
    initialValues: { user: '', amount: '' },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      // log the values of the form
      console.log('debitor_id: ' + values.user)
      console.log('creditor_id: ' + creditorId)
      console.log('amount: ' + values.amount)
    }
  })

  return (
    <form className={`${styles.transaction}`} onSubmit={formik.handleSubmit} >
      <SelectInput label='User' id='user' name='user' data={users} onChange={formik.handleChange} value={formik.values.user}></SelectInput>
      <TextInput type="text" id="amount" name='amount' label="Amount" onChange={formik.handleChange} value={formik.values.amount}></TextInput>
      <div className={`${styles.errorMsg}`}>{ formik.errors.amount }</div>
      <Button onClick="Create Transaction">Create</Button>
    </form>
  )
}
