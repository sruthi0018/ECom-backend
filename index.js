
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedAdmin = require('./seed/seedAdmin');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product')


dotenv.config();
connectDB().then(() => {
  seedAdmin();
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);


app.get('/', (req, res) => {
  res.send('API is running...');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
