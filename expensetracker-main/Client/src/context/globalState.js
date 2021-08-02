import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  username: '',
  password: '',
  password_confirmation: ''
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions(){
    try {
      const res = await axios.get('/api/v1/transactions', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
        if (err.toString().includes('401')) {
          window.location.href = './login';
        }
      
        dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function login(payload){
    try {
      const res = await axios.post('/api/v1/auth/signin', payload);
      localStorage.setItem('token', res.data.token);
      window.location.href = './home';
      dispatch({
        type: 'LOGIN',
        payload: res.data.data
      });
    } catch (err) {
        dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function register(payload){
    try {
      await axios.post('/api/v1/auth/signup', payload);
      dispatch({
        type: 'REGISTER'
      });
      window.location.href = './login';
    } catch (err) {
        dispatch({
        type: 'REGISTER_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`, { headers: {
        authorization: localStorage.getItem('token')
      }})
    } catch (err) {
      if (err.toString().includes('401')) {
        window.location.href = './login';
      }
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }

    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  async function addTransaction(transaction) {
    try {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
      });

    } catch (err) {
      if (err.toString().includes('401')) {
        window.location.href = './login';
      }
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction,
    login,
    register
  }}>
    {children}
  </GlobalContext.Provider>)
}
