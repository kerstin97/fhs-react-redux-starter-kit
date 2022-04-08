import React from 'react'
import { MoneyTransactionList } from '../components/MoneyTransactionList'
import { MoneyTransactionCreate } from '../components/MoneyTransactionCreate'
import { Button } from './Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'

export const MoneyTransactions = ({
  users,
  user,
  transactions,
  getTransactions,
  onSubmit,
  oweSomebody,
  toggleOwe
}) => {
  async function logoutUser () {
    signOut(auth)
      .then(() => {
        console.log('logout')
      })
      .catch(() => {
        console.log('logout went wrong')
      })
  }
  return (
    <>
      <Button onClick={logoutUser}>Abmelden</Button>
      <MoneyTransactionCreate
        users={users.filter((anyuser) => anyuser.id !== user.uid)}
        user={user}
        onSubmit={onSubmit}
        oweSomebody={oweSomebody}
        toggleOwe={toggleOwe}
      />
      <MoneyTransactionList
        transactions={transactions}
        users={users}
        getTransactions={getTransactions}
        oweSomebody={oweSomebody}
      />
    </>
  )
}
