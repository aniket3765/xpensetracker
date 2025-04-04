import React from 'react';
import Header from './Header';
import WalletBalance from './WalletBalance';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import ExpenseTrends from './ExpenseTrends';
import AddBalanceModal from './AddBalanceModal';
import AddExpenseModal from './AddExpenseModal';

const MainDashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <div className="top-section">
                    <WalletBalance />
                    <ExpenseSummary />
                </div>
                <div className="bottom-section">
                    <ExpenseList />
                    <ExpenseTrends />
                </div>
            </div>
            <AddBalanceModal />
            <AddExpenseModal />
        </div>
    );
};

export default MainDashboard;