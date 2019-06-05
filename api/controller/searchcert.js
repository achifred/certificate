import Connector  from '../config/connection'

const conn = new Connector();

export const search = async (req,res,next) => {
    try{
      const code = req.params.certid;
      const template = "SELECT * FROM main.check_certificate(:code)";
      const values = {code};
      const {sql,val} = conn.formatsql(template,values);
      const result = await conn.query(sql,val);
     
      res.send({results:result.rows});
    }
    catch(error){
      console.log('request error', error);
      res.status(404);
      res.send({});
    }
  }
  export const allcert = async (req, res, next)=>{
    
    try {
      const sql = "SELECT * FROM main.certview"
      const result = await conn.queryAll(sql)
      res.send({results:result.rows})
      
    } catch (error) {

      res.status(404);
      res.send({});

      
    }
  }
  //export {searchcer, allcert}
 // export default search;