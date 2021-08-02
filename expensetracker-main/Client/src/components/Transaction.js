import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/globalState'

export const Transaction = ({ transaction }) => {
  const [text, setText] = useState(transaction.text)
  const [editable, setEditable] = useState(false)
  const { deleteTransaction } = useContext(GlobalContext)
  const sign = transaction.amount < 0 ? '-' : '+'

  const deleteLabel = (id) => {
    let transactions = JSON.parse(window.localStorage.transactions)
    let filtered = transactions.filter((value) => {
      return id !== value['id']
    })
    localStorage.setItem('transactions', JSON.stringify(filtered))
    deleteTransaction(id)
  }

  const toggleEdit = () => {
    setEditable(!editable)
  }

  const saveTransaction = (label) => {
    JSON.parse(window.localStorage.transactions).map((value, id) => {
      if (transaction.id === value['id']) {
        let transactions = JSON.parse(window.localStorage.transactions)
        transactions[id]['text'] = label
        localStorage.setItem('transactions', JSON.stringify(transactions))
        setText(label)
      }
    })
  }

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {editable ? '' : text}
      <input 
        className="edit-name"
        type="text"
        value={text}
        style={{display: editable ? 'block' : 'none' }}
        onChange={(e) => saveTransaction(e.target.value)}
      />
      <span 
        className="edit-transaction"
        onClick={toggleEdit}
      >
        {editable ? 'Save' : 'Edit'}
        <img 
          style={{ height: '15px', marginLeft: '10px'}}
          src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
        />
      </span>
      <span>{sign}{Math.abs(transaction.amount)} $</span>
      <span class="comment-date">{transaction.date}</span>
      <button
        onClick={() => deleteLabel(transaction.id)}
        className="delete-btn"
      >x</button>
    </li>
  )
}
