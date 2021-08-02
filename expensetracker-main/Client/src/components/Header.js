import React from 'react'

export const Header = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = './login';
  };
  return (
    <>
      <h2>
        Expense Tracker
      </h2>
      <button className="btn" onClick={logout}>
        Log out
      </button>
    </>
  )
}
