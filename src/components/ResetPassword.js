import React, { useContext } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import styles from './Form.module.css'
import { useFormik } from 'formik'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase-config'
import * as Yup from 'yup'
import { UserContext } from '../App'

export const ResetPassword = () => {
  const user = useContext(UserContext)
  if (user) return <Navigate to="/money-transactions"></Navigate>
  const navigate = useNavigate()

  async function resetPassword (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email for password reset was sent')
        navigate('/sign-in')
      })
      .catch((error) => {
        const errorMessage = error.message
        alert(errorMessage)
      })
  }

  const Schema = Yup.object().shape({
    email: Yup.string().min(6).required('email is required')
  })

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Schema,
    onSubmit: (values) => {
      resetPassword(values.email)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        type="email"
        id="email"
        name="email"
        label="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        errorMessage={formik.errors.email}
      ></TextInput>
      <Button onClick={() => console.log('Reset Password')}>Reset</Button>
      <Link to="/sign-in">Sign In</Link>
    </form>
  )
}
