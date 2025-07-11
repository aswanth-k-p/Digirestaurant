
import { Router } from 'express';
import { generateQRCode } from '../controllers/qrCodeController.js';




import { authenticate } from '../middlewares/authenticate.js';

const router=Router();

router.get('/generate', authenticate, generateQRCode);

export default router;