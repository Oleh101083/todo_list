const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");


//loading data
loadData();

//1.add new tasks

//listener form
form.addEventListener('submit', function (event){

    //default reloading
    event.preventDefault();

    //get writing text of task from form
const taskText =input.value;


    const taskHTML = `<li class="list-group-item d-flex justify-content-between">
    <span contenteditable="true" class="task-title">${taskText}</span>
    <div>
        <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </div>
</li>`;

//adding element in html
tasksList.insertAdjacentHTML('afterbegin', taskHTML);

//show or hiden block the "Список дел пуст"
toggleEmptyListItem();

//cleaning input after
input.value='';

//focus in input
input.focus();

//saving data
saveDate();

})

//2. buttons "Готово" and "Удалить"

tasksList.addEventListener('click', function(event){
    //click target
    if (event.target.getAttribute('data-action')=='delete-task'){

        //get teg li widht class '.list-group-item' and delete it
        event.target.closest('li.list-group-item').remove();

        //show or hiden block the "Список дел пуст"
        toggleEmptyListItem();

        //saving data
        saveDate();

        //cheking click button "Готово"
    }  else if (event.target.getAttribute('data-action')=='ready'){

        //get teg li widht class '.list-group-item' and add span
const parentElement = event.target.closest('li.list-group-item');

parentElement.querySelector('span.task-title').classList.add('task-title--done');

//delete in teg span atribute contenteditable
parentElement.querySelector('span.task-title').setAttribute('contenteditable', 'false');

    
//move listTask to down 
tasksList.insertAdjacentElement('beforeend', parentElement);

//delete buttton "Готово" and "Удалить"
parentElement.querySelector('button[data-action="ready"]').remove();


 //saving data
 saveDate();
}
})



//function of show or hiden block the "Список дел пуст"
function toggleEmptyListItem(){
    if(tasksList.children.length > 1){
        document.querySelector("#empty-list-item").style.display= "none";
    }else{
        document.querySelector("#empty-list-item").style.display="block";
    }
}

function saveDate(){
    localStorage.setItem('todolist',tasksList.innerHTML);
}

function loadData(){
    if(localStorage.getItem('todolist')){
        tasksList.innerHTML =  localStorage.getItem('todolist');
    }
}








// //saving date to locakStorage
// localStorage.setItem('name','Oleh');


// //get date from localStorage
// localStorage.getItem('name')