export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'LOGIN':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        error: false
      }
    case 'REGISTER':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        error: false
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: true
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}