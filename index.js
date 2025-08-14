
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedAdmin = require('./seed/seedAdmin');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product')
const orderRouter  = require('./routes/order')
const categoryRouter  = require('./routes/category');
const cartRouter = require('./routes/cart')
const dashboardRouter = require('./routes/dashboard')
const errorHandler = require('./middleware/error');



dotenv.config();

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }
});

// attach io to req for controllers to emit
app.use((req, res, next) => { req.io = io; next(); });


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/admin",dashboardRouter)



app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running...');
});


(async () => {
  await connectDB();
  await seedAdmin();

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });
})();