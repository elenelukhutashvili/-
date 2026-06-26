const express = require('express');
const expenseRoutes = require('./expenseRoutes');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/', expenseRoutes);
app.use((req, res) => {
    res.status(404).json({ error: "მოთხოვნილი ლინკი ვერ მოიძებნა!" });
});
app.listen(PORT, () => {
    console.log(`სერვერი წარმატებით ჩაირთო პორტზე: http://localhost:${PORT}`);
});