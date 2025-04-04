import React, { createContext, useState, useEffect } from 'react';
import  useLocalStorage  from '../hooks/useLocalStorage';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [balance, setBalance] = useLocalStorage('walletBalance', 5000);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    const addBalance = (amount) => {
        setBalance(prev => prev + Number(amount));
        setIsAddBalanceModalOpen(false);
    };

    const addExpense = (expense) => {
        if (expense.amount > balance) {
            alert("You don't have enough balance!");
            return false;
        }

        if (editingExpense) {
            // Calculate the difference if editing
            const oldExpense = expenses.find(e => e.id === editingExpense.id);
            const difference = oldExpense.amount - expense.amount;
            setBalance(prev => prev + difference);

            setExpenses(prev =>
                prev.map(e => e.id === editingExpense.id ? expense : e)
            );
        } else {
            setBalance(prev => prev - expense.amount);
            setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
        }

        setEditingExpense(null);
        return true;
    };

    const deleteExpense = (id) => {
        const expenseToDelete = expenses.find(e => e.id === id);
        setBalance(prev => prev + expenseToDelete.amount);
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const startEditExpense = (expense) => {
        setEditingExpense(expense);
        setIsAddExpenseModalOpen(true);
    };

    return (
        <ExpenseContext.Provider value={{
            balance,
            expenses,
            addBalance,
            addExpense,
            deleteExpense,
            startEditExpense,
            isAddBalanceModalOpen,
            setIsAddBalanceModalOpen,
            isAddExpenseModalOpen,
            setIsAddExpenseModalOpen,
            editingExpense
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};