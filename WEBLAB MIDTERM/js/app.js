// Global parameters
let columnsCount = 6;
let init_tasks = 3;// initial tasks in load
let currColumn = 6;
let globalTasksArray = [];


// Функция для рассчета размеров grid-item
function adjustGridItems(gridItems) {
    gridItems.forEach(item => {
        const width = item.offsetWidth; // Получаем ширину элемента
        const height = width * 1.41; // Рассчитываем высоту как ширину умноженную на 1.41
        item.style.height = `${height}px`; // Устанавливаем высоту элемента
    });
}

// Функция для генерации случайного времени
function getRandomTime() {
    const hour = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
}

// Функция для выбора случайного элемента из массива
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


// Функция для удаления задачи
function removeTask(taskId) {
    globalTasksArray.pop(globalTasksArray[taskId]);
}

// Генерация случайных задач
function generateRandomTasks(gridContainer) {
    // Массивы данных для случайной генерации
    const descriptions = [
        'Buy groceries for the week',
        'Win three matches online',
        'Read a chapter of a study book',
        'Complete the project report',
        'Catch up with old friends',
        'Go to the gym for a workout',
        'Attend a religious service',
        'Take a walk in the park',
        'Finish homework assignments',
        'Research for university essay',
        'Read a novel by a favorite author'
    ];
    const taskIcon = [
        { name: 'Shopping', icon: 'fa-shopping-cart' },
        { name: 'Gaming', icon: 'fa-gamepad' },
        { name: 'Studying', icon: 'fa-book' },
        { name: 'Working', icon: 'fa-briefcase' },
        { name: 'Friends', icon: 'fa-users'},
        { name: 'Sports', icon: 'fa-running' },
        { name: 'Food', icon: 'fa-carrot'},
        { name: 'Drink', icon: 'fa-tint'},
        { name: 'Pet', icon: 'fa-dog'},
        { name: 'Religion', icon: 'fa-place-of-worship' },
        { name: 'Nature', icon: 'fa-leaf' },
        { name: 'School', icon: 'fa-graduation-cap' },
        { name: 'University', icon: 'fa-university' },
        { name: 'Reading', icon: 'fa-book' },
    ];

    for (let i = 0; i < init_tasks; i++) {

        const status = 'Incomplete'; 

        const taskIndex = Math.floor(Math.random() * taskIcon.length);
        const task = taskIcon[taskIndex].name;
        const icon = taskIcon[taskIndex].icon;
        const description = getRandomElement(descriptions);
        const time = getRandomTime();

        // Create task object
        const taskObject = {
            title: task,
            icon: icon,
            description: description,
            time: time,
            status: status
        };
        globalTasksArray.push(taskObject);

        const taskElement = document.createElement('div');
        taskElement.classList.add('grid-item');
        taskElement.dataset.status = status;
        taskElement.innerHTML = `
            <div class="task-controls">
                <i class="fa fa-pen" aria-hidden="true"></i>
                <i class="fa fa-minus-circle" aria-hidden="true"></i>
                <i class="fa fa-check-circle ${status === 'Complete' ? 'status-complete' : ''}" aria-hidden="true"></i>
            </div>
            <div class="task-icon">
                <i class="fa ${icon}" aria-hidden="true"></i>
            </div>
            <div class="task-title">
                ${task}
            </div>
            <div class="task-description">
                ${description}
            </div>
            <div class="task-time">
                ${time}
            </div>
        `;
        gridContainer.appendChild(taskElement);

        // Находим иконку минус в созданном элементе и добавляем обработчик клика
        const minusIcon = taskElement.querySelector('.fa-minus-circle');
        minusIcon.addEventListener('click', () => removeTask(id));

        // Find the check-circle icon and add click event listener
        const checkIcon = taskElement.querySelector('.fa-check-circle');
        checkIcon.addEventListener('click', () => toggleTaskStatus(id));

        // Find the check-circle icon and add click event listener
        const updateIcon = taskElement.querySelector('.fa-pen');
        updateIcon.addEventListener('click', () => openUpdateMenu(id));

        gridContainer.appendChild(taskElement);
    }

}

