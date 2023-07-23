// here we connecting the (api) folder or file we can say with the (main-router) file:
// so that (main-router):will able to connect with the (api) folder:if anyone  call for the (api) request:
const express = require('express');

const router = express.Router();

// here we are connecting the (api) folder:with the (version) folder or file:
// we because we have to (gave) the (data) to the (user) in the (response) from the (api):
// acc to (version) of (api) it is using:
router.use('/v1',require('./v1'));





module.exports = router;


