import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';
import { categories, COLORS } from '../utils/constants';

const ExpenseSummary = () => {
    const { expenses } = useContext(ExpenseContext);

    const categoryData = categories.map(category => {
        const total = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        return { name: category, value: total };
    }).filter(item => item.value > 0);

    return (
        <div className="expense-summary">
            <h2>Expense Summary</h2>
            {categoryData.length > 0 ? (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="legend">
                        {categoryData.map((entry, index) => (
                            <div key={`legend-${index}`} className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span>{entry.name}: ₹{entry.value.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No expenses to display</p>
            )}
        </div>
    );
};

export default ExpenseSummary;