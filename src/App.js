import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Form } from './components/Form'
import { MoneyTransactionList } from './components/MoneyTransactionList'
import { MoneyTransactionCreate } from './components/MoneyTransactionCreate'

function App () {
  const [moneyTransaction, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/money-transaction')
      .then((response) => response.json())
      .then((json) => setTransactions(json))
    fetch('http://localhost:3001/user')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  const handleSubmit = function (debitor, creditor, amount) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ debitorId: parseInt(debitor), creditorId: parseInt(creditor), amount: parseInt(amount), paidAt: new Date().toISOString() })
    }

    fetch('http://localhost:3001/money-transaction', options)
      .then(response => response.json())
      .then(() => fetch('http://localhost:3001/money-transaction').then((response) => response.json()).then((json) => setTransactions(json)))
  }

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Form type="signin"></Form>} />
        <Route path="/sign-up" element={<Form></Form>} />
        <Route
          path="/money-transactions"
          element={
            <>
              <MoneyTransactionCreate
                users={users}
                creditorId={4}
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
