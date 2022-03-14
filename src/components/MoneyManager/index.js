import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const option = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = option
    const newTransaction = {
      id: v4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const updatedData = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({
      transactionsList: updatedData,
    })
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  onChangeAmount = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  render() {
    const {title, amount, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="user-profile-container">
            <h1 className="name-heading">Hi Richard</h1>
            <p>
              Welcome back to your
              <span className="money-manager">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-history-container">
            <div className="add-transaction-container">
              <h1 className="transaction-heading">Add Transaction</h1>
              <form
                className="transaction-form-container"
                onSubmit={this.onSubmitForm}
              >
                <label htmlFor="title" className="input-label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  placeholder="TITLE"
                  className="input"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="amount" className="input-label">
                  AMOUNT
                </label>
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  placeholder="AMOUNT"
                  className="input"
                  onChange={this.onChangeAmount}
                />
                <label htmlFor="type" className="input-label">
                  TYPE
                </label>
                <select
                  id="type"
                  className="input"
                  value={optionId}
                  onChange={this.onChangeOptionId}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option key={eachOption.id}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1 className="transaction-heading">History</h1>
              <ul className="history-details-container">
                <li className="list-item" key="headings">
                  <p className="header">Title</p>
                  <p className="header">Amount</p>
                  <p className="header">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                    key={eachTransaction.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