function formatTime(timeString) {
    // Проверяем, соответствует ли строка формату HH:MM или HH:MM:SS
    const timeFormat = /^(\d{2}):(\d{2})(:\d{2})?$/;
    if (timeFormat.test(timeString)) {
        // Если строка уже в правильном формате, возвращаем ее без изменений
        return timeString;
    } else {
        // Если формат неверен, пытаемся привести к формату HH:MM
        // Это пример, вам может потребоваться более сложная логика обработки
        const parts = timeString.split(':');
        if (parts.length === 2) {
            let [hours, minutes] = parts;
            hours = hours.length === 1 ? `0${hours}` : hours;
            minutes = minutes.length === 1 ? `0${minutes}` : minutes;
            return `${hours}:${minutes}`;
        }
    }
    // В случае невозможности привести к формату, возвращаем пустую строку или базовое значение
    // Возможно, стоит возвращать некое "безопасное" значение по умолчанию или сообщение об ошибке
    return "00:00"; // Базовое значение времени
}
function openUpdateMenu (index){
    globalTasksArray[index]
    document.getElementById('myModal').style.display = 'block';
    var headerText = document.querySelector('.modal-header h2');
    headerText.textContent = 'Edit Task';

    // Получаем элементы по их id и заполняем данными
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskTime").value = formatTime(task.time);
    
    // Удаляем все предыдущие подсветки
    document.querySelectorAll('#iconSelection .fas').forEach(icon => {
        icon.classList.remove('active');
    });

    // Находим и подсвечиваем иконку, соответствующую задаче
    const iconToHighlight = Array.from(document.querySelectorAll('#iconSelection .fas')).find(icon => icon.classList.contains(task.icon));
    if (iconToHighlight) {
        iconToHighlight.classList.add('active');
    }


    var applyButton = document.getElementById('applyButton');
    applyButton.dataset.taskId = taskId; // Сохраняем taskId в кнопке "Apply"
    applyButton.textContent = 'Edit';
    // Удаляем предыдущий обработчик, если он есть
    applyButton.removeEventListener('click', addTaskHandler);
    // Добавляем новый обработчик событий
    applyButton.addEventListener('click', editTaskHandler);
}
// Функция для обработки нажатия на кнопку "Apply" для редактирования задачи
function editTaskHandler() {

    const applyButton = document.getElementById('applyButton');
    const taskId = applyButton.dataset.taskId; // Получаем текущий taskId

    //alert('Task was edited!');
    console.log(taskId);
    //console.log(taskElement);

    

    // Находим активную иконку
    const activeIcon = document.querySelector('#iconSelection .fas.active');
    // Предполагаем, что классы иконок начинаются с "fa-"
    const iconClass = Array.from(activeIcon.classList).find(cls => cls.startsWith('fa-'));


    //globalTasksArray.find(task => task.id === taskId)
    gta = globalTasksArray.find(task => task.id === taskId);
    gta.title = document.getElementById("taskTitle").value;
    gta.description = document.getElementById("taskDescription").value;
    gta.time = document.getElementById("taskTime").value;
    gta.icon = iconClass;

    //globalTasksArray[taskId].title = document.getElementById("taskTitle").value;
    //globalTasksArray[taskId].description = document.getElementById("taskDescription").value;
    //globalTasksArray[taskId].time = document.getElementById("taskTime").value;
    //globalTasksArray[taskId].icon = iconClass; // Обновляем иконку
    
    
    const taskElement = document.getElementById(taskId);
    
    if (taskElement) {
        // Обновляем содержимое элемента задачи
        taskElement.querySelector('.task-title').textContent = gta.title
        taskElement.querySelector('.task-description').textContent = gta.description;
        taskElement.querySelector('.task-time').textContent = gta.time;

        if (taskElement) {
            // Находим элемент иконки внутри задачи
            const iconElement = taskElement.querySelector('.task-icon .fa');
            if (iconElement) {
                // Удаляем все текущие классы иконок, начинающиеся на "fa-"
                const currentIconClasses = Array.from(iconElement.classList).filter(cls => cls.startsWith('fa-') && cls !== 'fa');
                currentIconClasses.forEach(cls => iconElement.classList.remove(cls));
        
                // Добавляем новый класс иконки
                iconElement.classList.add(gta.icon);
            }
        }

    }
    
    document.getElementById('myModal').style.display = 'none';
}

