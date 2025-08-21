const router = require('express').Router();
const orderCtrl = require('../controllers/orderController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');

router.use(authMiddleware);
router.post('/', orderCtrl.createOrder);
router.get('/', orderCtrl.getOrders);
router.put('/:id/status', authMiddleware, adminOnly, orderCtrl.updateStatus);

module.exports = router;
