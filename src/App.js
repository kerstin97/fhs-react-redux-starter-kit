import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUpForm } from './components/SignUpForm'
import { SignInForm } from './components/SignInForm'
import { MoneyTransactionList } from './components/MoneyTransactionList'
import { MoneyTransactionCreate } from './components/MoneyTransactionCreate'
import { db } from './firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'

function App () {
  const [moneyTransaction, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  const [ownId] = useState('OLk5e7VlKsArydZerjWO')

  useEffect(() => {
    getUsers()
    getTransactions()
  }, [])

  async function getUsers () {
    const data = await getDocs(userCollectionRef)
    // We generate our own user objects which match our expected schema
    const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(parsedData)
  }

  async function getTransactions () {
    const data = await getDocs(moneyTransactionsCollectionRef)
    // We generate our own transaction objects which match our expected schema
    const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setTransactions(parsedData)
    console.log(parsedData)
  }

  async function createTransaction (debitor, creditor, amount) {
    // create a new moneytransaction with a generated id.
    const docRef = await addDoc(collection(db, 'moneyTransactions'), {
      debitorId: debitor,
      creditorId: creditor,
      amount: parseInt(amount),
      paidAt: null
    })
    console.log('Document written with ID: ', docRef.id)
  }

  const handleSubmit = function (debitor, creditor, amount) {
    createTransaction(debitor, creditor, amount)
    getTransactions()
  }

  const userCollectionRef = collection(db, 'users')
  const moneyTransactionsCollectionRef = collection(db, 'moneyTransactions')

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route
          path="/money-transactions"
          element={
            <>
              <MoneyTransactionCreate
                users={users}
                creditorId={ownId}
                onSubmit={handleSubmit}
              />
               <MoneyTransactionList transactions={moneyTransaction} users={users}/>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
