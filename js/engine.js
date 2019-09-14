let hasStarted = false;
let menu = '<li id="go-to-bar" data-action="progress-dialogue">Continue</li>';
let dialogueArray;
let dialogue = '';

const barDialogue = [
    '<i>You walk up to the bar and beckon to the bartender to order your drink.</i>',
    'Hey there, can I get whatever is on tap?'
];

let dialogueCounter = 0;

let hasNecklace = false;

function render(id) {
    if (id == 'next') {
        if (dialogueArray == null || dialogueArray == undefined) {
        }
        else {
            dialogue = dialogueArray[dialogueCounter];

            if (dialogueCounter == dialogueArray.length - 1) {
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

        dialogueArray = barDialogue;
        dialogue = dialogueArray[0];
        dialogueCounter++;
        $('#next').attr('data-action', 'progress-dialogue');
        $('#next').show();
    }
    else if (id == 'order-drink') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="go-to-bar" data-action="progress-dialogue">Go to bar</li>'
        dialogue = 'You find a necklace.';
    }
    else if (id == 'look-around') {
        $('#window').removeClass();
        $('#window').addClass(id);
        menu = '<li id="go-to-bar" data-action="progress-dialogue">Go to bar</li>'
        dialogue = 'You find a necklace.';
    }
    else if (id == 'flirt') {
        menu = '<li id="flirt" data-action="progress-dialogue">Flirt</li>';
        dialogue = 'Did it hurt when you fell from heaven?';
        
        dialogue = introDialogue[dialogueCounter];
        dialogueCounter++;

        if (dialogueCounter == introDialogue.length) {
            $('#next').hide(); 
            dialogueCounter = 0;
        }
    }
    console.log({dialogueCounter});
    console.log({dialogueArray});
    console.log({dialogue});

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
    console.log({flag});
    if (flag == true && menu !== '') {
        $('#menu ul').html(menu);
        $('#menu').show();
    }
    else {
        $('#menu').hide();
    }
}

function toggleDialogue(flag) {
    console.log({flag});
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
