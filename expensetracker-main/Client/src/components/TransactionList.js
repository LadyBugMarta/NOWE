import React, { useContext, useEffect } from 'react'
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/globalState'

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <>
             <h3>History</h3>
             <ul id="list" className="list">
                {transactions.map((transaction, id) => (
                    <Transaction 
                        key={id}
                        transaction={transaction}
                        id={id}
                    />
                ))}
            </ul>
        </>
    )
}
