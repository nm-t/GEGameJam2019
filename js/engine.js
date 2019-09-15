let menu = '<li id="go-to-bar" data-action="progress-dialogue">Continue</li>';
let dialogueArray;
let dialogue = '';

let drinksOrdered = 0;
let hasNecklace = false;
let whyWorriedOption = '<li id="why-worried" data-action="progress-dialogue">Ask why worried</li>';

const barDialogue = [
    '<i>You walk up to the bar and beckon to the bartender to order your drink.</i>',
    'Hey there, can I get whatever is on tap?'
];
const orderDrinkDialogue = [
    '<span style="color: #707BFB;">Here is your drink. Cold outside isn\'t it?</span>',
    '<i>She is the first person you have interacted with since forever.</i>'
];
const whyWorriedDialogue = [
    '<i>You lean in.</i>',
    'You look worried sweetie. What\'s up?',
    '<span style="color: #707BFB;">I lost my necklace and don\'t have time to look for it.</span>'
];
const barWithNecklaceDialogue = [
    'I found it on the floor near the door.',
    '<span style="color: #707BFB;">Oh thank you. That\'s amazing, I really thought I had lost it!</span>'
];
const flirtDialogue = [
    '<span style="color: #707BFB;">Don\'t hit on me. I\'m here to work, not date. Besides in a bar full of drunk and available people, why would you want to hit on the only sober one?</span>'
];
const tipDialogue = [
    '<span style="color: #707BFB;">Thanks.</span>'
];
const askForDateDialogue = [
    '<span style="color: #707BFB;">Thanks, but no thanks.</span>'
];
const offerDrinkDialogue = [
    '<span style="color: #707BFB;">That\'s inappropriate. And weird. Who offers a bartender a drink <i>while</i> they\'re working?</span>'
];

let dialogueCounter = 0;

function render(id) {
    if (hasNecklace) {
        whyWorriedOption = '';
    }

    if (id == 'next') {
        if ($('#next').attr('data-action') == 'fail-state') {
            
        }
        else if (!(dialogueArray == null || dialogueArray == undefined)) {
            dialogue = dialogueArray[dialogueCounter];
            dialogueCounter++;

            if (dialogueCounter >= dialogueArray.length) {
                $('#next').attr('data-action', 'menu-dialogue');
                $('#next').hide();
                dialogueCounter = 0;
            }
        }
    }
    else if (id == 'go-to-bar') {
        $('#window').removeClass();
        $('#window').addClass(id);

        if (!hasNecklace) {
            menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>'
    
            progressDialogue(barDialogue);
        }
        else {
            dialogueCounter = 0;
            menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>' + 
                '<li id="ask-for-date" data-action="progress-dialogue">Ask for date</li>' +
                '<li id="flirt" data-action="progress-dialogue">Flirt</li>';
            progressDialogue(barWithNecklaceDialogue);
        }
    }
    else if (id == 'order-drink') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>' + 
            whyWorriedOption +
            '<li id="flirt" data-action="progress-dialogue">Flirt</li>' +
            '<li id="tip" data-action="progress-dialogue">Tip</li>' +
            '<li id="offer-drink" data-action="progress-dialogue">Offer drink</li>';

        progressDialogue(orderDrinkDialogue);
        drinksOrdered++;
        if (drinksOrdered == 3) {
            $('#next').attr('data-action', 'fail-state');

            dialogue = '<span style="color: #707BFB;">Here is your drink. Cold outside isn\'t it? ... Do you even care that I\'ve said the same times three times?</span>'
        }
        console.log(drinksOrdered);
    }
    else if (id == 'why-worried') {
        menu = '<li id="look-around" data-action="progress-dialogue">Look around</li>';
        
        progressDialogue(whyWorriedDialogue);
    }
    else if (id == 'flirt') {
        menu = '<li id="ask-for-date" data-action="progress-dialogue">Ask for date</li>' +
        '<li id="tip" data-action="progress-dialogue">Tip</li>';
        
        progressDialogue(flirtDialogue);
    }
    else if (id == 'ask-for-date') {
        menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>' + 
            '<li id="flirt" data-action="progress-dialogue">Flirt</li>' +
            '<li id="tip" data-action="progress-dialogue">Tip</li>';
        
        progressDialogue(askForDateDialogue);
    }
    else if (id == 'tip') {
        menu = '<li id="flirt" data-action="progress-dialogue">Flirt</li>' +
        '<li id="ask-for-date" data-action="progress-dialogue">Ask for date</li>';
        
        progressDialogue(tipDialogue);
    }
    else if (id == 'offer-drink') {
        menu = '<li id="flirt" data-action="progress-dialogue">Flirt</li>' +
        '<li id="ask-for-date" data-action="progress-dialogue">Ask for date</li>';
        
        progressDialogue(offerDrinkDialogue);
    }
    else if (id == 'look-around') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="go-to-bar" data-action="progress-dialogue">Go to bar</li>'
        dialogue = 'You find a necklace.';
    
        $('#next').attr('data-action', 'hide-dialogue');
        $('#next').show();

        hasNecklace = true;
    }

    let action = $('#' + id).attr('data-action');

    if (action == 'progress-dialogue') {
        toggleMenu(false);
        toggleDialogue(true);
    }
    else if (action == 'hide-dialogue') {
        toggleMenu(true);
        toggleDialogue(false);
    }
    else if (action == 'menu-dialogue') {
        toggleMenu(true);
        toggleDialogue(true);
    }
    else if (action == 'fail-state') {
        toggleMenu(false);
        toggleDialogue(false);

        $('#window.order-drink').addClass('fail');
        
        if (drinksOrdered == 3) {
            showJessieScreen();
        }
        else {
            showFailScreen();
        }
    }

    attachEventListeners();
}

function progressDialogue(dialogueOption) {
    dialogueArray = dialogueOption;
    dialogue = dialogueArray[0];
    dialogueCounter++;
    $('#next').attr('data-action', 'progress-dialogue');

    // debugger;
    if (dialogueOption == flirtDialogue ||
        dialogueOption == askForDateDialogue ||
        dialogueOption == offerDrinkDialogue) {
        $('#next').attr('data-action', 'fail-state');
    }
    
    $('#next').show();
}

function toggleMenu(flag) {
    if (flag == true && menu !== '') {
        $('#menu ul').html(menu);
        $('#menu').show();
    }
    else {
        $('#menu').hide();
    }
}

function toggleDialogue(flag) {
    if (flag == true && dialogue !== '') {
        $('#dialogue .text-holder p').html(dialogue);
        $('#dialogue').show();
    }
    else {
        $('#dialogue').hide();
    }
}

function attachEventListeners() {
    $('#next, li').off();
    $('#next, li').on('click', function() {
        render($(this)[0].id);
    });
}

function showFailScreen() {
    $('#window .fail').css({'opacity':0}).animate({'opacity':1}, 3000)
}

function showJessieScreen() {
    $('#window #jessies-adventure').css('z-index', 11);
    $('#window #jessies-adventure').css({'opacity':0}).animate({'opacity':1}, 3000)
}

window.onload = function() {
    attachEventListeners();

    $('#start').on('click', function() {
        $('#title-card').fadeOut(1000);
    });
}

$(document).on('keypress', function(e) {
    if (e.which == 13) {
        $('#next').trigger('click');
    }
});
