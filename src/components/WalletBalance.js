import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const WalletBalance = () => {
    const { balance, setIsAddBalanceModalOpen, setIsAddExpenseModalOpen } = useContext(ExpenseContext);

    return (
        <div className="wallet-balance">
            <div className="balance-card">
                <h2>Wallet Balance: ₹{balance.toFixed(2)}</h2>
                <button
                    type="button"
                    className="add-income-btn"
                    onClick={() => setIsAddBalanceModalOpen(true)}
                >
                    + Add Income
                </button>
            </div>
            <div className="expense-card">
                <h2>Expenses: ₹{
                    useContext(ExpenseContext).expenses
                        .reduce((sum, expense) => sum + expense.amount, 0)
                        .toFixed(2)
                }</h2>
                <button
                    type="button"
                    className="add-expense-btn"
                    onClick={() => setIsAddExpenseModalOpen(true)}
                >
                    + Add Expense
                </button>
            </div>
        </div>
    );
};

export default WalletBalance;