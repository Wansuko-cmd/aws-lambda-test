const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');
const firebaseDatabaseEndpoint = process.env.FIREBASE_DATABASE_ENDPOINT;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDatabaseEndpoint
});

const db = admin.firestore();

exports.handler = (event, context, callback) => {
  // Write a simple document with two fields
  
  let data = {status: "missed"}
  let destination = 'error'
 
  if(event['temperature'] != null && event['mask'] != null){
      let mask = "error"
      
      if(event['mask'] == "true"){
          mask = true
      }else if(event['mask'] == "false"){
          mask = false
      }
      
      data = {
            作成時間: new Date(),
            体温: Number(event['temperature']),
            マスクチェック: mask
      }
      destination = "IndividualInfo"
  }
  
  else{
      //Number(event['co2']
    data = {
        作成時間: new Date(),
        エリア: Number(event['area']),
        二酸化炭素濃度: 0.05,
        湿度: Number(event['humidity'])
    }; 
    destination = "FacilityInfo"
  }

  db.collection(destination).add(data).then((ref) => {
    // On a successful write, return an object
    // containing the new doc id.
    callback(null, {
      id: ref.id
    });
    const response = {
        statusCode: 200,
        body: {
            message: "Success",
        },
    };
    return response;
  }).catch((err) => {
    // Forward errors if the write fails
    callback(err);
    const response = {
        statusCode: 500,
        body: {
            message: err,
        },
    };
    return response;
  });
}


//const db = admin.database();
/*const sleep = require("util").promisify(setTimeout);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: firebaseDatabaseEndpoint
});

let db = admin.firestore();

*/
/*
const ref = db.ref("server/saving-data/fireblog");

exports.handler = async (event, context, callback) => {
    

    var result = "nothing"
    
/*let docRef = db.collection('users').doc('alovelace');
    
    let setAda = docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });*/
       
       /* 
    var usersRef = ref.child("sensor");
    usersRef.set({
        "humidity": event['humidity'],
        "temperature": event['temperature'],
        "co2": event['co2']
    });
    
    await ref.once("value", async function(snapshot) {
        console.log("value Changed!!!");
        console.log(snapshot.val());
        result = await snapshot.val()
    });
        
    const response = {
            statusCode: 200,
            body: {
                message: result,
            },
        };

    //await sleep(1000)
    return response;
};


*/



/*import * as firebase from 'firebase'
import { config } from './config' // config読み込み
firebase.initializeApp(config)

const auth = firebase.auth()

let token = ""

auth.currentUser.getIdToken(true).then((idToken) => {
    token = idToken
    console.log(token)
})
.catch(err => {
    console.log(err)
})


var admin = require("firebase-admin");

const serviceAccount = require('./admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-project-b27c3-default-rtdb.firebaseio.com"
});



exports.handler = async (event, context, callback) => {
    
    
    var result = event.token
    // firebase uid 検証
    const uid = await admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            return decodedToken.uid;
        })
        .catch((error) => {
            console.log(error);
            result = error
            return null;
        })

    if(uid) {
        // 検証に成功している場合実行する処理
        console.log('hello firebase');

        const response = {
            statusCode: 200,
            body: { 
                message: 'verify token success.',
                uid: uid
            },
        };

        return response;
    }
    else {
        const response = {
            statusCode: 500,
            body: {
                message: token
            },
        };

        return response;
    }
};


/*var https = require('https');

exports.handler = function(event, context) {
    // Request Headers
    var send_options = {
        host: '35c9e8bcbbbe.ngrok.io',
        path: '/test',
        method: 'POST'
    };
    // APIリクエスト
    var req = https.request(send_options, function(res){
        res.on('request_body', function (chunk) {
            console.log(res.statusCode + chunk.toString());
        });
        req.on('error', function(err) {
          console.log('ERROR: ' + err.message);
        });
    });
    var request_body = JSON.stringify({
        messages:[
                {
                    "type":"text",
                    "text": "【テスト送信】"
                }
            ]
    });
    req.write(request_body);
    req.end();
    
    const response = {
        statusCode: 200,
        body: "success"
    };
    return response;
};*/






/*const https = require('https');
const querystring = require('querystring');

//const sleep = require("util").promisify(setTimeout);

exports.handler = async (event) => {

         var send_options = {
        host: '35c9e8bcbbbe.ngrok.io',
        path: '/test',
        method: 'POST'
    };
    // APIリクエスト
    var req = https.request(send_options, function(res){
        res.on('request_body', function (chunk) {
            console.log(res.statusCode + chunk.toString());
        });
        req.on('error', function(err) {
          console.log('ERROR: ' + err.message);
        });
    });
    var request_body = JSON.stringify({
        messages:[
                {
                    "type":"text",
                    "text": "【テスト送信】"
                }
            ]
    });
    req.write(request_body);
    req.end();
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: "result",
    };
    return response;
};



/*function test(){
    
    var value = "test"
    const data = JSON.stringify({ text: 'Hello World' })
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const req = https.request('https://35c9e8bcbbbe.ngrok.io/test', options, res => {
        value = res.statusCode
        console.log(res.statusCode)
    })
    
    req.write(data);
    req.end();
    
    //await sleep(1000);
    
    return value
}

function getHazardMapCapture() {
    return new Promise(function (resolve, reject) {
        
        var value = "test"
        const data = JSON.stringify({ text: 'Hello World' })
        
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const req = https.request('https://35c9e8bcbbbe.ngrok.io/test', options, res => {
        value = res.statusCode
        console.log(res.statusCode)
    })
    
    req.write(data);
    req.end();
    });
}



/*exports.handler = async (event) => {
    //var postMessage = 'テスト'
    const data = JSON.stringify({ text: 'Hello World' })
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const req = https.request('https://httpbin.org/post', options, res => {
        result = "res"
        //console.log(res.statusCode)
    })
    
    /*var post_req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          //result = res
          context.succeed();
        });
        res.on('error', function (e) {
        console.log("Got error: " + e.message);
        context.done(null, 'FAILURE');
        });
        result = res
     });
     
    req.write(data);
    req.end();
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: result,
    };
    return response;
};*/