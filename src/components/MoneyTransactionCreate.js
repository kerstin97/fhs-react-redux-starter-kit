import React, { useContext } from 'react'
import { Button } from './Button'
import { SelectInput } from './SelectInput'
import { TextInput } from './TextInput'
import styles from './MoneyTransactionCreate.module.css'
import { useFormik } from 'formik'
import { object, number } from 'yup'
import { UserContext } from '../App'

export const MoneyTransactionCreate = ({
  users,
  onSubmit,
  oweSomebody,
  toggleOwe
}) => {
  const user = useContext(UserContext)

  const transactionSchema = object({
    amount: number().required()
  })

  const formik = useFormik({
    initialValues: { user: '', amount: '', owe: oweSomebody },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      let creditor
      let debitor

      if (oweSomebody === 'oweMe') {
        creditor = values.user
        debitor = user.uid
      } else {
        debitor = values.user
        creditor = user.uid
      }

      onSubmit(debitor, creditor, values.amount)
      values.amount = ''
      document.getElementById('user-select').value = 0
    }
  })

  return (
    <form className={`${styles.transaction}`} onSubmit={formik.handleSubmit}>
      <div className={`${styles.toggleOwe}`}>
        <input
          type="radio"
          id="oweSb"
          name="owe"
          value="oweSb"
          onChange={() => toggleOwe()}
        ></input>
        <label htmlFor="oweSb">I owe somebody</label>
        <input
          type="radio"
          id="oweMe"
          name="owe"
          value="oweMe"
          onChange={() => toggleOwe()}
        ></input>
        <label htmlFor="oweMe">Somebody owes me</label>
        <br></br>
      </div>

      <SelectInput
        label="User"
        id="user"
        name="user"
        data={users}
        onChange={formik.handleChange}
        value={formik.values.user}
      ></SelectInput>
      <TextInput
        type="text"
        id="amount"
        name="amount"
        label="Amount"
        onChange={formik.handleChange}
        value={formik.values.amount}
      ></TextInput>
      <div className={`${styles.errorMsg}`}>{formik.errors.amount}</div>
      <Button onClick={() => console.log('transaction created')}>Create</Button>
    </form>
  )
}
