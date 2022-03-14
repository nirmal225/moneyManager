// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="balance-income-expense-container">
      <div className="balance-container">
        <img
          alt="balance"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
        />
        <div className="your-balance-container">
          <p className="your">Your Balance</p>
          <p className="amount" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>

      <div className="income-container">
        <img
          alt="expense"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
        />
        <div className="your-balance-container">
          <p className="your">Your Income</p>
          <p className="amount" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-container">
        <img
          alt="balance"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png  "
        />
        <div className="your-balance-container">
          <p className="your">Your Expenses</p>
          <p className="amount" testid="expenseAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
