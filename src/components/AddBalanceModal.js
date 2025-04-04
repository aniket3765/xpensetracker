import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddBalanceModal = () => {
    const { isAddBalanceModalOpen, setIsAddBalanceModalOpen, addBalance } = useContext(ExpenseContext);
    const [incomeAmount, setIncomeAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!incomeAmount) return;
        addBalance(incomeAmount);
        setIncomeAmount('');
    };

    return (
        <Modal
            isOpen={isAddBalanceModalOpen}
            onRequestClose={() => setIsAddBalanceModalOpen(false)}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Add Balance</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Income Amount"
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Add Balance</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => setIsAddBalanceModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddBalanceModal;