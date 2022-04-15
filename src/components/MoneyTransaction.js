import React, { useCallback } from 'react'
import { Button } from './Button'
import styles from './MoneyTransaction.module.css'
import { useFormik } from 'formik'
import { db } from '../firebase-config'
import { doc, updateDoc } from 'firebase/firestore'

const DEFAULT_OBJECT = {}

export const MoneyTransaction = ({
  transaction = DEFAULT_OBJECT,
  debitor = DEFAULT_OBJECT,
  getTransactions
}) => {
  // Update transaction
  async function updateTransaction (moneyTransactionsDocRef) {
    await updateDoc(moneyTransactionsDocRef, {
      paidAt: new Date().toISOString()
    })
  }
  const formik = useFormik({
    initialValues: { id: String(debitor.id) },
    onSubmit: (values) => {
      const moneyTransactionsDocRef = doc(
        db,
        'moneyTransactions',
        transaction.id
      )
      updateTransaction(moneyTransactionsDocRef)
      getTransactions()
    }
  })
  return (
    <tr>
      <td className={`${transaction.paidAt ? `${styles.paid} ` : ''}`}>
        {debitor.name ? debitor.name : 'Unbekannt'}
      </td>
      <td
        className={`${transaction.paidAt ? `${styles.paid}` : ''} ${
          styles.alignend
        }`}
      >
        {transaction.amount}
      </td>
      {!transaction.paidAt && (
        <td className={`${styles.alignend}`}>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="hidden"
              name="id"
              value={`${String(debitor.id)}`}
            ></input>
            <Button
              type="submit"
              onClick={
                useCallback(
                  () => console.log('Paid'),
                  []
                )
              }
              className={`${styles.button}`}
            >
              Paid
            </Button>
          </form>
        </td>
      )}
      {transaction.paidAt && <td></td>}
    </tr>
  )
}
