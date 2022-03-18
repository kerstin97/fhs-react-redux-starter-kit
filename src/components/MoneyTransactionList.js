import React from 'react'
import styles from './MoneyTransactionList.module.css'

export const MoneyTransactionList = ({ children }) => {
  return (
    <table className={`${styles.transactionlist}`}>
       {children.map(transaction => (transaction))}
    </table>
  )
}
