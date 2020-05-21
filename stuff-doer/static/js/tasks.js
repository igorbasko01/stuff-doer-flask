$(function () {

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

    $('body').on('click', '#new-task-btn', function (e) {
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
            .done(function(data, status, xhr) {
              console.log(`Success: data: ${data}, status: ${status}, code: ${xhr.status}`);
              getTasks();
            })
            .fail(function(xhr, status, error) { logFail(xhr, status, error) })
        }
    });

    getTasks();
});


/**
 * Validates if all the fields are valid for a new task.
 *
 * @param description of the task.
 * @param name of the task.
 * @param priority of the task.
 *
 * @return Returns a tuple of Success/Fail and a relevant message.
 */
function validateNewTask(description, name, priority) {
    if (description.trim().length < 1)
        return [false, "Description is missing."]
    if (name.trim().length < 1)
        return [false, "Name is missing"]
    if (priority < 0 || priority > 2)
        return [false, "Priority is invalid"]
    return [true, "All is good !"]
}

/**
 * Retrieve tasks and populate them on page.
 */
function getTasks() {
  $.get({url: 'get_tasks'})
  .done(function(data, status, xhr) { populateTree(data['tasks']) })
  .fail(function(xhr, status, error) { logFail(xhr, status, error) })
}

/**
 * Populates the tasks tree.
 *
 * Updates the #tree <div> in the HTML file.
 *
 * @param Array tasks A list of tasks to add to populate the tree with.
 */
function populateTree(tasks) {
  console.log(`populateTree, tasks: ${tasks}`);

  // TODO: Handle hierarchy.
  tasks.unshift({type: 'new-task', parentTaskId: null});

  let parsedTasks = tasks.map(t => (
    {type: t.type == undefined ? 'task' : t.type,
    taskId: t.id,
    text: t.name,
    nodes: []}
  ));

  $('#tree').treeview({ data: parsedTasks,
      collapseIcon: "oi oi-chevron-bottom",
      expandIcon: "oi oi-chevron-right",
      highlightSelected: false, enableLinks: true }
  );
}

/**
 * Print log of failed HttpRequest.
 *
 * @param xhr of the request.
 * @param status of the requests.
 * @param error of the error.
 */
function logFail(xhr, status, error) {
  console.log(`Failed xhr: ${xhr.responseText}, status: ${status}, error: ${error}`)
}
