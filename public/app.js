/* global $ */                          // makes c9 not indicate an exclamation mark for $ - since $ is defined in a different file it would usually do that. NOT necessary.

$(document).ready(function(){           // jQuery - any code inside the function waits to run until the DOM has loaded
    $.getJSON("/api/todos")
    .then(addTodos);
    
    $("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });
    
    $(".list").on("click", "span", function(e){     // adds the listener to the list which is there right at the beginning. specifying the second argument span means only spans inside the list are listened to
        e.stopPropagation();                        // using this will stop the event from bubbling up - i.e., clicking on the span does NOT trigger any events on the parent li!
        removeTodo($(this).parent());
    });
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id)                    // stores a bit of metadata - the _id because we need this later to delete the right todo.
    newTodo.data("completed", todo.completed)
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo(){
    var usrInput = $("#todoInput").val();
    $.post("/api/todos", {name: usrInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo)
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo){
    var clickedId = todo.data("id");
    var deleteUrl = "/api/todos/" + clickedId;
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    });   
}

function updateTodo(todo){
    var updateUrl = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone};
    
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
    .catch(function(err){
        console.log(err);
    });
}
