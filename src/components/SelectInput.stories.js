import React from 'react'
import { storiesOf } from '@storybook/react'
import { SelectInput } from './SelectInput'

storiesOf('SelectInput', module)
  .add('SelectInput (default)', () => (
    <SelectInput id="name" label="Name"></SelectInput>
  ))
