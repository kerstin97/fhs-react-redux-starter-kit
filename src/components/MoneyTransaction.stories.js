import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransaction } from './MoneyTransaction'

const data = {
  moneyTransaction: [
    { id: 1, creditorId: 1, debitorId: 2, amount: 10.0, paidAt: null },
    {
      id: 2,
      creditorId: 3,
      debitorId: 1,
      amount: 11.2,
      paidAt: '2000-01-01T00:00:00+01+00'
    }
  ],
  user: [
    { id: 1, name: 'Sepp' },
    { id: 2, name: 'Mike' },
    { id: 3, name: 'Fabian' }
  ]
}

storiesOf('MoneyTransaction', module)
  .add('open Transaction', () => (
    <MoneyTransaction
      key={data.moneyTransaction[1].id}
      transaction={data.moneyTransaction[1]}
      debitor={data.user.find(
        (user) => user.id === data.moneyTransaction[1].debitorId
      )}
    />
  ))
  .add('paid Transaction', () => (
    <MoneyTransaction
      key={data.moneyTransaction[0].id}
      transaction={data.moneyTransaction[0]}
      debitor={data.user.find(
        (user) => user.id === data.moneyTransaction[0].debitorId
      )}
    />
  ))
