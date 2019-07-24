var mobileNum;
var current= 0;
var phone;
var email;
var company;
var Tshirt;
var bookingId= "";
var event_name = "testkonfhub-ruby-techb7a8a92c";

var REGISTRATION_URL= 'https://ef8ayu2u81.execute-api.us-east-2.amazonaws.com/app/feedback';
var UPDATE_FEEDBACK_URL='https://ef8ayu2u81.execute-api.us-east-2.amazonaws.com/app/feedback';
var question = {
    
  "questions": [

      {

        "question": "KeyNote: Next Generation Microservices (Burr Sutter)",
      },

      {

        "question": "9 steps to awesome with Kubernetes/OpenShift (Burr Sutter)",
      },
    {

      "question": "What's the magic behind Quarkus, and how can I help (myself)? (Edson Yanaga)",
    },
    {

    "question": "Sail into cloud :: Introduction to Istio (Kamesh Sampath)",
    },
    {

  "question": "Dreaming of streaming with Reactive programming (Edson Yanaga)",
   },
   {

  "question": "Kubernetes serverless application architecture (Burr Sutter)",
   },
   {
   "question": "Java microservices: Being a cloud ultra-native (Burr Sutter)",
   },
  {

  "question": "Cloud-native integration patterns: Kubernetes and Camel K (Kamesh Sampath)",
  },
  {

  "question": "Apache Kafka Streams and event-driven microservices/architecture (Edson Yanaga)",
  },
    {

      "question": "Plumbing Kubernetes CI/CD with Tekton (Kamesh Sampath)",
    },


    {

    "question": "What other kinds of sessions would interest you?",
   },

   {

    "question": "Invitation and registration process",
   },

   {

    "question": "Event facility",
   },

   {

    "question": "Event meals (lunch, breaks)",
   },
   {

    "question": "Event logistics and communications",
   },
  
   {

    "question": "<p>Would you be interested in an exclusive workshop at your Development Centers? If so, please provide us with a point of contact (name, email, and phone) so we can reach out</p>",
  }
  ]

}

var questionLength= question['questions'].length;

//console.log(questionLength) ;




function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode == 8 || charCode == 46
    || charCode == 37 || charCode == 39 || charCode == 32){
      return true;
  }
  else if (charCode == 13 || charCode == 32) {
    //console.log("hi");
    phoneVerification();
}
  else if ( charCode < 48 || charCode > 57 ) {    
    return false;
    }
}



function phoneVerification() {
 
//console.log("hi");
   document.getElementById("spinner").style.display="block";
  // document.getElementById("get").style.display="none";
    mobileNum = document.getElementById("mobilenum").value;
    document.getElementById("name").innerHTML = name;

 
            if (isNaN(mobileNum)) {
                document.getElementById("error-area").style.display="block";
                document.getElementById("registerbtn").style.display="block";
                document.getElementById("get").style.display="block";
                
            }
            else
            {
                post_phone();
            }
    //console.log(mobileNum);
  
}

$("#mobilenum").keyup(function(event) {
  if (event.keyCode === 13) {
    phoneVerification(); 
  }
});

var c = "";
function post_phone(){
  $.ajax({
    url:REGISTRATION_URL+"?phone_number="+mobileNum+"&event_name="+event_name+"",
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      document.getElementById("spinner").style.display="none";
        if(data==400){
          document.getElementById("error-area").style.display = "block";
          return;
        }
        document.getElementById("error-area").style.display = "none";
        Tshirt = data.t_shirt;
        email=data.name;
        phone=data.phone;
        company=data.organisation;
        bookingId= data.booking_id;
        
        localStorage.setItem(bookingId, (bookingId));
        c = bookingId ;
        if(mobileNum=="")
        {
            data.registered_user=0;
        }
        if(data.registered_user==0){
            document.getElementById("error-area").style.display="block";
            document.getElementById("feedbackquestion").style.display="none";
            document.getElementById("phone").style.display="block";    
        }
        else{
            document.getElementById("name").innerHTML = email;
            document.getElementById("Comp_name").innerHTML = company;
            document.getElementById("feedbackquestion").style.display="block";
            document.getElementById("error-area").style.display="none";
            document.getElementById("phone").style.display="none";
        }
    }
  });
}


function send_feedback(i){
  var json_data={
    "booking_id": c,

    "event_name": event_name ,
    "question_number":current+1,
    "feedback": i
  }
  //console.log(json_data);
  $.ajax({
    url:UPDATE_FEEDBACK_URL,
    type: "POST",
    data: JSON.stringify(json_data),
    contentType: "json",
    success: function (data) {
      //console.log(data);
  }



});
}
function getAnswer()
{   
  //console.log( current );
    document.getElementById("feedbackquestion").style.display="none";
    var q = question.questions;
   
    if(current== 11 || current== 15)
    {   
        document.getElementById("write").value="";
        document.getElementById("write").style.width="295px";
        document.getElementById("questions").style.display="block";
        document.getElementById("ques").innerHTML=q[current].question;
        document.getElementById("emoji").style.display="none";
        document.getElementById("butt").style.display="none";
        document.getElementById("write").style.display="block";
        document.getElementById("submitFeedback").style.display="block";
        document.getElementById("end").style.display="none";
    } 
  
    else{
        document.getElementById("questions").style.display="block";
        document.getElementById("ques").innerHTML=q[current].question;
        document.getElementById("emoji").style.display="block";
        document.getElementById("write").style.display="none";
        document.getElementById("butt").style.display="none";
        document.getElementById("submitFeedback").style.display="none";
        document.getElementById("end").style.display="none";
    }
}
function next(i)
{
  send_feedback(i);
  current++;
 
  if(current >= questionLength )
  {
    //console.log("hi");
    end();
    lastQuestion(); 
  }
  else{
  getAnswer();
  }
}
function getWriteFeedback()
{
    var feed = document.getElementById("write").value;
    
        next(feed);
}
function end(){
  document.getElementById("questions").style.display="none";
  document.getElementById("end").style.display="block";
  document.getElementById("tSize").innerHTML = Tshirt;
  document.getElementById("box-container").style.display="none";
  lastQuestion();
}





var q=question.questions;
//console.log(q[2].question);


function lastQuestion(){
  $.ajax({
    url:"https://ef8ayu2u81.execute-api.us-east-2.amazonaws.com/app/goodies",
    type: "PUT",
    data: JSON.stringify({"event_name":event_name, "booking_id": bookingId, "last_question": 1}),
    contentType: "application/json",
    success: function (data) {
      console.log(data);
  }
});
}


// $( document ).ready(function() {
//  lastQuestion();
//  console.log("hi");
// });


// form validation

function proceedtocodelabs(){
  //console.log("hi");
 
  document.getElementById("feedbackquestion").style.display="none";
  
  next();
}


function proceedtoend(){
  document.getElementById("feedbackquestion").style.display="none";
  
  end();
}