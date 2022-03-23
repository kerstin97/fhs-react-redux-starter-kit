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
