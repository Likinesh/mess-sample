import express, { Router } from 'express'
import dotenv from 'dotenv'
import { verifyuser } from '../middleware/route_auth.js';
import { getDayMenu, getMenu, getNotices } from '../controllers/dataController.js';
dotenv.config();

const router = express.Router();

router.get('/menu',verifyuser,getMenu);
router.get('/daymenu',getDayMenu);
router.get('/notice',verifyuser,getNotices);

export default router;