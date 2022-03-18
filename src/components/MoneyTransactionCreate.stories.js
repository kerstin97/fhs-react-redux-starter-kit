import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransactionCreate } from './MoneyTransactionCreate'

storiesOf('MoneyTransactionCreate', module).add('Transaction', () => (
  <MoneyTransactionCreate
    users={[
      { id: 1, name: 'Sepp' },
      { id: 2, name: 'Mike' },
      { id: 3, name: 'Fabian' },
      { id: 4, name: 'Baum' }
    ]}
    creditorId={4}
  />
))
