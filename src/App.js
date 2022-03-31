import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUpForm } from './components/SignUpForm'
import { SignInForm } from './components/SignInForm'
import { MoneyTransactionList } from './components/MoneyTransactionList'
import { MoneyTransactionCreate } from './components/MoneyTransactionCreate'
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [moneyTransaction, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
    getTransactions()
  }, [])
  /* useEffect(() => {
    fetch('http://localhost:3001/money-transaction')
      .then((response) => response.json())
      .then((json) => setTransactions(json))
    fetch('http://localhost:3001/user')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, []) */

  async function getUsers() {
    const data = await getDocs(userCollectionRef)
    // We generate our own user objects which match our expected schema
    const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(parsedData)
    console.log(parsedData)
  }

  async function get() {
    const data = await getDocs(userCollectionRef)
    // We generate our own user objects which match our expected schema
    const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(parsedData)
    console.log(parsedData)
  }

  const handleSubmit = function (debitor, creditor, amount) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        debitorId: parseInt(debitor),
        creditorId: parseInt(creditor),
        amount: parseInt(amount),
        paidAt: new Date().toISOString(),
      }),
    }

    fetch('http://localhost:3001/money-transaction', options)
      .then((response) => response.json())
      .then(() =>
        fetch('http://localhost:3001/money-transaction')
          .then((response) => response.json())
          .then((json) => setTransactions(json)),
      )
  }

  const userCollectionRef = collection(db, 'users')

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
                creditorId={4}
                onSubmit={handleSubmit}
              />
              {/* <MoneyTransactionList transactions={moneyTransaction} users={users}/> */}
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
