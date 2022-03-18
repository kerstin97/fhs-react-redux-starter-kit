import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Form } from './components/Form'
import { MoneyTransactionList } from './components/MoneyTransactionList'
import { MoneyTransactionCreate } from './components/MoneyTransactionCreate'

function App () {
  return (
    <Router>
      <Routes>
        <Route
          path='/sign-in'
          element={<Form type="signin"></Form>}
        />
        <Route
          path='/sign-up'
          element={<Form></Form>}
        />
        <Route path='/money-transactions' element={
          <>
            <MoneyTransactionCreate
              users={[
                { id: 1, name: 'Sepp' },
                { id: 2, name: 'Mike' },
                { id: 3, name: 'Fabian' },
                { id: 4, name: 'Baum' }
              ]}
              creditorId={4}
            />
            <MoneyTransactionList/>
          </>
        }
        />
      </Routes>
    </Router>
  )
}

export default App
