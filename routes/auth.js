const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/new', [
        check('name', '"name" is required').notEmpty(),
        check('email', '"email" is required').notEmpty(),
        check('email', '"email" is not valid').isEmail(),
        check('password', '"password" length should be greater than 6').isLength({ min: 6 }),
        validateFields
    ], createUser);

router.post('/', [
        check('email', '"email" is required').notEmpty(),
        check('email', '"email" is not valid').isEmail(),
        check('password', '"password" length should be greater than 6').isLength({ min: 6 }),
        validateFields
    ], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;