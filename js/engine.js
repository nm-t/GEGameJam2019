let menu = '<li id="go-to-bar" data-action="progress-dialogue">Continue</li>';
let dialogueArray;
let dialogue = '';

let hasNecklace = false;

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

let dialogueCounter = 0;

function render(id) {
    if (id == 'next') {
        if (!(dialogueArray == null || dialogueArray == undefined)) {
            dialogue = dialogueArray[dialogueCounter];
            dialogueCounter++;

            if (dialogueCounter == dialogueArray.length) {
                $('#next').attr('data-action', 'menu-dialogue');
                $('#next').hide();
                dialogueCounter = 0;
            }
        }
    }
    else if (id == 'go-to-bar') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>'

        progressDialogue(barDialogue);

        if (hasNecklace) {
            progressDialogue(barWithNecklaceDialogue);
        }
    }
    else if (id == 'order-drink') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="order-drink" data-action="progress-dialogue">Order drink</li>' + 
            '<li id="why-worried" data-action="progress-dialogue">Ask why worried</li>' +
            '<li id="flirt" data-action="progress-dialogue">Flirt</li>' +
            '<li id="tip" data-action="progress-dialogue">Tip</li>' +
            '<li id="offer-drink" data-action="progress-dialogue">Offer drink</li>'
        progressDialogue(orderDrinkDialogue);
    }
    else if (id == 'why-worried') {
        menu = '<li id="look-around" data-action="progress-dialogue">Look around</li>';
        
        progressDialogue(whyWorriedDialogue);
    }
    else if (id == 'flirt') {
        menu = '<li id="flirt" data-action="progress-dialogue">Flirt</li>';
        
        progressDialogue(flirtDialogue);
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
