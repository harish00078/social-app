const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

// here we are connecting the (router) folder or file with the (api) folder or file:
// that we have created under the (router) folder:and we are connecting them with the main-file of the (router):
router.use('/api',require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;