import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form } from './Form'

storiesOf('Form', module)
  .add('Sign In', () => (
    <Form type="signin"></Form>
  ))
