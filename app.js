const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //If you don't write, it didn't get name correctly

app.use(express.static(__dirname));//static css files & images

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
  const firstname = req.body.firstname;
  const lastname =  req.body.lastname;
  const email = req.body.email;
  console.log(firstname , lastname , email);


  var data = {
    members :[
      {
        email_address: email,
        status : "subscribed",
        merge_fields: {
          FNAME : firstname,
          LNAME : lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

const url = "https://us1.api.mailchimp.com/3.0/lists/a2cf48b93d";
const options = {
  method : "POST",
  auth: "burak4:fd6e3c61f485e743be6e842b60dbcd61-us1"
}

const request = https.request(url,options,function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html"); // res for post request.
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})




  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/"); //route again
})

app.listen(process.env.PORT || 3000,function(){
  console.log("App is listening");
})

//API KEY
// fd6e3c61f485e743be6e842b60dbcd61-us1

//List ID
// a2cf48b93d
