import React from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import styles from './Form.module.css'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { Link, Navigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const SignInForm = ({ user }) => {
  if (user) return <Navigate to="/money-transactions"></Navigate>

  async function handleSubmit (email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {}
  }

  const userSchema = object({
    email: string().min(3),
    password: string().min(6)
  })

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: userSchema,
    onSubmit: (values) => {
      handleSubmit(values.email, values.password)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        type="text"
        id="email"
        name="email"
        label="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        errorMessage={formik.errors.email}
      ></TextInput>
      <TextInput
        type="password"
        id="password"
        name="password"
        label="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        errorMessage={formik.errors.password}
      ></TextInput>
      <Button onClick={() => console.log('Sign up')}>Sign In</Button>
      <Link to="/sign-up">Sign Up</Link>
    </form>
  )
}
