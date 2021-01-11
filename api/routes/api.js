var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var secret = require('../secret.json');

var t = new twitter({
    consumer_key: secret.consumer_key,
    consumer_secret: secret.consumer_secret,
    access_token_key: secret.access_token_key,
    access_token_secret: secret.access_token_secret
  });
  

  async function getServerResponse() {
    let params = { screen_name: 'nishnha' };
    
    return t.get('lists/list', params)
        .then( res => { return res[0] })
        .catch( e => console.log(e) );
  }

router.get('/', async function(req, res, next) {
  res.send(await getServerResponse());
});

module.exports = router;
