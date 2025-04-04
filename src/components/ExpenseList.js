import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseList = () => {
    const { expenses, deleteExpense, startEditExpense } = useContext(ExpenseContext);

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Food':
                return '🍕';
            case 'Entertainment':
                return '🎬';
            case 'Travel':
                return '✈️';
            default:
                return '💰';
        }
    };

    return (
        <div className="expense-list">
            <h2>Recent Transactions</h2>
            {expenses.length === 0 ? (
                <p>No expenses added yet</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="expense-item">
                            <div className="expense-icon">
                                {getCategoryIcon(expense.category)}
                            </div>
                            <div className="expense-details">
                                <div className="expense-title">{expense.title}</div>
                                <div className="expense-date">
                                    {new Date(expense.date).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
                            <div className="expense-actions">
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteExpense(expense.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="edit-btn"
                                    onClick={() => startEditExpense(expense)}
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;