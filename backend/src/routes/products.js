const router = require('express').Router();
const productCtrl = require('../controllers/productController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');

router.get('/', productCtrl.listProducts);
router.post('/', authMiddleware, adminOnly, productCtrl.createProduct);
router.get('/:id', productCtrl.getProduct);
router.put('/:id', authMiddleware, adminOnly, productCtrl.updateProduct);
router.delete('/:id', authMiddleware, adminOnly, productCtrl.deleteProduct);

module.exports = router;
