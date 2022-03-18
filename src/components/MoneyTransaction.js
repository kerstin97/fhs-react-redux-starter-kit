import React from 'react'
import { Button } from './Button'
import styles from './MoneyTransaction.module.css'
import { useFormik } from 'formik'

export const MoneyTransaction = ({ transaction, debitor }) => {
  const formik = useFormik({
    initialValues: { id: debitor.id },
    onSubmit: (values) => {
      console.log('ID: ' + values.id + ', paidAt: ' + new Date().toISOString())
    }
  })
  return (
    <tr>
      <td className={`${!transaction.paidAt ? `${styles.paid} ` : ''}`}>{debitor.name}</td>
      <td className={`${!transaction.paidAt ? `${styles.paid}` : ''} ${styles.alignend}`}>{transaction.amount}</td>
        {transaction.paidAt && <td className={`${styles.alignend}`}>
          <form onSubmit={formik.handleSubmit}>
            <input type="hidden" name="id" value={`${debitor.id}`}></input>
            <Button type="submit" onClick="Paid" className={`${styles.button}`}>Paid</Button>
          </form>
        </td>}
      {!transaction.paidAt && <td></td>}
    </tr>
  )
}
