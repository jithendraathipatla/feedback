var mobileNum;
var current= 0;
var phone;
var email;
var company;
var Tshirt;
var bookingId;
var event_name = "testkonfhub-genric6756c1f3";

var REGISTRATION_URL= 'https://ef8ayu2u81.execute-api.us-east-2.amazonaws.com/app/feedback?phone_number=0976543212';
var UPDATE_FEEDBACK_URL='https://ef8ayu2u81.execute-api.us-east-2.amazonaws.com/app/feedback';
var question = {
    
  "questions": [

      {

          "question": "Overall how would you rate the event?",
      },

      {

        "question": "What did you like best about the conference?",
    },

    {

    "question": "Please rate the following aspects of the event:<p style=\"color: #ffff00;\">Date and time</p>",
   },

   {

    "question": "Please rate the following aspects of the event: <p style=\"color: #ffff00;\"> Location</p>",
   },

   {

    "question": "Please rate the following aspects of the event: <p style=\"color: #ffff00;\">Food and beverages</p>",
   },

   {

    "question": "Please rate the following aspects of the event: <p style=\"color: #ffff00;\">Networking</p>",
   },
   {

    "question": "Please rate the following aspects of the event: <p style=\"color: #ffff00;\">Venue</p>",
   },
  
   {

    "question": "Please rate the talk in general: <p style=\"color: #ffff00;\"> â€œKeynote (Kotlin/Anywhere)â€ by Hadi Hariri</p>",
  },
   

  {

          "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œKotlin: Multi-platformâ€ by Amrit Sanjeev</p>",
      },

 
      {

        "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œKotlin DSL - letâ€™s express code in \'mini-language\'â€ by Adit Lal</p>",
    },
    {

    "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œServer-Side Development with Ktorâ€ by Hadi Hariri</p>",
    },

      {

        "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œBuilding cross-platform libraries with Kotlinâ€ by Gopalkrishna P Sharma</p>",
      },
 
 {

        "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œLeveraging sealed classes in Kotlinâ€ by Sanchita Agarwal</p>",
      },
 {

        "question": "Please rate the talk in general: <p style=\"color: #ffff00;\">â€œJetpack Compose â€” Next Gen Kotlin UI Toolkit for Androidâ€ by Ragunath Jawahar</p>",
      },
      
    {
      "question": "Is there anything else youâ€™d like to share with us about Kotlin/ Everywhere 2019?"
  },

     {
       "question": "<div style=\"margin-top:40px\">Did you attend the CodeLabs? <div style=\"margin-top:40px\"><button type=\"button\" class=\"but button2\" id=\"buttonyes\" style=\"padding:10px 20px\" onclick=\"proceedtocodelabs()\">Yes</button>  <button type=\"submit\" class=\"but button2\" id=\"buttonno\" style=\"padding:10px 20px\" onclick=\"proceedtoend()\">No</button></div>"
     },

      {

        "question": "Please rate the CodeLabs in general: <p style=\"color: #ffff00;\">â€œBuild your first Android app in Kotlinâ€ by Hadi Hariri</p>",
     },

     {

      "question": "Please rate the CodeLabs in general: <p style=\"color: #ffff00;\">â€œKotlin Coroutinesâ€  by Amrit Sanjeev</p>",
    },
  

    {

      "question": "Please rate the CodeLabs in general: <p style=\"color: #ffff00;\">â€œRun a Spring Boot application on Google Compute Engineâ€  by Hadi Hariri</p>",
    },

     
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


function post_phone(){
  $.ajax({
    url:REGISTRATION_URL,
    type: "GET",
    data: ({"Phone":mobileNum,"event_name":event_name}),
    contentType: "application/json",
    success: function (data) {
      document.getElementById("spinner").style.display="none";
        console.log(data);
        Tshirt=data.t_shirt;
        email=data.name;
        phone=data.phone;
        company=data.organisation;
        bookingId= data.booking_id;
        localStorage.setItem('bookingId', JSON.stringify(bookingId));
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
    "Phone":mobileNum,
    "QuestionNumber":current+1,
    "Feedback":i,
    "EmailId":email,
    "Company":company,
    "event_name":event_name
  }
  console.log(json_data);
  $.ajax({
    url:UPDATE_FEEDBACK_URL,
    type: "POST",
    data: JSON.stringify(json_data),
    contentType: "json",
    success: function (data) {
  }



});
}
function getAnswer()
{   
  //console.log( questionLength );
    document.getElementById("feedbackquestion").style.display="none";
    var q = question.questions;
   
    if(current== 1 || current == 14)
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
    else if(current==15)
    {
      
      document.getElementById("questions").style.display="block";
      document.getElementById("ques").innerHTML=q[current].question;
      document.getElementById("emoji").style.display="none";
      document.getElementById("butt").style.display="none";
      document.getElementById("write").style.display="none";
      document.getElementById("submitFeedback").style.display="none";
      document.getElementById("end").style.display="none";
      document.getElementById("buttonyes").style.marginTop ="30px";
      document.getElementById("buttonno").style.marginTop ="30px";
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
  document.getElementById("tSize").innerHTML=Tshirt;

  lastQuestion();
}





var q=question.questions;
//console.log(q[2].question);


function lastQuestion(){
  $.ajax({
    url:"https://y5gem8l24h.execute-api.us-east-1.amazonaws.com/quiz/update_goodies",
    type: "POST",
    data: JSON.stringify({"Phone":mobileNum, "last_question":1,"event_name":event_name}),
    contentType: "json",
    success: function (data) {
      //console.log(data);
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