const router = require('express').Router();
const ctrl = require('./campaign.controller');
const v = require('./campaign.validation');
const validate = require('../../middlewares/validate');
const { protect, authorize } = require('../../middlewares/auth');

router.use(protect);

router.route('/')
  .get(ctrl.list)
  .post(authorize('Admin', 'Operations'), validate(v.create), ctrl.create);

router.route('/:id')
  .get(ctrl.getById)
  .put(authorize('Admin', 'Operations'), validate(v.update), ctrl.update)
  .delete(authorize('Admin'), ctrl.remove);

router.put('/:id/sections/:section', authorize('Admin', 'Operations'), validate(v.section), ctrl.updateSection);

module.exports = router;
