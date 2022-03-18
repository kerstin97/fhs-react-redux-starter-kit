import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransactionList } from './MoneyTransactionList'

storiesOf('MoneyTransactionList', module)
  .add('Transaction List', () => (
    <MoneyTransactionList/>
  ))
