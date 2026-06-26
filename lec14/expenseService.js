const fs = require('fs');
const path = require('path');

const FILE_NAME = path.join(__dirname, 'expenses.json');

const readExpenses = () => {
    try {
        if (!fs.existsSync(FILE_NAME) || fs.statSync(FILE_NAME).size === 0) {
            fs.writeFileSync(FILE_NAME, '[]');
            return [];
        }
        return JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    } catch (e) {
        return [];
    }
};

const saveExpenses = (data) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2), 'utf-8');
};

const getAllExpenses = (page, take) => {
    const expenses = readExpenses();
    const MAX_TAKE = 50;
    if (take > MAX_TAKE) take = MAX_TAKE;

    const startIndex = (page - 1) * take;
    const paginatedExpenses = expenses.slice(startIndex, startIndex + take);

    return {
        page,
        take,
        totalItems: expenses.length,
        totalPages: Math.ceil(expenses.length / take),
        data: paginatedExpenses
    };
};

const createExpense = (title, amount) => {
    const expenses = readExpenses();
    const newExpense = {
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        title: title.trim(),
        amount: amount,
        createdAt: new Date().toISOString()
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    return newExpense;
}

const updateExpense = (id, title, amount) => {
    const expenses = readExpenses();
    const expense = expenses.find(e => e.id === id);
    if (!expense) return null;

    if (title !== undefined) expense.title = title.trim();
    if (amount !== undefined) expense.amount = amount;

    saveExpenses(expenses);
    return expense;
};

const deleteExpense = (id) => {
    const expenses = readExpenses();
    const initialLength = expenses.length;
    const filteredExpenses = expenses.filter(e => e.id !== id);

    if (filteredExpenses.length === initialLength) return false;

    saveExpenses(filteredExpenses);
    return true;
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};