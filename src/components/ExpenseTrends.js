import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';
import { categories, COLORS } from '../utils/constants';

const ExpenseTrends = () => {
    const { expenses } = useContext(ExpenseContext);

    const categoryData = categories.map(category => {
        const total = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        return { name: category, amount: total };
    }).filter(item => item.amount > 0);

    return (
        <div className="expense-trends">
            <h2>Expense Trends</h2>
            {categoryData.length > 0 ? (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                            <Bar dataKey="amount">
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>No expense trends to display</p>
            )}
        </div>
    );
};

export default ExpenseTrends;