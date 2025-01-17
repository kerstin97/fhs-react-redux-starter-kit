import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUpForm } from './components/SignUpForm'
import { SignInForm } from './components/SignInForm'
import { MoneyTransactions } from './components/MoneyTransactions'
import { auth, db } from './firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ResetPassword } from './components/ResetPassword'

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
export const UserContext = React.createContext()

function App () {
  const [moneyTransaction, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  const [oweSomebody, setOweState] = useState('oweMe')

  const [user, setUser] = useState('')

  // to handle the current logged in user in time
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user))
  }, [])

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
      parsedData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((transaction) => transaction.debitorId === user.uid)
    } else {
      parsedData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((transaction) => transaction.creditorId === user.uid)
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
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route
              path="/money-transactions"
              element={
                <ProtectedRoute>
                  <MoneyTransactions
                    transactions={moneyTransaction}
                    users={users}
                    onSubmit={handleSubmit}
                    getTransactions={getTransactions}
                    oweSomebody={oweSomebody}
                    toggleOwe={toggleOwe}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
