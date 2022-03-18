import React, { useState } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import styles from './Form.module.css'
import { useFormik } from 'formik'
import { object, string } from 'yup'
// import { Formik } from 'formik'

export const Form = ({ type = 'signup' }) => {
  const [username, setUsername] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })

  const userSchema = object({
    username: string().min(3),
    password: string().min(6)
  })

  const formik = useFormik({
    initialValues: { username: username.value, password: password.value },
    validationSchema: userSchema,
    onSubmit: (values) => {
      // log the values of the form
      console.log('Password: ' + values.password)
      console.log('Username: ' + values.username)
      // update states
      setUsername({ value: values.username })
      setPassword({ value: values.password })
      // log the updated states
      console.log(username.value)
      console.log(password.value)
    }
  })
  let submitButton
  let linkToForm
  if (type === 'signin') {
    submitButton = <Button onClick="Formic Form submitted">Sign In</Button>
    linkToForm = <a href="#">Sign Up</a>
  } else {
    linkToForm = <a href="#">Sign In</a>
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput type="text" id="username" name="username" label="Username" onChange={formik.handleChange} value={formik.values.username} ></TextInput>
      { formik.errors.username }
      <TextInput type="password" id="password" name="password" label="password" onChange={formik.handleChange} value={formik.values.password}></TextInput>
      { formik.errors.password }
      {submitButton}
      {linkToForm}
    </form>
  )
}
