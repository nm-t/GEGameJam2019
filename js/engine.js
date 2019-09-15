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
    '<span style="color: red;">Here it is.</span>',
    '<i>She is the first person you have interacted with since forever.</i>'
];
const whyWorriedDialogue = [
    '<i>You lean in.</i>',
    'You look worried sweetie. What\'s up?',
    '<span style="color: red;">I lost my necklace and don\'t have time to look for it.</span>'
];
const barWithNecklaceDialogue = [
    'I found it on the floor near the door.',
    '<span style="color: red;">Oh thank you. That\'s amazing, I really thought I had lost it!</span>'
];
const flirtDialogue = [
    'No thanks.'
];
const tipDialogue = [
    'Thanks.'
];
const askForDateDialogue = [
    'Thanks, but no thanks.'
];

let dialogueCounter = 0;

function render(id) {
    if (hasNecklace) {
        whyWorriedOption = '';
    }

    if (id == 'next') {
        console.log(dialogueArray);
        if (!(dialogueArray == null || dialogueArray == undefined)) {
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
        // Show fail screen
    }

    attachEventListeners();
}

function progressDialogue(dialogueOption) {
    dialogueArray = dialogueOption;
    dialogue = dialogueArray[0];
    dialogueCounter++;
    
    $('#next').attr('data-action', 'progress-dialogue');
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

window.onload = function() {
    attachEventListeners();
}

$(document).on('keypress', function(e) {
    if (e.which == 13) {
        $('#next').trigger('click');
    }
});
