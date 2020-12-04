import React, { useState } from 'react'
import { firebaseService } from '../../services/firebase'
import './registration.css'
//import { firebaseService } from '../../../services/firebase'
//import firebase from 'firebase'


export default function Registration(): JSX.Element {

  const [email, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [isLogin, toggleLogin] = useState(false)

  const handleLoginChange = (event: React.FormEvent<HTMLInputElement>) => setLogin(event.currentTarget.value)

  const handlePassChange = (event: React.FormEvent<HTMLInputElement>) => setPass(event.currentTarget.value);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!isLogin) {
      firebaseService.logIn(email, pass)
    }
    else {
      firebaseService.register(email, pass)
    }
  }

  const isChecked = (event: React.FormEvent<HTMLInputElement>) => toggleLogin(event.currentTarget.checked)

  return (

    <form>
      <h2>SIGN IN</h2>
      <label className="switch">
        <input id="input" type="checkbox"
          onChange={isChecked}></input>
        <span className="slider round"></span>
      </label>

      <label>
        <p className="label-txt">EMAIL</p>
        <input
          autoComplete="username"
          type="text"
          className="input"
          id="email"
          placeholder="e-mail"
          onChange={handleLoginChange}>
        </input>
        <div className="line-box">
          <div className="line"></div>
        </div>
      </label>

      <label>
        <p className="label-txt">PASSWORD</p>
        <input
          type="password"
          className="input"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={handlePassChange}>
        </input>
        <div className="line-box">
          <div className="line"></div>
        </div>
      </label>
      <button
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>

    </form>
  )
}

