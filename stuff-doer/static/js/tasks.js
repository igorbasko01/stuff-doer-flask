$(function () {
    //start the tree in an autocollapsed state
//    $('#tasks-tree ul').hide(400);

    $('#tree').treeview({ data: [
        {text: "Node1", selectable: false, nodes: [
            {text: "Node1.1", selectable: false}]}
        ],
        collapseIcon: "oi oi-chevron-bottom",
        expandIcon: "oi oi-chevron-right"}
    );

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

    $('#new-task-btn').on('click', function (e) {
        $('#message').attr('hidden', true);
        let taskSpace = $(this).closest('.tab-pane').attr('id');
        let priority = parseInt($('input[name="new-task-pri"]:checked').val());
        let description = $('#text-new-desc').val();
        let name = $('#text-new-name').val();
        let [isValid, message] = validateNewTask(description, name, priority);
        if (!isValid) {
            $('#message').removeAttr('hidden');
            $('#message').text(message);
        } else {
            $.post({
             url: 'add_task',
             contentType: 'application/json',
             data: JSON.stringify({taskSpace: taskSpace, name: name, desc: description, priority: priority})
            })
            .done(function(data, status, xhr) { console.log(`Success: data: ${data}, status: ${status}, code: ${xhr.status}`)})
            .fail(function(xhr, status, error) { console.log(`Failed xhr: ${xhr.responseText}, status: ${status}, error: ${error}`)})
        }
    });

    // This code opens all hyperlinks in a new window
    // and avoids anchors
//    $('#tasks-tree a').not('[href="#"]').attr('target', '_blank');
});

function validateNewTask(description, name, priority) {
    if (description.trim().length < 1)
        return [false, "Description is missing."]
    if (name.trim().length < 1)
        return [false, "Name is missing"]
    if (priority < 0 || priority > 2)
        return [false, "Priority is invalid"]
    return [true, "All is good !"]
}