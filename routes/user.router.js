const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middlewares');

router.get('/', userController.getUsers);

router.get('/:user_id',
    userController.getUserById);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    fileMiddleware.checkUserAvatar,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.put('/', userController.updateUser);

router.delete('/',authMiddleware.checkAccessToken, userController.deleteAccount);

module.exports = router;
