require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],


    function () {
        // concole msg, mark beginning of game
        console.log("Hail to the all mighty Pumpkin King!");

        //--------------------------------Canvas-------------------------------------//
        // Grab the div where we will put our Raphael paper
        var mySVGCanvas = document.getElementById("mySVGCanvas");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(mySVGCanvas);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        var bgRect = paper.rect(0,0,pWidth, pHeight, 30);
            bgRect.attr({"fill": "transparent"});

        //---------------------------------Pre-game. Setting the variables------------------------------------//

        // The evil boogie man!
        var boogie = paper.image("http://orig07.deviantart.net/9d39/f/2006/337/4/b/oogie_boogie_dance_sprite_gif_by_steven_psd.gif", 0, 0, 150, 150);

        // Initial position of boogie
        boogie.xpos=pWidth/2;
        boogie.ypos=pHeight/2;
        // Initial rate of boogie's movement
        boogie.xrate=5;
        boogie.yrate=5;

        // Many Santas to disrupt visuals
        // Numbers of santas to appear
        var numSanta=15;
        // Array of santas
        var santa = [];
        // Set initial value of i to 0
        var i=0;

        while(i<numSanta){
            santa[i]=paper.image("http://image.fg-a.com/christmas/dancing-santa-claus.gif", pWidth/2, pHeight/2, 70, 70);

            // Initial position of santa
            santa[i].xpos=pWidth/2;
            santa[i].ypos=pHeight/2;

            // Initial rate of santa
            santa[i].xrate= -5+10*Math.random();
            santa[i].yrate= -7+14*Math.random();

            // Game over when santa is clicked
            santa[i].addEventListener('click', function(){
                // Alert msg to inform that santa is clicked
                alert('OH NO! You hit Santa! Your total score is ' + counter);
                // Game ends when santa is clicked
                // Problem: calling endgame here will prevent santa from appearing again.
                // Problem solved: I added location.reload within the endGame function to refresh the page when endGame is called
                endGame();
            });
            // increment of i
            i++;
            };
    
        //Instruction box
        var insBox = paper.rect(250,150,400,200);
        insBox.attr({
            stroke: "black",
            fill:"#FFB2B2",
        });
        //Instructions
        var insText = paper.text(450,230,"OH NO!\n Santa was kidnapped by the evil Oogie Boogie!\n Help Jack save Santa! \nKnock out Oogie Boogie within 20 seconds\n But beware not to hurt Santa too!");       
        insText.attr({
            'font-size': 15,
            stroke: "black",
        });

        // Startbutton to start the game whem clicked
        var startButton = paper.circle(450, 350, 40);
        startButton.attr({
            stroke: "black",
            fill: "red",
            strokeWidth: "5"
        });

        var startText = paper.text(450, 350, 'START');
        startText.attr({
            'font-size': 15,
            stroke: "black",
        });

        // Counter to count number of clicks
        var counter = 0;
        var starttime;
        var totaltime = 10;

        //---------------------------------Setting the difficulty level------------------------------------//
        // Set difficulty of game
        // As difficulty level increases, speed of movement of boogie increases and size of boogie decreases 

        // keeps track of the difficulty level of game.
        // False = none of the difficulty levels selected 
        var diffLevel = false;

        // Variables representing Choice of difficulty levels
        var easy = document.getElementById("Easy");
        var normal = document.getElementById("Normal");
        var hard = document.getElementById("Hard");
        
        // Easy Mode
        easy.addEventListener('click',function(){
            boogie.attr({
                height:150,
                width:150,
            });
            boogie.xrate=5;
            boogie.yrate=5;
            diffLevel = true;
            alert("You have selected the EASY mode! Click to start the game!");
        });

        // Normal Mode
        normal.addEventListener('click',function(){
            boogie.attr({
                height:110,
                width:110,
            });
            boogie.xrate=8;
            boogie.yrate=8;
            diffLevel = true;
            alert("You have selected the NORMAL mode! Click to start the game!");
        });

        // Hard Mode
        hard.addEventListener('click',function(){
            boogie.attr({
                height:80,
                width:80,
            });
            boogie.xrate=12;
            boogie.yrate=12;
            diffLevel = true;
            alert("You have selected the HARD mode! Click to start the game!");
        });
        
        // ready function, resets page
        var ready = function(){
            startButton.show();
            startText.show();
            insBox.show();
            insText.show();
            boogie.hide();

        };

        // sound effect when boogie is hit
        var hitEffect = document.getElementById("hitEffect");


        //---------------------------------Game Start------------------------------------//

        //Start function. Hides button and instruction, shows prompt box.
        var start = function (){

            if (diffLevel === false) {
                // Promt msg to tell player to select difficulty level
                confirm("You forgot to set a difficulty level. The Game will proceed with the EASY mode.");
            } else {
                // Game Starts!!
                console.log("Here comes the evil Boogie Man!");
            };

            // Hides start button and instruction text
            startButton.hide();
            startText.hide();
            insBox.hide();
            insText.hide();
            // Starts counting time
            starttime;
            // Show boogie
            boogie.show();
            // calls moveBoogie function, boogie starts moving within canvas
            moveBoogie();

            setInterval(moveSanta, 40);

            setTimeout(endGame, 20000);
        };

        //Start button.
        startButton.addEventListener('click', start) 

        // Problem: I tried to hide boogie when clicks on it like the hit beaver game, but could not get boogie to reappear.
        // moveBoggie Fuction.
        // boogie moves around the canvas when called
        var moveBoogie = function(){

            boogie.xpos += boogie.xrate;
            boogie.ypos += boogie.yrate; 
            boogie.attr({'x': boogie.xpos, 'y': boogie.ypos})

            // For the target to be in constant motion, frequently changing direction.
            // This also ensures that the target does not move out of the game box. 
            if (boogie.xpos > pWidth) {boogie.xrate = -boogie.xrate;}
            if (boogie.ypos > pHeight) {boogie.yrate = -boogie.yrate;}
            if (boogie.xpos < 0) { boogie.xrate = -boogie.xrate;}
            if (boogie.ypos < 0) { boogie.yrate = -boogie.yrate;};
        };

        // Timer to call moveBoogie function every 100 ms
        setInterval(moveBoogie, 100);

        // Hit the boogie!!
        var clickBoogie = boogie.addEventListener('click', function(){
            // Keeps track of the number of times boogie is hit
            counter++
            console.log("You have hit Oogie Boogie " + counter + " times");

            hitEffect.play();

            // Game ends when boogie is hit 10 times within 20 seconds
            if (counter >= 10) {
                confirm("Hooray! You knocked out the evil Boogie Man and saved Santa!");
                endGame();
            }; 

        });

            // moveSanta function
            // moves array of santa when called
            var moveSanta = function(){

                i=0;
                while(i<numSanta){

                    // Assign xpos and ypos to arate and yrate so that santa will move
                    santa[i].xpos += santa[i].xrate;
                    santa[i].ypos += santa[i].yrate;

                    // Santa moves (xpos and ypos of santa changes with xrate and yrate)
                    santa[i].attr({'x': santa[i].xpos, 'y': santa[i].ypos});

                    // Santa bounce back when hit the wall
                    if (santa[i].xpos > pWidth) {santa[i].xrate = -santa[i].xrate};
                    if (santa[i].ypos > pHeight) {santa[i].yrate = - santa[i].yrate};
                    if (santa[i].xpos < 0) {santa[i].xrate = -santa[i].xrate;};
                    if (santa[i].ypos < 0) (santa[i].yrate = - santa[i].yrate);

                    i++;
                };

            };

            var stopSanta = function(){
                i=0;
                while(i<numSanta){

                    // Assign xpos and ypos to arate and yrate so that santa will move
                    santa[i].xpos = -100
                    santa[i].ypos = -100

                i++;
                };
            }

        //---------------------------------Game End------------------------------------//
        // Game ends when santa is hit or when time exceeds 20 second.
        var endGame = function (){ 
            console.log("20 seconds has past!")
            // Msg to inform player that game has ended
            // reloads page upon confirmation
            if(confirm("OH NO!! You did not knock out Oogie Boogie, and know he's coming after you!!") ==true ){
            location.reload();
            };

            // hides boogie
            boogie.attr({
                "x": -100,
                "y": -100
            });
            stopSanta();
            // resets the game
            ready();
        };

    ready();
});