let hasNecklace = false;
var lookAroundOption = '<li id="look-around">Look around</li>';

let menu = '<h1>Actions:</h1>' +
'<ul id="location">' +
    '<li id="go-to-bar">Go to bar</li>' +
    '<li id="look-around">Look around</li>' +
'</ul>';
let dialogue = '';

function advance() {
    showMenu();

    $('#location li').on('click', function() {
        changeLocation($(this)[0].id);
    });
    $('#conversation li').on('click', function() {
        showDialogue($(this)[0].id);
    });
}

function changeLocation(location) {
    if (location == 'go-to-bar') {
        dialogue = 'You go to the bar.';

        menu = '<h1>Actions:</h1>' +
            '<ul id="location">' +
                lookAroundOption +
            '</ul>' +
            '<ul id="conversation">' +
                '<li id="flirt">Flirt</li>' +
                '<li id="ask-for-drink">Ask for drink</li>' +
            '</ul>';
    }
    else if (location == 'look-around' && hasNecklace == false) {
        dialogue = 'You have a look around the bar. You find a necklace on the floor!';

        lookAroundOption = '';

        menu = '<h1>Actions:</h1>' +
            '<ul id="location">' +
                '<li id="go-to-bar">Go to bar</li>' +
            '</ul>';
    }

    showMenu();
    showDialogue();

    $('#location li').on('click', function() {
        changeLocation($(this)[0].id);
    });
    $('#conversation li').on('click', function() {
        showDialogue($(this)[0].id);
    });
}

function showMenu() {
    if (menu !== null) {
        $('#menu').css('opacity', 1);
        $('#menu').html(menu);
    }
    else {
        $('#menu').css('opacity', 0);
    }
}

function showDialogue(person) {
    console.log(dialogue);
    if (dialogue !== null) {
        $('#dialogue').css('opacity', 1);
        $('#dialogue .text-holder p').html(dialogue);
    }
    else {
        $('#dialogue').css('opacity', 0);
    }
}

// Event listeners
$('#location li').on('click', function() {
    changeLocation($(this)[0].id);
});
$('#conversation li').on('click', function() {
    talkTo($(this)[0].id);
});
$('#next').on('click', function() {
    advance();
});
