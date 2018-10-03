/*
 * Create a list that holds all of your cards
 */
let allCards=['diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb','diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb'];
let openCards=[];
let matchedCards=[];
let totalMoves=0;
let lastClickCardId='';
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards(cards)
{
    let cardsHtml='';
    $(cards).each(function(index,value){
        cardsHtml+=`<li id="${index}" class="card" data-card="${value}"><i class="fa fa-${value}"></i></li>`;
    });
    $('.deck').html(cardsHtml);
}

function restartGame()
{
    openCards=[];
    matchedCards=[];
    totalMoves=0;
    lastClickCardId='';
    $('.card').removeClass('open show match');
    $('.moves').text(totalMoves);
    $('.starRating').text(3);
    $('.stars li i').removeClass('fa-star-o').addClass('fa-star');
}

function updateStarRating()
{
    if(totalMoves>=51)
    {
        if($('.stars li .fa-star').length>1)
        {
            $('.starRating').text(1);
            $('.stars li:nth-last-child(2)').find('i').removeClass('fa-star').addClass('fa-star-o');
        }
    }
    else if(totalMoves>=25 && totalMoves<=50)
    {
        if($('.stars li .fa-star').length>2) {
            $('.starRating').text(2);
            $('.stars li').last('.fa-star').find('i').removeClass('fa-star').addClass('fa-star-o');
        }
    }
    else
    {
        $('.starRating').text(3);
    }
}

function isWon()
{
    if(matchedCards.length>=allCards.length)
    {
        $('.deck').hide();
        $('.score-panel').hide();
        $('#won').show();
    }
}

$(document).ready(function(e){
    allCards=shuffle(allCards);
    displayCards(allCards);
    //card click event handler
    $('.card').on('click',function(){
        let thisCard=$(this).attr('data-card'); //clicked card value
        let thisCardId=$(this).attr('id');//clicked card's id

        if(!$(this).hasClass('open') && !$(this).hasClass('match')) // clicked card is not same as last click increment moves
            totalMoves++;

        $('.moves').text(totalMoves);

        updateStarRating();

        if(openCards.length<2) {
            if($.inArray(thisCard,openCards)==-1) {
                $(this).addClass('open show');
                openCards.push(thisCard);
            }
            else
            {
                if(thisCardId!==lastClickCardId) {
                    openCards.splice($.inArray(thisCard,openCards),1);
                    matchedCards.push(thisCard);
                    matchedCards.push(thisCard);
                    $(this).addClass('match');
                    $('.card[data-card=' + thisCard + ']').removeClass('open show');
                    $('.card[data-card=' + thisCard + ']').addClass('match');
                    isWon();
                }
            }
        }

        lastClickCardId=$(this).attr('id');
        setTimeout(function(){
            if(openCards.length==2){
                $('.open.show').removeClass('open show');
                openCards=[];
            }
        },200);
    });

    //restart game
    $('.restart').on('click',function(){
        restartGame();
    });

    $('#playAgain').on('click',function(){
        $('.deck').show();
        $('.score-panel').show();
        $('#won').hide();
        restartGame();
    });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
