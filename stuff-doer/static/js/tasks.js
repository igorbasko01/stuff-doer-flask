$(function () {
    //start the tree in an autocollapsed state
//    $('#tasks-tree ul').hide(400);

    $('#tasks-tree li').on('click', function (e) {
        e.stopPropagation(); // prevent links from toggling the nodes
        $(this).children('ul').slideToggle();
    });

    // This code opens all hyperlinks in a new window
    // and avoids anchors
    $('#tasks-tree a').not('[href="#"]').attr('target', '_blank');
});