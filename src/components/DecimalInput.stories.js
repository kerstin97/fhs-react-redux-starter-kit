import React from 'react'
import { storiesOf } from '@storybook/react'
import { DecimalInput } from './DecimalInput'

storiesOf('DecimalInput', module)
  .add('DecimalInput (default)', () => (
    <DecimalInput id="amount" label="Amount"></DecimalInput>
  ))
