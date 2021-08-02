import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'

export const AddTransaction = () => {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState(0)
  const { addTransaction } = useContext(GlobalContext)
  const onSubmit = e => {
    e.preventDefault()
    const generatedId = Math.floor(Math.random() * 100000000)
    const newTransaction = {
      id: generatedId,
      text,
      amount: +amount,
      date: getDate()
    }

    if (Boolean(window.localStorage.transactions)) {
      let transactions = [...(JSON.parse(localStorage.transactions)), newTransaction]
      localStorage.setItem('transactions', JSON.stringify(transactions))
    } else {
      let transactions = [newTransaction]
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }

    addTransaction(newTransaction)
    setText('')
    setAmount(0)
  }

  const getDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = mm + '.' + dd + '.' + yyyy
    return today
  }

  useEffect(() => {
    if (Boolean(window.localStorage.transactions)) {
      let transactions = JSON.parse(window.localStorage.transactions)
      setTimeout(() => {
        if (window.localStorage.transactions && transactions.length > 0) {
          transactions.map((transaction) => {
            addTransaction(transaction)
          })
        }
      }, 500)
    }
  }, [])

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} 
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
