const app = require('./app');

const PORT = 4000;




app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});