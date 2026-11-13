const router = require('express').Router();
const ctrl = require('./client.controller');
const v = require('./client.validation');
const validate = require('../../middlewares/validate');
const upload = require('../../middlewares/upload');
const { protect, authorize } = require('../../middlewares/auth');

router.use(protect);

router.route('/')
  .get(ctrl.list)
  .post(authorize('Admin', 'Operations'), upload.single('logo'), validate(v.create), ctrl.create);

router.route('/:id')
  .get(ctrl.getById)
  .put(authorize('Admin', 'Operations'), upload.single('logo'), validate(v.update), ctrl.update)
  .delete(authorize('Admin'), ctrl.remove);

module.exports = router;
