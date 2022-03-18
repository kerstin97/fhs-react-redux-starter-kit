import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransactionList } from './MoneyTransactionList'
import { MoneyTransaction } from './MoneyTransaction'

storiesOf('MoneyTransactionList', module)
  .add('Transaction List', () => (
    <MoneyTransactionList>
      <MoneyTransaction user="Araz" amount="10,40$"></MoneyTransaction>
      <MoneyTransaction user="Kerstin" amount="8,20$" paid={true}></MoneyTransaction>
      <MoneyTransaction user="Martin" amount="1,60$" paid={true}></MoneyTransaction>
      <MoneyTransaction user="Lisa" amount="8,90$" ></MoneyTransaction>
      <MoneyTransaction user="David" amount="3,20$" ></MoneyTransaction>
      <MoneyTransaction user="Anna" amount="6,20$" paid={true}></MoneyTransaction>
    </MoneyTransactionList>
  ))
