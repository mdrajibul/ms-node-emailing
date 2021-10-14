import express, { Request, Response } from 'express';
import path from 'path';
import MailController from './controllers/MailController';

const router = express.Router();

router.use('/assets', express.static(path.join(__dirname, 'assets')));

router.post('/api/mail/send', (req: Request, res: Response) => {
    const restaurantReviewController = new MailController(req, res);
    if (restaurantReviewController.authFilter()) {
        restaurantReviewController.send();
    }
});

export default router;
