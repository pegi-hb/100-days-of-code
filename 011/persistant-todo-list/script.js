const box = document.querySelector('.box');
const add = document.querySelector('.add');
const list = document.querySelector('.list');

const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fa fal portrait">
\t<path d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"/>
</svg>`;

let tasks = JSON.parse(localStorage.getItem('task-list'));

tasks.forEach((task) => {
    addTask(task.title, task.id, task.checked, false);
});

function addTask(taskTitle, taskId, taskChecked, shouldSave) {
    if (taskTitle !== "") {
        const li = document.createElement('li');

        const chkId = taskId || Date.now();

        const chk = document.createElement('input');
        chk.setAttribute('type', 'checkbox');
        chk.setAttribute('id', `chk-${chkId}`);
        if (taskChecked) {
            chk.setAttribute('checked', 'checked')
        }
        li.appendChild(chk);
        chk.addEventListener('change', () => {
            let index = tasks.findIndex((task) => {
                return task.id === chkId;
            });
            tasks[index].checked = chk.checked;
            localStorage.setItem('task-list', JSON.stringify(tasks));
        });

        const lbl = document.createElement('label');
        lbl.setAttribute('for', `chk-${chkId}`);
        li.appendChild(lbl);

        const span = document.createElement('span');
        span.innerText = taskTitle;
        li.appendChild(span);

        const btn = document.createElement('button');
        btn.innerHTML = deleteIcon;
        li.appendChild(btn);
        btn.addEventListener('click', () => {
            li.remove();

            let index = tasks.findIndex((task) => {
                return task.id === chkId;
            });
            tasks.splice(index, 1);
            localStorage.setItem('task-list', JSON.stringify(tasks));
        });

        list.appendChild(li);

        if (shouldSave) {
            tasks.push({
                id: chkId,
                title: taskTitle,
                checked: false,
            });
            localStorage.setItem('task-list', JSON.stringify(tasks));
        }
    }
}

add.addEventListener('click', () => {
    addTask(box.value.trim(), null, false, true);
    box.value = '';
});

box.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(box.value.trim(), null, false, true);
        box.value = '';
    }
});