import React from 'react'
import { Button } from './Button'
import styles from './MoneyTransaction.module.css'

export const MoneyTransaction = ({ user, amount, paid = false }) => {
  return (
    <tr>
      <td className={`${paid ? `${styles.paid} ` : ''}`}>{user}</td>
      <td className={`${paid ? `${styles.paid}` : ''} ${styles.alignend}`}>{amount}</td>
      {!paid && <td className={`${styles.alignend}`}><Button onClick="Paid" className={`${styles.button}`}>Paid</Button></td>}
      {paid && <td></td>}
    </tr>
  )
}
