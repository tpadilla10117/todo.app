//create dummy data
    //its an array of objects, each with 4 diff key: value pairs
let allTodos = []; //= [
//     {title: 'VideoGame', dueDate: '07-20-2020', description: 'Beat the 1st chapter', isComplete: true},
//     {title: 'Homework', dueDate: '07-20-2020', description: 'Finish All Probs', isComplete: false},
//     {title: 'TV', dueDate: '07-21-2020', description: 'Watch your show', isComplete: false},
//     {title: 'Music', dueDate: '07-21-2020', description: 'listen to that album', isComplete: true},
//     {title: 'Workout', dueDate: '07-22-2020', description: 'Leg Day', isComplete: false},
//     {title: 'Work', dueDate: '07-22-2020', description: 'Work the shift', isComplete: true}
// ];

//updated/new global variables from MODULE 3
let pendingTodos, completedTodos, expiredTodos;


//We need two functions to make this work nicely, createElementFromTodo and renderTodos.
    //The first will take a todo as input, 
    //then build and return a new element for our page. 

function createElementFromTodo(todo) {

      //If the todo is complete, you don't need the Complete button, if not, you do.
    //call .data method on todoElement
    // let ourButton;
    // if(todo.isComplete) {
    //     ourButton = '';
    // } else {
    //     ourButton = '<button class="action complete">Complete</button>';
    // }

    //builds an element and returns it
    //UODATES: Module 4 -> using a ternary for my if statement
    const todoElement = $(`<div class="todo">
    <h3><span class="title">${todo.title}</span>
    <span class="due-date">${todo.dueDate}</span></h3>
    <pre>${todo.description}</pre>
    <footer class="actions">
    ${todo.isComplete ? '' : '<button class="action complete">Complete</button>'}

    <button class="action delete">Delete</button>
    </footer></div>`);

    todoElement.data('todo', todo);
    return todoElement;
}
    //The second will loop over allTodos and append the return from createELementFromTodo to the correct portion of the page.


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
 
 //call renderTodos() to test out the app
 

 //add a click listener to .left-drawer
 $('.left-drawer').click(function(event) {
    //if left-drawer is clicked
    //The callback function will be called 
    const leftDrawer = $(this);
     if($(event.target).hasClass('left-drawer')) {
         $('#app').toggleClass('drawer-open')
     }
    
    // appClass = $('#app').hasClass('drawer-open');

    // appClass = $('#app').hasClass('drawer-open');
    // if (appClass === false) {
    //     $('#app').addClass('drawer-open');
    // } else if (appClass === true) {
    //     $('#app').removeClass('drawer-open');
    // }
});
//couldnt figure out if-else, so targeted .action 
// $('.action').click(function() {
//     const appContainer = $('#app').hasClass('drawer-open');
//     if (appContainer === true) {
//         $('#app').removeClass('drawer-open');
//     } else if (appContainer === false) {
//         $('#app').addClass('drawer-open');
//     }
// })



//  MODULE 02

     // .add-todo needs a click handler and adds class .open to .modal
     $('.add-todo').click(function() {
         $('.modal').addClass('open');
         
    });
    
     //we also give the following 2 buttons handlers tht remove .open from .modal
    //  $('.create-todo').click(function() {
    //      $('.modal').removeClass('open');
    //  })
  
    $('.cancel-create-todo').click(function() {
        $('.modal').removeClass('open');
     })


     //CREATING NEW TODO:

    $('.create-todo').click(function() {
        event.preventDefault();
        //get the todo object made by createTodoFromForm()
        //add it to the beginning of allTodos
        allTodos.unshift(createTodoFromForm());
        //trigger reset on the form
        $('.todo-form').trigger('reset');
        $('.modal').removeClass('open');
        storeData();
        splitTodos();
        renderTodos();
    })
    
    function createTodoFromForm() {
        //create an object w/ title, dueDate, description all from the form
        //set isComlete to false
        const newTodo = {
            title: $('#todo-title').val(),
            dueDate: $('#todo-due-date').val(),
            description: $('#todo-description').val(),
            isComplete: false
         };
         return newTodo;
    }

    $('main').on('click', '.action.complete', function () {
        //looks for parent 
        let closeTodo = $(this).closest('.todo');
        const todoData = closeTodo.data('todo');
        todoData.isComplete = true;
        storeData();
        splitTodos();
        renderTodos();
    });



