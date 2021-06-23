


buttonColors=["red","blue","green","yellow"]

let gameSequence=[];
let userSequence=[];
let count=1;
let i=0;
//Random Add from System

function nextSequence(){
    userSequence=[];
    lvl(count);
    randomNo=Math.floor(Math.random()*4);
    randomChosenColor= buttonColors[randomNo];

    gameSequence.push(randomChosenColor)
    audioPlay(randomChosenColor,press);
    console.log("Game Sequence:["+gameSequence+"]")
}

//Audio and press

function audioPlay(color,btn){

    switch(color){
        case "red": let red=new Audio();
                    red.src="sounds/red.mp3"
                    red.play();
                    btn(`.red`);
                    break;
        case "blue": let blue=new Audio();
                    blue.src="sounds/blue.mp3"
                    blue.play();
                    btn(`.blue`);
                    break;
        case "green": let green=new Audio();
                    green.src="sounds/green.mp3"
                    green.play();
                    btn(`.green`);
                    break;
        case "yellow": let yellow=new Audio();
                    yellow.src="sounds/yellow.mp3"
                    yellow.play();
                    btn(`.yellow`);
                    break;
    } 

}

// auto Button Press

function press(className){
    $(""+className+"").addClass("pressed");
    setTimeout(function(){
        $(""+className+"").removeClass("pressed");
    },200)
    

}

//user Button press

function usPress(className){
    $(""+className+"").addClass("userPressed");
    setTimeout(function(){
        $(""+className+"").removeClass("userPressed");
    },200)

}


//Add to UserArray

function addArr(className){

    switch(className){

        case "red": userSequence.push("red");
                        audioPlay("red",usPress);
                        break;

        case "yellow": userSequence.push("yellow");
                        audioPlay("yellow",usPress);
                        break;

        case "blue": userSequence.push("blue");
                        audioPlay("blue",usPress);
                        break;

        case "green": userSequence.push("green");
                        audioPlay("green",usPress);    
                        break;                   

    }


}

//level incrementer

function lvl(count){
    $("#level-title").text(`level ${count}`)
}




//Game start

$("html").on("keypress ",function(){

    setTimeout(function(){
        let startSound=new Audio("sounds/start.wav");
        startSound.play();

    },500)
    


    setTimeout(function(){
        if(gameSequence.length===0 && userSequence.length===0){
             

            $("body").removeClass("game-over")
       nextSequence();
       
        }


    },1000)
    
})

// playing Logic

$(".btn").on("click",function(e){
    if(gameSequence.length!==0){
        
    let clickedBtn=e.target;
        //++i;
        //console.log(clickedBtn.classList[1]);
        addArr(clickedBtn.classList[1]);
        console.log("User Array:["+userSequence+"]");
        
        
      
 if(gameSequence[i]===userSequence[i] && i<gameSequence.length){
               
                console.log(`matched!`+i);
                console.log(`GS len!${gameSequence.length-1}` );
               // i=-1;
                        if(i === gameSequence.length-1){
                            ++count;
                            setTimeout(nextSequence ,900);
                            i=-1;
                        }
                        

                
     }
 else{
    console.log(`game over`);
    $("#level-title").html(`Game Over!`+"<br>"+`Press any key to start again`)
    userSequence=[];
    gameSequence=[];
    count=1;
    i=-1;
    $("body").addClass("game-over")
    let go=new Audio();
    go.src="sounds/gameover.wav";
    go.play();

    }

                    ++i;
           
        
        
       //nextSequence();
       
       //gameSequence=[];
       
    }
   
})