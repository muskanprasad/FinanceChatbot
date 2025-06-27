//standardizes financial data retrieval

const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '../../data/mock_financial_data.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

async function getAccountBalance(sessionId, accountType) {
    const user = mockData.users[sessionId];
    if (!user) {
        return null;
    }

    if (accountType) {
        const account = user.accounts.find(acc => acc.type === accountType);
        if (account) {
            return {
                type: account.type,
                balance: account.balance,
                currency: account.currency
            };
        }
    } else {
        const totalBalance = user.accounts.reduce((sum, acc) => sum + (acc.balance > 0 ? acc.balance : 0), 0);
        return {
            type: "total",
            balance: totalBalance,
            currency: "INR",
            accounts: user.accounts.map(acc => ({ type: acc.type, balance: acc.balance, currency: acc.currency }))
        };
    }
    return null;
}

async function getRecentTransactions(sessionId, count = 3) {
    const user = mockData.users[sessionId];
    if (!user || !user.transactions) {
        return [];
    }
    return user.transactions.slice(0, count);
}

async function getLoanProductInfo(loanType) {
    if (loanType) {
        return mockData.loan_products_info.find(loan => loan.type === loanType);
    }
    return mockData.loan_products_info;
}

async function getUserLoanDetails(sessionId) {
    const user = mockData.users[sessionId];
    if (!user || !user.loans) {
        return [];
    }
    return user.loans;
}

module.exports = {
    getAccountBalance,
    getRecentTransactions,
    getLoanProductInfo,
    getUserLoanDetails
};