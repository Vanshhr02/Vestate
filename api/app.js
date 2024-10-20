import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './routes/auth_route.js';
import test from './routes/test_route.js';
import router from './routes/user_route.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow only this frontend URL
    credentials: true, // Allow credentials (if you're using cookies, etc.)
  }));
  
// Use cookie-parser middleware
app.use(cookieParser());  // Use cookie-parser to parse cookies

// Middleware to parse JSON and URL-encoded form data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use("/api/auth" , auth);
app.use('/api/test' , test);
app.use('/api/router' , router);
app.listen(5000 , ()=>{
    console.log("server is running at port 5000")
})