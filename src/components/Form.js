import React from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import styles from './Form.module.css'

export const Form = ({ type = 'signup' }) => {
  let submitButton
  let linkToForm
  if (type === 'signin') {
    submitButton = <Button>Sign In</Button>
    linkToForm = <a href="#">Sign Up</a>
  } else {
    submitButton = <Button>Sign Up</Button>
    linkToForm = <a href="#">Sign In</a>
  }
  return (
    <form >
      <TextInput type="text" id="username" label="Username"></TextInput>
      <TextInput type="password" id="password" label="password"></TextInput>
      {submitButton}
      {linkToForm}
    </form>
  )
}
