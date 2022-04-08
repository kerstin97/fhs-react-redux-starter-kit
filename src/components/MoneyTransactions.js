import React from 'react'
import { MoneyTransactionList } from '../components/MoneyTransactionList'
import { MoneyTransactionCreate } from '../components/MoneyTransactionCreate'
import { Button } from './Button'
import { signOut, deleteUser } from 'firebase/auth'
import { auth, db } from '../firebase-config'
import { doc, deleteDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export const MoneyTransactions = ({
  users,
  user,
  transactions,
  getTransactions,
  onSubmit,
  oweSomebody,
  toggleOwe
}) => {
  const navigate = useNavigate()

  async function logoutUser () {
    signOut(auth)
      .then(() => {
        console.log('logout')
      })
      .catch(() => {
        alert('logout went wrong')
      })
  }

  async function deleteCurrentUser () {
    const user = auth.currentUser
    const userUid = user.uid
    removeUserFromCollection(userUid)
    deleteUser(user)
      .then(() => {
        removeUserFromCollection(userUid)
        alert('Account deleted')
        navigate('/sign-up')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  async function removeUserFromCollection (userId) {
    await deleteDoc(doc(db, 'users', userId))
  }

  return (
    <>
      <Button onClick={logoutUser}>Log Out</Button>
      <Button onClick={deleteCurrentUser}>Delete Account</Button>
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
