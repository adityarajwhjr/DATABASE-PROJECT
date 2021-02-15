var ball,database,position;

function preload()
{
 
    bgImage=loadImage("Hot Air Ballon-01.png");
    HotAirBallon=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
    
}

function setup(){
    createCanvas(500,500);
//connection between code and database
    database=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addAnimation("balloon",HotAirBallon);
    ball.scale=0.2;

    var syncPosition=database.ref('ball/position');
    syncPosition.on ("value",readPosition,showError);//listener for the database

}

function readPosition(data)
{
    position = data.val();//all the data in the database
    ball.x=position.x;
    ball.y=position.y;
}

function writePosition(x,y)//-1,0
{
    database.ref('ball/position').set({
            'x':position.x + x ,
            'y':position.y + y
        }
    )

}
/*
.ref:refers to the location (ball/position)
.on :listener track changes
.set : used to set the value in database*/


function draw(){
    background(bgImage);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        ball.scale=0.2;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        ball.scale=0.3;
    }
    drawSprites();
}

function showError()
{
    console.log("error while reading data from database");
}