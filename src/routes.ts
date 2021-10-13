import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

router.use('/assets', express.static(path.join(__dirname, 'assets')));

export default router;
