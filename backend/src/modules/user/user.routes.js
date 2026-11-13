const router = require('express').Router();
const controller = require('./user.controller');
const v = require('./user.validation');
const validate = require('../../middlewares/validate');
const { protect, authorize } = require('../../middlewares/auth');

router.post('/login', validate(v.login), controller.login);

router.use(protect);
router.get('/me', controller.me);

router.get('/', controller.list);
router.post('/', validate(v.create), controller.create);
router.get('/:id', controller.getById);
router.put('/:id', validate(v.update), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
