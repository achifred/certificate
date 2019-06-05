import {} from 'dotenv/config'
import  {app} from './app'

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), ()=>{
  console.log(' server listening on port ' + server.address().port);
});

