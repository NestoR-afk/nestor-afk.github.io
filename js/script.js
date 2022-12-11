mixed = false;

let arr = [];
var id;


    $("button#mix").click(function() {
    mixed = true;
    arr = [1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() - 0.5);
     document.getElementById(arr[0]).play();
    });
    
$("button#next").click(function() {
    if (!mixed) {
        if (id < 8) {
            id++;
        document.getElementById(id).play();
        }
        } else {
            arr = arr.filter(function(value, i, arr) {
            return value != id;
            });
            if (arr.length != 0) {
                document.getElementById(arr[0]).play();
        } else {
            mixed = false;
        }
        }
});

$(function () {
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
            audio.timeline = 0;
        });
        id = Number($(this).attr("id"));
    });
});


$(function() {
    $("audio").on("ended", function next() {
        id = Number($(this).attr("id"));
        if (!mixed) {
        if (id !=8) {
            id++;
        document.getElementById(id).play();
        }
        } else {
            arr = arr.filter(function(value, i, arr) {
            return value != id;
            });
            if (arr.length != 0) {
                document.getElementById(arr[0]).play();
        } else {
            mixed = false;
        }
        }
    });
});
