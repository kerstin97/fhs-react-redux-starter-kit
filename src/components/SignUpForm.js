import React from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import styles from './Form.module.css'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { Link } from 'react-router-dom'

export const SignUpForm = () => {
  const userSchema = object({
    username: string().min(3),
    password: string().min(6)
  })

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: userSchema,
    onSubmit: (values) => {
      // log the values of the form
      console.log('Password: ' + values.password)
      console.log('Username: ' + values.username)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput type="text" id="username" name="username" label="Username" onChange={formik.handleChange} value={formik.values.username} errorMessage={ formik.errors.username }></TextInput>
      <TextInput type="password" id="password" name="password" label="password" onChange={formik.handleChange} value={formik.values.password} errorMessage={ formik.errors.password }></TextInput>
      <Button onClick="Sign Up Form">Sign Up</Button>
      <Link to='/sign-in'>Sign In/Link>
    </form>
  )
}
