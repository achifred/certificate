import {Pool} from 'pg';

class Connector {
  constructor(){
    var self = this;
    const pool = new Pool({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL=='true', // set to false
        min: process.env.DB_POOLMIN, // set min pool size to 4
        max: process.env.DB_POOLMAX, // set pool max size to 20
        idleTimeoutMillis: process.env.DB_IDLETIMEOUT, //30000, // close idle clients after 30 seconds
        connectionTimeoutMillis: process.env.DB_CONNTIMEOUT, //30000, // return an error after 30 seconds if connection could not be established
    });

    pool.on('connect', (client) => {
      const {totalCount,idleCount,waitingCount} = pool;
      //logger.log('debug',`total:${totalCount},idle:${idleCount},waiting:${waitingCount}`);
    });

    pool.on('error', (err, client) => {
      console.log('error','Unexpected error on idle client', err);
    });

    this.pool = pool;

    pool.connect((err, client, done) => {
        if(err) {
          console.log('connection error',err);
            throw new Error('Could not connect to database, with error : ' + err);
        }
        self._client = client;
        self._pgDone = done;
        self.client = client;
    });
  }

  formatsql(template,values){
    var rtn = '';
    var v = [];
    try{
      var i=0;
      rtn = template.replace(/\s*(:(\w+))/g,function(match,m1,m2,offset,str){
        v.push(values[m2]);
        return `$${++i}`;
      })
    }
    catch(e){
      console.log('FormatSQLError:',e);
    }
    return {sql:rtn,val:v};
  }
  queryAll(sql){
    return new Promise((resolve, reject)=>{
      this.pool.query(sql, (err,res)=>{
        if(err){
          reject(err)
        }else{
          resolve(res)
        }
      })
    })
  }
  query(sql,params){
    return new Promise((resolve,reject)=>{
      this.pool.query(sql,params,(err,res) => {
        if(err){
          reject(err);
        }
        else{
          resolve(res);
        }
      });
    });
  }
}

export default Connector;