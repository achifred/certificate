import express from 'express'
import {search, allcert} from '../controller/searchcert'
const router = express.Router()

router.get('/',allcert)
router.get('/:certid', search);


  export{router}
  export default router