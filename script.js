$(document).ready(function(){
    const startPlay = ['Player 1','Player 2']
    var gameStart = null
    var move = ''
    var moveCounter = 0;
    var countdown = 30;
    var timer
    var draw = false
    function countdownStart(){
        timer = setInterval(function() {
            $('.countdown-timer').text(countdown);
            countdown--;
            if (countdown < 0) {
                clearInterval(timer);
                $('.countdown-timer').text("Time's up!");
            }
        }, 400);
    
    }

    function resetCountdown() {
        clearInterval(timer);
        countdown = 30;
        $('.countdown-timer').text(countdown);
        moveCounter = 0;
   
    }


    function randomPlayerStart(){
        var randomValue = startPlay[Math.floor(Math.random() * startPlay.length)];

        return randomValue
    }

    function checkWinner() {
        var tiles = [$('#tile1').text(),$('#tile2').text(),$('#tile3').text(),
                     $('#tile4').text(),$('#tile5').text(),$('#tile6').text(),
                     $('#tile7').text(),$('#tile8').text(),$('#tile9').text(),
                    ]

        if(tiles[0] == tiles[1] && tiles[1] == tiles[2] && tiles[0].trim()  !== '' && tiles[2].trim() !== ''){
            return true
        }
        else if(tiles[3] == tiles[4] && tiles[4] == tiles[5] && tiles[3].trim() !== '' && tiles[4].trim() !== ''){
            return true
        }
        else if(tiles[6] == tiles[7] && tiles[7] == tiles[8] && tiles[6].trim() !== '' && tiles[7].trim() !== ''){
            return true
        }
        else if(tiles[0] == tiles[3] && tiles[3] == tiles[6] && tiles[0].trim() !== '' && tiles[3].trim() !== ''){
            return true
        }
        else if(tiles[1] == tiles[4] && tiles[4] == tiles[7] && tiles[1].trim() !== '' && tiles[4].trim() !== ''){
            return true
        }
        else if(tiles[2] == tiles[5] && tiles[5] == tiles[8] && tiles[2].trim() !== '' && tiles[5].trim() !== ''){
            return true
        }
        else if(tiles[0] == tiles[4] && tiles[4] == tiles[8] && tiles[0].trim() !== '' && tiles[4].trim() !== ''){
            return true
        }
        else if(tiles[2] == tiles[4] && tiles[4] == tiles[6] && tiles[2].trim() !== '' && tiles[4].trim() !== ''){
            return true
        }
        else{
            return false
        }
        
    }

    function checkPlayer(value){
        if(value === 'Player 2'){
            gameStart = 1;
            $('.p2-profile').addClass('bg-success')
            $('.p1-profile').removeClass('bg-success')
        }
        else{
            gameStart = 0;
            $('.p1-profile').addClass('bg-success')
            $('.p2-profile').removeClass('bg-success')
        }
        return gameStart
    }

 
   function alertNextplayer(value){
      
    if(value == 1){
        gameStart = 0
        $('.p1-profile').addClass('bg-success')
        $('.p2-profile').removeClass('bg-success')
    }
    else{
        gameStart = 1
        $('.p2-profile').addClass('bg-success')
        $('.p1-profile').removeClass('bg-success')
       

    }
    var nextPlayer = gameStart
    $('.alert-notif').text(startPlay[nextPlayer]+' turn')

   }

   function moveCountdown(){
    var num = 0;
    if(gameStart == 1){
        num =parseInt($('.player2-moves').text())
        num--
        $('.player2-moves').text(num)
    }
    else{
        num =parseInt($('.player1-moves').text())
        num--
        $('.player1-moves').text(num)
    }
   }


   function updateScoreBoard(currentPlayer){
        var score = 0;
        if(currentPlayer == 'Player 2'){
           score = parseInt($('.p2-score').text())
           score++
           $('.p2-score').text(score)
        }
        else{
            score = parseInt($('.p1-score').text())
            score++
            $('.p1-score').text(score)
        }
   }


    $('.start-btn').on('click',function(){
        countdownStart()
        $(this).prop('disabled',true)
        $('.restart-btn').prop('disabled',false)
        var player = randomPlayerStart()
        
        $('.alert-notif').text(player+' will be the first to move, you are the X')
        checkPlayer(player)
        
    })

    $('.restart-btn').on('click',function(){
        gameStart = null
        move = ''
        $('.p1-profile,.p2-profile').removeClass('bg-success')
        $(this).prop('disabled',true)
        $('.start-btn').prop('disabled',false)
        resetCountdown()
        $('.board-tile').html('')
        $('.alert-notif').text('')
        $('.player2-moves,.player1-moves').text('5')
    })

    $('.board-tile').on('click',function(){
        var currentPlayer = startPlay[gameStart]

        if(gameStart != null && $(this).text().trim() === '' && !checkWinner() && countdown > 0){
            if(move == '' && $.trim($(this).html()) === '' && move != 'O' || move != 'X'){
                $(this).html('X')
                move = $(this).html()
            }
            else if( move != '' && $.trim($(this).html()) === '' || $.trim($(this).html()) !== 'X' ){
                $(this).html('O')
                move = $(this).html()
            }
            else{
                $(this).html('X')
            }
            if( checkWinner()){
                $('.alert-notif').text('Winner '+ currentPlayer)
                resetCountdown()
                updateScoreBoard(currentPlayer)
            }
            else{
                moveCountdown()
                alertNextplayer(gameStart)
            }
           
            moveCounter++
         
            if(moveCounter == 9){
                $('.alert-notif').text('This game is a draw!')
                resetCountdown()
                draw = true
              }
            // $('.current-player').text(startPlay[gameStart])


    
          }
          else if(countdown == -1){
            $('.alert-notif').text("Time's up! Please restart the game");
          }
       
          else if(checkWinner()){
            $('.alert-notif').text('The Game is already over!')
          }
          else  if(moveCounter == 9 && !checkWinner() && gameStart != null && draw){
            $('.alert-notif').text('This game is a draw!')
            resetCountdown()
          }
          else if($(this).text().trim() !== ''){
           if(draw != true){
            $('.alert-notif').text('Tile already taken')
           }
          }
       
          else{
            $('.alert-notif').text('Start the game first')
          }
    

        

        // if (winner) {
        //     alert(winner + ' wins!');
        // } else {
        //     alert('No winner yet.');
        // }
    })
 
  });
