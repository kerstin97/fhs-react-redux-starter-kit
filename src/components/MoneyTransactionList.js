import React from 'react'
import styles from './MoneyTransactionList.module.css'
import { MoneyTransaction } from './MoneyTransaction'

export const MoneyTransactionList = ({ users, transactions, getTransactions, oweSomebody }) => {
  return (
    <table className={`${styles.transactionlist}`}>
      {transactions.map((transaction) => (
        <MoneyTransaction
          getTransactions={getTransactions}
          key={transaction.id}
          transaction={transaction}
          debitor={users.find((user) => oweSomebody === 'oweSb' ? (user.id === transaction.debitorId) : (user.id === transaction.creditorId))
          }
        />
      ))}
    </table>
  )
}
