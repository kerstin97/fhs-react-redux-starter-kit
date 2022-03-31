import React from 'react'
import styles from './MoneyTransactionList.module.css'
import { MoneyTransaction } from './MoneyTransaction'

export const MoneyTransactionList = ({ users, transactions }) => {
  return (
    <table className={`${styles.transactionlist}`}>
      {transactions.map((transaction) => (
        <MoneyTransaction
          key={transaction.id}
          transaction={transaction}
          debitor={users.find((user) => user.id === transaction.debitorId)}
        />
      ))}
    </table>
  )
}
