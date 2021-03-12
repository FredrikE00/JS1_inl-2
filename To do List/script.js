const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];
// Hämtar jsonplaceholder
const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
      todos = data;
      // console.log(todos);
      listTodos();
    })
}
fetchTodos();

// Alert om todo är empty
class Alert {
static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#Output');
    container.insertBefore (div, form);
    //Gör så att det försvinner  efter 3000 sekunder
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
}

const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo);
  })
}

const newTodo = (todo) => {

  let card = document.createElement('div');
  card.classList.add('card', 'p-3', 'my-3');

  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let title = document.createElement('h3');
  title.innerText = todo.title;

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.innerText = 'X';
  button.addEventListener('click', () => {
    console.log(todo.id, 'This feature is not implemented yet!')
  })
//append lägger till
  innerCard.appendChild(title);
  innerCard.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card);
}


const createTodo = (title) => {
    // Check om title är tom 
    if (title ===''){
       Alert.showAlert('Please enter a todo', 'alert-danger');
    } else{

  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)

    let newTodo = {
      ...data,
      id: Date.now().toString()
    }
    console.log(newTodo);
    todos.unshift(newTodo);
    listTodos();
  })
 }
}

//resettar "add todo" form
form.addEventListener('submit', e => {
  e.preventDefault();

  createTodo(input.value);
  // input.value = '';
  form.reset();
})