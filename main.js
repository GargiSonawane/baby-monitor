video = "";
status = "";
objects = [];

function preload(){
     alarm = loadSound("baby_alarm.mp3")
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: objects detected";
            document.getElementById("is_baby_present").innerHTML = "Baby detected"; 

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +  "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects.length = 0){
        
    }

function modelLoaded(){
    console.log("model loaded");
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    objects = result;
}