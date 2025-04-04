import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import Modal from 'react-modal';
import { categories } from '../utils/constants';

Modal.setAppElement('#root');

const AddExpenseModal = () => {
    const {
        isAddExpenseModalOpen,
        setIsAddExpenseModalOpen,
        addExpense,
        editingExpense
    } = useContext(ExpenseContext);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: categories[0],
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date
            });
        } else {
            setFormData({
                title: '',
                amount: '',
                category: categories[0],
                date: new Date().toISOString().split('T')[0]
            });
        }
    }, [editingExpense]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        const success = addExpense({
            ...formData,
            amount: Number(formData.amount)
        });

        if (success) {
            setFormData({
                title: '',
                amount: '',
                category: categories[0],
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    return (
        <Modal
            isOpen={isAddExpenseModalOpen}
            onRequestClose={() => {
                setIsAddExpenseModalOpen(false);
                setFormData({
                    title: '',
                    amount: '',
                    category: categories[0],
                    date: new Date().toISOString().split('T')[0]
                });
            }}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Amount</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {editingExpense ? 'Update Expense' : 'Add Expense'}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setIsAddExpenseModalOpen(false);
                                setFormData({
                                    title: '',
                                    amount: '',
                                    category: categories[0],
                                    date: new Date().toISOString().split('T')[0]
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;