// Функция для обработки нажатия на кнопку "Apply" для добавления задачи
function addTaskHandler() {
    // Логика добавления новой задачи
    //alert('New task added!');

    // Находим активную иконку
    const activeIcon = document.querySelector('#iconSelection .fas.active');
    // Предполагаем, что классы иконок начинаются с "fa-"
    const icon = Array.from(activeIcon.classList).find(cls => cls.startsWith('fa-'));

    

    
    id = init_tasks;
    //id = globalTasksArray.length;
    task = document.getElementById("taskTitle").value;
    description = document.getElementById("taskDescription").value;
    time =  document.getElementById("taskTime").value;

    // Создаем объект задачи
    const taskObject = {
        id: id,
        title: task,
        icon: icon,
        description: description,
        time: time,
        status: 'Incomplete'
    };
    // Добавляем задачу в глобальный массив задач
    globalTasksArray.push(taskObject);

    const taskElement = document.createElement('div');
    taskElement.id = id;  // Присваиваем ID
    taskElement.classList.add('grid-item');
    taskElement.dataset.id = init_tasks;
    taskElement.dataset.status = 'Incomplete';
    taskElement.innerHTML = `
        <div class="task-controls">
            <i class="fa fa-pen" aria-hidden="true"></i>
            <i class="fa fa-minus-circle" aria-hidden="true"></i>
            <i class="fa fa-check-circle ${'Incomplete' === 'Complete' ? 'status-complete' : ''}" aria-hidden="true"></i>
        </div>
        <div class="task-icon">
            <i class="fa ${icon}" aria-hidden="true"></i>
        </div>
        <div class="task-title">
            ${task}
        </div>
        <div class="task-description">
            ${description}
        </div>
        <div class="task-time">
            ${time}
        </div>
    `;
    gridContainer.appendChild(taskElement);

    // Находим иконку минус в созданном элементе и добавляем обработчик клика
    const minusIcon = taskElement.querySelector('.fa-minus-circle');
    minusIcon.addEventListener('click', () => removeTask(id));

    // Find the check-circle icon and add click event listener
    const checkIcon = taskElement.querySelector('.fa-check-circle');
    checkIcon.addEventListener('click', () => toggleTaskStatus(id));

    // Find the check-circle icon and add click event listener
    const updateIcon = taskElement.querySelector('.fa-pen');
    updateIcon.addEventListener('click', () => openUpdateMenu(id));

    gridContainer.appendChild(taskElement);

    init_tasks = init_tasks + 1;
    document.getElementById('myModal').style.display = 'none';
}

// Функция для добавления анимации к элементам сетки
function animateGridItems(gridContainer) {
    const gridItems = gridContainer.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.add('grid-item-changing'); // Добавляем класс для анимации
    });
    setTimeout(() => { // Убираем класс анимации после завершения
        gridItems.forEach(item => {
            item.classList.remove('grid-item-changing');
        });
    }, 500); // Задержка соответствует продолжительности анимации
}


// Function to toggle the status of a task
function toggleTaskStatus(taskId) {
    // Find the task in the global array and toggle its status
    const task = globalTasksArray.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'Complete' ? 'Incomplete' : 'Complete';
        
        

        // Update the DOM element to reflect the new status
        const taskElement = document.getElementById(taskId);
        if (taskElement) {
            taskElement.dataset.status = task.status;
            // Update the check icon based on the new status
            const checkIcon = taskElement.querySelector('.fa-check-circle');
            
            if (checkIcon) {
                checkIcon.classList.toggle('Complete');
                checkIcon.classList.toggle('Incomplete');
            }
        }

        // Обновить стиль фона в зависимости от статуса
        if (task.status === 'Complete') {
            taskElement.classList.add('complete');
            taskElement.classList.remove('incomplete');
        } else {
            taskElement.classList.add('incomplete');
            taskElement.classList.remove('complete');
        }
        
        // Refresh the grid based on the current filter
        const currentFilter = document.querySelector('.status-display').textContent.trim();
        //updateStatusText(currentFilter);
    }
}



const gridContainer = document.querySelector('.grid-container');
const gridItems = document.querySelectorAll('.grid-item');
const statusDisplay = document.querySelector('.status-display');
const dropdownItems = document.querySelectorAll('.dropdown-content a');

const taskIcons = [
    { name: 'Shopping', icon: 'fa-shopping-cart' },
    { name: 'Gaming', icon: 'fa-gamepad' },
    { name: 'Studying', icon: 'fa-book' },
    { name: 'Working', icon: 'fa-briefcase' },
    { name: 'Friends', icon: 'fa-users'},
    { name: 'Sports', icon: 'fa-running' },
    { name: 'Food', icon: 'fa-carrot'},
    { name: 'Drink', icon: 'fa-tint'},
    { name: 'Pet', icon: 'fa-dog'},
    { name: 'Religion', icon: 'fa-place-of-worship' },
    { name: 'Nature', icon: 'fa-leaf' },
    { name: 'School', icon: 'fa-graduation-cap' },
    { name: 'University', icon: 'fa-university' },
    { name: 'Reading', icon: 'fa-book' },
];

