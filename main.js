var prediction_1="";
var prediction_2="";
Webcam.set({
    width:350,
    height: 300,
image_format:"png",
png_quality:100
});
var cam=document.getElementById("camera");
Webcam.attach("#camera");
function take_picture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured" src="'+data_uri+'">';
    });
}
console.log("ml5 version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EyPrloO2R/model.json",modelLoaded);
function modelLoaded(){
    console.log("model Loaded");
}
function speak() {
    synth=window.speechSynthesis;
    speak_data1="the first pediction is " +prediction_1;
    speak_data2="the second pediction is " +prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);


}
function check(){
    var image=document.getElementById("captured");
    classifier.classify(image,got_result);
}
function got_result(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="happy"){
        document.getElementById("update_emoji1").innerHTML="&#128522;";
    }
    if(results[0].label=="sad"){
        document.getElementById("update_emoji1").innerHTML="&#128532;";
    }
    if(results[0].label=="angry"){
        document.getElementById("update_emoji1").innerHTML="&#128548;";
    }
    if(results[1].label=="happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522;";
    }
    if(results[1].label=="sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;";
    }
    if(results[1].label=="angry"){
        document.getElementById("update_emoji2").innerHTML="&#128548;";
    }
}
}
