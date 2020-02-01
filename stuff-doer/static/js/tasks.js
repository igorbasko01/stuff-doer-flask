$(function () {
    //start the tree in an autocollapsed state
//    $('#tasks-tree ul').hide(400);

    $('#dropdownMenuButton').on('click', function (e) {
        console.log("Button pressed...");
    });

    $('#tasks-tree li').on('click', function (e) {
        if (!e.originalEvent.target.classList.contains("btn")) {
            e.stopPropagation(); // prevent links from toggling the nodes
            console.log("Class: " + $(this)[0].className);
            $(this).children('ul').slideToggle();
        }
    });

    // This code opens all hyperlinks in a new window
    // and avoids anchors
//    $('#tasks-tree a').not('[href="#"]').attr('target', '_blank');
});