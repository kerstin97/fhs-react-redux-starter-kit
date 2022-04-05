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

  const [oweSomebody, setOweState] = useState('oweMe')
  const [ownId] = useState('OLk5e7VlKsArydZerjWO')

  function toggleOwe () {
    if (oweSomebody === 'oweSb') {
      setOweState('oweMe')
    } else {
      setOweState('oweSb')
    }
  }

  useEffect(() => {
    getUsers()
    getTransactions()
  }, [oweSomebody])

  async function getUsers () {
    const data = await getDocs(userCollectionRef)
    const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(parsedData)
  }

  async function getTransactions () {
    const data = await getDocs(moneyTransactionsCollectionRef)
    let parsedData
    if (oweSomebody === 'oweMe') {
      parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(transaction => transaction.debitorId === ownId)
    } else {
      parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(transaction => transaction.creditorId === ownId)
    }
    setTransactions(parsedData)
  }

  async function createTransaction (debitor, creditor, amount) {
    // create a new moneytransaction with a generated id.
    await addDoc(collection(db, 'moneyTransactions'), {
      debitorId: debitor,
      creditorId: creditor,
      amount: parseFloat(amount),
      paidAt: null
    })
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
                users={users.filter(user => user.id !== ownId)}
                myId={ownId}
                onSubmit={handleSubmit}
                oweSomebody={oweSomebody}
                toggleOwe={toggleOwe}
              />
               <MoneyTransactionList transactions={moneyTransaction} users={users} getTransactions={getTransactions} oweSomebody={oweSomebody}/>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
