function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    appTitle.classList.add('text-light');
    return appTitle;
};

function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название новой задачи';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить задачу';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.setAttribute('disabled', 'true');

    return {
        form,
        input,
        button,
    };
};

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
};

function createTodoItem(name, index) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton
    };
};

export function createTodoApp(container, title = 'Список дел', storageKey, todos = []) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(storageKey)) {
        todos = JSON.parse(localStorage.getItem(storageKey));
    };

    function updateLocal() {
        localStorage.setItem(storageKey, JSON.stringify(todos));
    };

    function createTodoFromArray(array) {
        function doneTodo(index) {
            let todoItems = document.querySelectorAll('.list-group-item');
            
            array[index].done = !array[index].done;
            if (array[index].done) {
                todoItems[index].classList.toggle('list-group-item-success');
            } else {
                todoItems[index].classList.remove('list-group-item-success');
            };
            updateLocal();
        };

        todoList.innerHTML = "";
        array.forEach((item, index) => {
            let todoItem = createTodoItem(array[index].name);
            todoList.append(todoItem.item);
            if (array[index].done) {
                todoItem.item.classList.toggle('list-group-item-success');
            };
            if (array[index].deleted) {
                todoItem.item.classList.add('d-none');
            };

            todoItem.doneButton.addEventListener('click', function () {
                doneTodo(index);
            });
            todoItem.deleteButton.addEventListener('click', function () {
                todoItem.item.remove();
                array[index].deleted = !array[index].deleted;
                updateLocal();
            });
        });
    };
    createTodoFromArray(todos);

    todoItemForm.form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!todoItemForm.input.value.trim()) {
            return;
        };

        let newTodo = {
            name: todoItemForm.input.value,
            done: false,
            deleted: false,
        };
        todos.push(newTodo);
        updateLocal();
        createTodoFromArray(todos);

        todoItemForm.input.value = '';
        todoItemForm.button.setAttribute('disabled', 'true');
    });
    todoItemForm.input.addEventListener('input', function () {
        if (!todoItemForm.input.value) {
            todoItemForm.button.setAttribute('disabled', 'true');
        } else {
            todoItemForm.button.removeAttribute('disabled');
        };
    });
};