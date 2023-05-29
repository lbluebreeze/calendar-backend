const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/event');
const { isValidDate } = require('../helpers/isValidDate');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

router.get('/', validateJWT, getEvents);

router.post('/', [
    check('title', '"title" is required').notEmpty(),
    check('start', '"start" is required').custom(isValidDate),
    check('end', '"end" is required').custom(isValidDate),
    validateFields,
    validateJWT
], createEvent);

router.put('/:id', [
    check('title', '"title" is required').notEmpty(),
    check('start', '"start" is required').custom(isValidDate),
    check('end', '"end" is required').custom(isValidDate),
    validateFields,
    validateJWT
], updateEvent);

router.delete('/:id', validateJWT, deleteEvent);

module.exports = router;