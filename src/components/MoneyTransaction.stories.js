import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransaction } from './MoneyTransaction'

storiesOf('MoneyTransaction', module)
  .add('open Transaction', () => (
    <MoneyTransaction user="Araz" amount="10,40$" ></MoneyTransaction>
  ))
  .add('paid Transaction', () => (
    <MoneyTransaction user="Kerstin" amount="8,20$" paid={true}></MoneyTransaction>
  ))
