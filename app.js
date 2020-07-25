//create dummy data
    //its an array of objects, each with 4 diff key: value pairs
let allTodos = [
    {title: 'VideoGame', dueDate: '07-20-2020', description: 'Beat the 1st chapter', isComplete: true},
    {title: 'Homework', dueDate: '07-20-2020', description: 'Finish All Probs', isComplete: false},
    {title: 'TV', dueDate: '07-21-2020', description: 'Watch your show', isComplete: false},
    {title: 'Music', dueDate: '07-21-2020', description: 'listen to that album', isComplete: true},
    {title: 'Workout', dueDate: '07-22-2020', description: 'Leg Day', isComplete: false},
    {title: 'Work', dueDate: '07-22-2020', description: 'Work the shift', isComplete: true}
];


//We need two functions to make this work nicely, createElementFromTodo and renderTodos.
    //The first will take a todo as input, 
    //then build and return a new element for our page. 
function createElementFromTodo(todo) {
    //builds an element and returns it
    const todoElement = $(`<div class="todo"><h3><span class="title">${todo.title}</span>${todo.description}
    <span class="due-date">${todo.dueDate}</span></h3><pre>Click on the left below the icons to expand the left drawer
    When you're done, click complete on this todo.</pre>
    <footer class="actions"><button class="action complete">${todo.isComplete}</button>
    <button class="action delete">${todo.isComplete}</button>
    </footer></div>`);
    //If the todo is complete, you don't need the Complete button, if not, you do.
    return todoElement;
}
    //The second will loop over allTodos and append the return from createELementFromTodo to the correct portion of the page.

function renderTodos() {
    //uses allTodos
    //use a forEach over allTodos
     allTodos.forEach(function(todo) {
    //inside the callback function, pending on value of isComplete ->
        const todoFuncStorage = createElementFromTodo(todo);
        let isCompleted = todo.isComplete;

    if ( isCompleted === true) {
        return $('.completed-todos').append(todoFuncStorage);
    } else if(isCompleted === false) {
        return $('.pending-todos').append(todoFuncStorage);
    }
        //append the return of createElementFromTodo to .pending-todos or .completed-todos
    });
 }

 //call renderTodos() to test out the app
 renderTodos();


 //add a click listener to .left-drawer
 $('.left-drawer').click(function() {
    //if left-drawer is clicked, or the buttons are clicked
    //I NEED TO FIND A WAY TO TOGGLE AND ADD CLASS WHEN .left-drawer is clicked
    const leftDrawer = $(this);
    if ($('#app').not('drawer-open') ) {
        $('#app').toggleClass('drawer-open')
    }
 });
 

    //The callback function will be called either if the 
 //drawer is clicked, or is the buttons inside are clicked




//toggle the class drawer-open on the #app element





//  //module 02
// $('.add-todo').click(function() {
//     $('.modal').addClass('open');
//   })
  
//   $('.create-todo').click(function() {
//     $('.modal').removeClass('open');
//   })
  
//   $('.cancel-create-todo').click(function() {
//     $('.modal').removeClass('open');
//   })
  
//   $('.create-todo').click(function() {
    
//   })
  
//   function createTodoFromForm() {
    
//   }
