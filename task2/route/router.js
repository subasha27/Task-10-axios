const express = require("express");
const router = express.Router();
const functi = require("../controller/function");
const upload = require("../controller/function")


router.get('/getit/:id',functi.getIt);
router.post('/banner',functi.manageFile,functi.createIt);
router.put('/banner/:id',functi.manageFile ,functi.updateIt);
router.delete('/banner/:id',functi.deleteIt);
router.get('/getall',functi.getAll);



module.exports = router;