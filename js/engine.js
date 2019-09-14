let hasStarted = false;
let menu = '<li id="go-to-bar" data-action="menu-dialogue">Go to bar</li>' +
    '<li id="look-around" data-action="menu-dialogue">Look around</li>';
let speaker = null;
let dialogue = '';

const introDialogue = [
    'Hello',
    'Second text'
];

let dialogueCounter = 0;

let hasNecklace = false;

function render(id) {
    if (id == 'next') {
        dialogue = introDialogue[dialogueCounter];
        dialogueCounter++;

        if (dialogueCounter == introDialogue.length) {
            $('#next').hide(); 
            dialogueCounter = 0;
        }
    }
    else if (id == 'go-to-bar') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="flirt" data-action="hide-dialogue">Flirt</li>'
        dialogue = 'You walk up to the bar and beckoned to the bartender to order your drink.';
    }
    else if (id == 'look-around') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="go-to-bar" data-action="progress-dialogue">Go to bar</li>'
        dialogue = 'You find a necklace.';
    }
    else if (id == 'flirt') {
        menu = '<li id="flirt" data-action="progress-dialogue">Flirt</li>';
        speaker = 'hero';
        dialogue = 'Did it hurt when you fell from heaven?';
        
        dialogue = introDialogue[dialogueCounter];
        dialogueCounter++;

        if (dialogueCounter == introDialogue.length) {
            $('#next').hide(); 
            dialogueCounter = 0;
        }
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

function toggleMenu(flag) {
    if (flag == true || menu !== '') {
        $('#menu ul').html(menu);
        $('#menu').show();
    }
    else {
        $('#menu').hide();
    }
}

function toggleDialogue(flag) {
    if (flag == true && dialogue !== '') {
        if (speaker !== null) {
            $('#dialogue #image-holder').removeClass();
            $('#dialogue #image-holder').addClass(speaker);
        }
        $('#dialogue .text-holder p').html(dialogue);
        $('#dialogue').show();
    }
    else {
        $('#dialogue').hide();
    }
}

function attachEventListeners() {
    $('#next, li').on('click', function() {
        render($(this)[0].id);
    });
}

window.onload = function() {
    attachEventListeners();
}
