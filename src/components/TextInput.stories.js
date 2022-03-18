import React from 'react'
import { storiesOf } from '@storybook/react'
import { TextInput } from './TextInput'

storiesOf('TextInput', module)
  .add('TextInput (default)', () => (
    <TextInput type="text" id="username" label="Username"></TextInput>
  ))
