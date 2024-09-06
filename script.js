$(document).ready(function(){
    const startPlay = ['Player 1','Player 2']
    var gameStart = null
    var move = ''
    var moveCounter = 0;
    var countdownp1 = 15;
    var countdownp2 = 15;
    var timer1
    var timer2
    var draw = false
    function countdownStart(){
       
        if(gameStart == 0){
            clearInterval(timer1);
            timer1 = setInterval(function() {
                $('.countdown-timerp1').text(countdownp1);
                countdownp1--;
                if (countdownp1 < 0) {
                    clearInterval(timer1);
                    $('.countdown-timerp1').text("Time's up!");
                    checkCountdowns()

                }
            }, 300);
        }
        else{
            clearInterval(timer2);

            timer2 = setInterval(function() {
                $('.countdown-timerp2').text(countdownp2);
                countdownp2--;
                if (countdownp2 < 0) {
                    clearInterval(timer2);
                    $('.countdown-timerp2').text("Time's up!");
                    checkCountdowns()
                    
                }
            }, 300);
        }
    
    }

    function resetCountdown() {
        clearInterval(timer1);
        clearInterval(timer2);
        $('.countdown-timerp1,.countdown-timerp2').text('15');
        moveCounter = 0;
        gameStart = null
        move = ''
        countdownp1 = 15;
        countdownp2 = 15;

        draw = false
   
    }

    function checkCountdowns(){
        const result = startPlay[gameStart];
        if(result == 'Player 1'){
            updateScoreBoard('Player 2');
            $('.alert-notif').text("Player 1 time has ran out! PLAYER 2 WIN!")
            $('.winner-name').text("PLAYER 2 WIN!")
            $('.alert-modal-info').text('Player 1 time has ran out.')
            $('#alert-modal').modal('show')
        }
        else{
            updateScoreBoard('Player 1');
            $('.alert-notif').text("Player 2 time has ran out! PLAYER 1 WIN!")
            $('.winner-name').text("PLAYER 1 WIN!")
            $('.alert-modal-info').text('Player 2 time has ran out.')
            $('#alert-modal').modal('show')

        }
    }

    function randomPlayerStart(){
        var randomValue = startPlay[Math.floor(Math.random() * startPlay.length)];

        return randomValue
    }

    function checkWinner() {
        var tiles = [$('#tile1').text().trim(),$('#tile2').text().trim(),$('#tile3').text().trim(),
                     $('#tile4').text().trim(),$('#tile5').text().trim(),$('#tile6').text().trim(),
                     $('#tile7').text().trim(),$('#tile8').text().trim(),$('#tile9').text().trim(),
                    ]
        
        if(tiles[0] === tiles[1] && tiles[1] === tiles[2] && tiles[0] !== '' ){
            $('#tile1,#tile2,#tile3').addClass('aligned-tiles')
            return true
        }
        else if(tiles[3] === tiles[4] && tiles[4] === tiles[5] && tiles[3] !== '' ){
             $('#tile4,#tile5,#tile6').addClass('aligned-tiles')
            return true
        }
        else if(tiles[6] === tiles[7] && tiles[7] === tiles[8] && tiles[6] !== '' ){
             $('#tile7,#tile8,#tile9').addClass('aligned-tiles')
            return true
        }
        else if(tiles[0] === tiles[3] && tiles[3] === tiles[6] && tiles[0] !== '' ){
             $('#tile1,#tile4,#tile7').addClass('aligned-tiles')
            return true
        }
        else if(tiles[1] === tiles[4] && tiles[4] === tiles[7] && tiles[1] !== '' ){
             $('#tile2,#tile5,#tile8').addClass('aligned-tiles')
            return true
        }
        else if(tiles[2] === tiles[5] && tiles[5] === tiles[8] && tiles[2] !== '' ){
             $('#tile3,#tile6,#tile9').addClass('aligned-tiles')
            return true
        }
        else if(tiles[0] === tiles[4] && tiles[4] === tiles[8] && tiles[0] !== '' ){
             $('#tile1,#tile5,#tile9').addClass('aligned-tiles')
            return true
        }
        else if(tiles[2] === tiles[4] && tiles[4] === tiles[6] && tiles[2] !== '' ){
             $('#tile3,#tile5,#tile7').addClass('aligned-tiles')
            return true
        }
        else if(countdownp1 < 0){
            return true
        }
        else if(countdownp2 < 0){
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
        clearInterval(timer2)
        countdownStart()
    }
    else{
        gameStart = 1
        $('.p2-profile').addClass('bg-success')
        $('.p1-profile').removeClass('bg-success')
        clearInterval(timer1)
        countdownStart()

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
        $('.board-tile').removeClass('aligned-tiles')
        $('.alert-notif').text('')
        $('.player2-moves,.player1-moves').text('5')
    })

    $('.new-game-btn').on('click',function(){
        var player = randomPlayerStart()
        resetCountdown()
        $('.p1-profile,.p2-profile').removeClass('bg-success')
        $('.board-tile').html('')
        $('.board-tile').removeClass('aligned-tiles')
        $('.alert-notif').text('')
        $('.player2-moves,.player1-moves').text('5')
        countdownStart()
        $('.start-btn').prop('disabled',true)
        $('.alert-notif').text(player+' will be the first to move, you are the X')
        checkPlayer(player)
    })

    $('.board-tile').on('click',function(){
        var currentPlayer = startPlay[gameStart]
        if(gameStart != null && $(this).text().trim() === '' && !checkWinner() && countdownp1 > 0 && countdownp2 > 0){
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
                var userProfile
                resetCountdown()
                updateScoreBoard(currentPlayer)
                if(currentPlayer == "Player 1"){
                    userProfile = $('.p1-profile').prop('src')
                }
                else{
                    userProfile = $('.p2-profile').prop('src')
                }
                $('.winner-profile').prop('src',userProfile)
                $('.winner-name').text(currentPlayer+" WIN!")
                $('.alert-modal-info').text('Good Job!')
                $('#alert-modal').modal('show')
            }
            else{
                moveCountdown()
                alertNextplayer(gameStart)
            }
           
            moveCounter++
         
            if(moveCounter == 9){
                $('.alert-notif,.winner-name').text('This game is a draw!')
                $('.winner-profile').prop('src','')
                $('.alert-modal-info').text('What a play!')
                $('#alert-modal').modal('show')
                resetCountdown()
                draw = true
              }
            // $('.current-player').text(startPlay[gameStart])


    
        } 
        else if(checkWinner()){
            $('.alert-notif').text('The Game is already over!')
        }
        else if(moveCounter == 9 && !checkWinner() && gameStart != null && draw){
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
