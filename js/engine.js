let chapter = 1;
let menu = '<h1>Go to:</h1>' +
'<ul id="location">' +
    '<li id="house-1">House 1</li>' +
    '<li id="forest">Field</li>' +
    '<li id="town">Location</li>' +
'</ul>' +
'<h1>Talk to:</h1>' +
'<ul id="conversation">' +
    '<li id="cat">Cat</li>' +
    '<li id="dog">Dog</li>' +
'</ul>';
let dialogue = null;

// Changes the background of the window
function changeLocation(location) {
    $('#window').removeClass();
    $('#window').addClass(location);
    $('#dialogue').hide();
}

var i = 0;
var txt = 'Lorem ipsum dummy text blabla.';
var speed = 20;
let string = '';

function talkTo(person) {
    $('#dialogue').show();
    $('#dialogue .text-holder p').html(string);
}

function advance() {
    showMenu();
    showDialogue();

    $('#location li').on('click', function() {
        changeLocation($(this)[0].id);
    });
    $('#conversation li').on('click', function() {
        talkTo($(this)[0].id);
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

function showDialogue() {
    switch(chapter) {
        case 0: {
            
            break;
        }
        default: {
            dialogue = null;
        }
    }

    if (dialogue !== null) {
        $('#dialogue').css('opacity', 1);
        $('#dialogue').html(dialogue);
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