//MODULE 03

//date constructor creates 2 date objects
function isCurrent(todo) {
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();
  
    return now < todoDueDate;
  }
  
  //this lets us filter between the status of the todos
  function splitTodos() {
    pendingTodos = allTodos.filter(function(todo){
      return !todo.isComplete && isCurrent(todo)
    });
    completedTodos = allTodos.filter(function(todo){
      return todo.isComplete
    });
    expiredTodos = allTodos.filter(function(todo) {
      return !todo.isComplete && !isCurrent(todo)
    });
  }
  
//   function renderTodos() {
//     $('main .content').empty();
//     pendingTodos.forEach(function(todo){
//       $('.pending-todos').append(createElementFromTodo(todo));
//     })
    // completedTodos.forEach(function(todo){
    //   /* where do we append? */
    // })
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
    function renderTodos() {
        //clears out existing todos
        $('main .content').empty();
        //uses allTodos
    
        pendingTodos.forEach(function(todo){
            $('.pending-todos').append(createElementFromTodo(todo));
        })
    
        completedTodos.forEach(function(todo){
            $('.completed-todos').append(createElementFromTodo(todo));
        })
    
        expiredTodos.forEach(function(todo) {
            $('.expired-todos').append(createElementFromTodo(todo));
        })
    }
//MODULE 4
  //Persist Data
  //storeData
 function storeData() {
    //sets an item in localStorage with key allTodos
    localStorage.setItem('allTodosKey', JSON.stringify(allTodos));
    //uses JSON.stringify() to stringify contents of allTodos
  }

   //retrieveData
   
  function retrieveData() {
      //gets the item from localStorage with key allTodos
      //to retrive the data, we need to convert it back to an array
    const storedAllTodosArray = localStorage.getItem('allTodosKey')
      //if it exists, set  the global allTodos to the result of JSON.parse() applied to it
      allTodos = storedAllTodosArray ? JSON.parse(storedAllTodosArray)
      //if not, set allTodos equal to some default todos
      : fetchDefaultTodos()//allTodos = {title: 'Cook DinDin', dueDate: '07-20-2020', description: 'Make Calzones', isComplete: true}
  };

    //fetchDefaultTodos
        function fetchDefaultTodos() {
            //returns an array of basic todos
            return [
                {title: 'Step 1', dueDate: '07-20-2020', description: 'Click on "add-todo" icon', isComplete: false},
                {title: 'Step 2', dueDate: '07-20-2020', description: 'Fill in the form', isComplete: false},
                {title: 'Step 3', dueDate: '07-20-2020', description: 'Review your answer & submit', isComplete: false},
                {title: 'Step 4', dueDate: '07-20-2020', description: 'Eat Cheese', isComplete: true}
            ];
            
            //make 4-5 todos which give instructions on how to use application
        }
    
        //retrieveDataPart2 [*SEE ABOVE*]
        //update the function to use euther JSON.parse() of localStorage
        //or the fetchDefaultTodos()

        function allTheFuncs () {
            retrieveData();
            splitTodos();
            renderTodos();
        };
        
        // splitTodos();
        // renderTodos();

        // DELETE BUTTON:
    
        // $('.action delete').click(function () {
            
        //     console.log('Clicked the thing');
        //     //storeData();
        //     //splitTodos();
        //     //renderTodos();
        // })

        $('main').on('click', '.action.delete', function () {
            //looks for parent 
            // console.log('w clicked the thang')
            //.closest() method lets us return the first ancestor of the selected element
                //so here we select the 
            let closeTodo = $(this).closest('.todo');
            //we now have the data from the todo we make
            const todoData = closeTodo.data('todo');
            console.log(todoData);
            //shows that its an object
            console.log(typeof todoData);
            //returned an index of 0 -> so it exists on the allTodos object
            console.log(allTodos.indexOf(todoData))
            allTodos.splice(0, 1);
            // todoData.isComplete = true;
            storeData();
            splitTodos();
            renderTodos();
        });

        //can find index of item in an array with .indexOf()
        //can remove items with .splice()
