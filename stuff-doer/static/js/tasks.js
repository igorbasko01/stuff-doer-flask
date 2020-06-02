const MESSAGE_DOM_ID = '#message'

$(function () {

    $('body').on('click', '.new-task-btn', function (e) {
        hideMessage();
        const task = getNewTaskData($(this), e);
        const [isValid, message] = validateNewTask(task.description, task.name, task.priority);
        isValid ? sendAddTaskRequest(task) : showMessage(message);
    });

    getTasks();
});

function sendAddTaskRequest(task) {
  $.post({
   url: 'add_task',
   contentType: 'application/json',
   data: JSON.stringify({
     taskSpace: task.taskSpace,
     name: task.name,
     desc: task.description,
     priority: task.priority,
     parentPath: task.parentPath})
  })
  .done(function(data, status, xhr) {
    console.log(`Success: data: ${data}, status: ${status}, code: ${xhr.status}`);
    getTasks();
  })
  .fail(function(xhr, status, error) { logFail(xhr, status, error) })
}

function showMessage(message) {
  $(MESSAGE_DOM_ID).removeAttr('hidden');
  $(MESSAGE_DOM_ID).text(message);
}

function hideMessage() {
  $(MESSAGE_DOM_ID).attr('hidden', true);
}

function getNewTaskData(jqThis, event) {
  const taskSpace = jqThis.closest('.tab-pane').attr('id');
  const priority = parseInt(jqThis.siblings().find('input[name="new-task-pri"]:checked').val());
  const description = jqThis.parent().siblings('.text-new-desc').val();
  const name = jqThis.siblings('.text-new-name').val();
  const parentPath = jqThis.attr('parent-path');
  const parentTaskID = jqThis.attr('task-id');

  return {taskSpace: taskSpace,
    priority: priority,
    description: description,
    name: name,
    parentPath: parentPath,
    parentTaskID: parentTaskID};
}


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

  let parsedTasks = tasks.map(t => (
    {type: t.type == undefined ? 'task' : t.type,
    taskId: t.id,
    text: t.name,
    nodes: [{type: 'new-task', parentPath: t.parentPath+'.'+t.id}]}
  ));

  // Adds root task creation node.
  parsedTasks.unshift({type: 'new-task', parentPath: ''});

  $('#tree').treeview({ data: parsedTasks,
      collapseIcon: "oi oi-chevron-bottom",
      expandIcon: "oi oi-chevron-right",
      highlightSelected: false, enableLinks: true, levels: 0 }
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