document.addEventListener('DOMContentLoaded', function() {
    
    const iconSelectionDiv = document.getElementById('iconSelection');
    

    taskIcons.forEach(function(task) {
        let iconHTML = `<i class="fas ${task.icon}" title="${task.name}" style="font-size: 12px; margin-right: 10px; cursor: pointer;"></i>`;
        iconSelectionDiv.innerHTML += iconHTML;
    });

    // Находим все иконки
    const icons = document.querySelectorAll('#iconSelection .fas');

    // Добавляем слушателя событий к каждой иконке
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Сначала убираем класс active у всех иконок
            icons.forEach(icon => {
                icon.classList.remove('active');
            });

            // Добавляем класс active к кликнутой иконке
            this.classList.add('active');
        });
    });

    // Функция для обновления текста статуса
    function updateStatusText(text) {
        statusDisplay.textContent = text;

        // Фильтруем задачи по статусу и обновляем отображение
        const allTasks = document.querySelectorAll('.grid-item');
        allTasks.forEach(task => {
            // Проверяем соответствие data-status элемента и выбранного статуса
            if (text === 'All' || task.dataset.status === text) {
                task.style.display = ''; // Показываем задачу
            } else {
                task.style.display = 'none'; // Скрываем задачу
            }
        });
        
    }

    // Добавление обработчиков для элементов выпадающего списка
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Получаем текст элемента и обновляем статус
            const text = item.textContent.trim();
            let statusText = 'All'; // По умолчанию
            if (text === 'Complete') {
                statusText = 'Complete';
            } else if (text === 'Incomplete') {
                statusText = 'Incomplete';
            }
            else if (text === 'All'){
                statusText = 'All';
            }
            updateStatusText(statusText);
        });
    });

    document.querySelector('.grid-plus').addEventListener('click', function() {
        columnsCount++; // Увеличиваем количество столбцов
        //gridContainer.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
        animateGridItems(gridContainer); // Функция анимации
        setTimeout(() => { // Устанавливаем новую сетку после анимации
            gridContainer.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
        }, 500); // Задержка соответствует продолжительности анимации

    });

    document.querySelector('.grid-minus').addEventListener('click', function() {
        if (columnsCount > 2) { // Проверяем, чтобы столбцов было больше 1
            columnsCount--; // Уменьшаем количество столбцов
            //gridContainer.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
            animateGridItems(gridContainer); // Функция анимации
            setTimeout(() => {
                gridContainer.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
            }, 500); // Задержка соответствует продолжительности анимации
            }
    });

    

    // Регулировка размеров grid-item
    adjustGridItems(gridItems);

    // Генерация случайных задач
    generateRandomTasks(gridContainer);


    // Закрытие модального окна
    document.querySelector('.close').onclick = function() {
        document.getElementById('myModal').style.display = 'none';
    };



});




const toggleGrid = () => {
    
    animateGridItems(gridContainer); // Функция анимации
        setTimeout(() => { // Устанавливаем новую сетку после анимации
            gridContainer.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
        }, 500); // Задержка соответствует продолжительности анимации

        var element = document.querySelector('.grid-adjustment');
        if (element) {
            element.style.display = 'flex';
        }
  };
  
  const toggleList = () => {
    animateGridItems(gridContainer); // Функция анимации
        setTimeout(() => { // Устанавливаем новую сетку после анимации
            gridContainer.style.gridTemplateColumns = `repeat(${1}, 1fr)`;
        }, 500); // Задержка соответствует продолжительности анимации

        var element = document.querySelector('.grid-adjustment');
        if (element) {
            element.style.display = 'none';
        }
  };
  const toggleForm = () => {
    document.getElementById('myModal').style.display = 'block';

    var headerText = document.querySelector('.modal-header h2');
    headerText.textContent = 'Add Task';

    var applyButton = document.getElementById('applyButton');
    applyButton.textContent = 'Add';
    // Удаляем предыдущий обработчик, если он есть
    applyButton.removeEventListener('click', editTaskHandler);
    // Добавляем новый обработчик событий
    applyButton.addEventListener('click', addTaskHandler);


  };

  