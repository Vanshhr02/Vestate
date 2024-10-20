import express from 'express'

import {shouldbeadmin , shouldbelogin} from "../controllers/test_controllers.js";

const test = express.Router();

test.get("/shouldbeadmin" , shouldbeadmin);
test.get("/shouldbelogin" , shouldbelogin);

export default test;