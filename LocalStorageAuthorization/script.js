'use strict';

function isNumber(num) {
    return !isNaN(parseFloat(num));
}

const registerUser = document.querySelector('#registerUser'),
    login = document.querySelector('#login');

let list = document.querySelector('#list');
let username = document.querySelector('#username');

let profileData = [];
let objectData = {};


let dd;
let mm;
let yyyy;
let monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let monthName;
let hours;
let minutes;
let seconds;

login.addEventListener('click', () => {
    let login = prompt('Введите логин');
    let password = prompt('Введите пароль');
    console.log(profileData);
    if (profileData.length === 0) {
        alert('Отсутствуют пользователи. Зарегистрируйте хотя бы одного.');
    } else {
        for (let i = 0; i < profileData.length; i++) {
            if (profileData[i].login === login) {
                if (profileData[i].password === password) {
                    username.textContent = login;
                } else {
                    alert('Пользователь не найден');
                }

            }
        }
    }
});

function getLocalProfiles() {
    let profiles;
    if (localStorage.getItem('profiles') === null || localStorage.getItem('profiles') === '' || localStorage.getItem('profiles').length === 15) {
        profiles = [];
    } else {
        profiles = JSON.parse(localStorage.getItem('profiles'));
        for (let i = 0; i < profiles.length; i++) {
            profileData.push(profiles[i]);
        }
    }
}

function renderProfiles() {
    getLocalProfiles();
    profileData.forEach(function (item, i) {
        let li = '';
        li = '<li>Имя:' + " " + item.firstName + ', Фамилия:' + item.lastName + ',' + ' ' + item.regDate +
            '<button class="remove-button">delete</button></li>';

        list.innerHTML += li;

        const btnRemove = document.querySelector('.remove-button');
        btnRemove.addEventListener('click', function () {
            profileData.splice(i, 1);
            localStorage.setItem('profiles', JSON.stringify(profileData));
            location.reload();
        });
    });
}

document.addEventListener('DOMContentLoaded', renderProfiles());


function render() {
    profileData.forEach(function (item, i) {
        let li = '';
        li = '<li>Имя:' + " " + item.firstName + ', Фамилия:' + item.lastName + ',' + ' ' + item.regDate +
            '<button class="remove-button">delete</button></li>';
        list.innerHTML += li;
        location.reload();

        const btnRemove = document.querySelector('.remove-button');
        btnRemove.addEventListener('click', function () {
            profileData.splice(i, 1);
            localStorage.setItem('profiles', JSON.stringify(profileData));
            location.reload();
        });

    });

}


function getMonthName(date) {
    for (let i = 0; i < monthArray.length; i++) {
        if (date === i) {
            monthName = monthArray[i];
        } else {
            continue;
        }
    }
}

function saveLocalTodos(profile) {
    let profiles;
    if (localStorage.getItem('profiles') === null || localStorage.getItem('profiles') === '' || localStorage.getItem('profiles').length === 15) {
        profiles = [];
    } else {
        profiles = JSON.parse(localStorage.getItem('profiles'));
    }
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
}


registerUser.addEventListener('click', () => {
    objectData = {};
    let array = [];
    let nameSurname;
    let login;
    let password;
    do {
        nameSurname = prompt('Введите имя и фамилию через пробел', 'Casey Richter');
    }
    while (isNumber(nameSurname) || nameSurname[0] === ' ' || nameSurname === '');
    array = nameSurname.split(' ');
    objectData.firstName = array[0];
    objectData.lastName = array[1];


    do {
        login = prompt('Введите логин');
    }
    while (isNumber(login) || login[0] === ' ' || login === '');

    do {
        password = prompt('Введите пароль');
    }
    while (password[0] === ' ' || password === '');

    let date = new Date();
    hours = String(date.getHours()).padStart(2, '0');
    minutes = String(date.getMinutes()).padStart(2, '0');
    seconds = String(date.getSeconds()).padStart(2, '0');
    dd = String(date.getDate()).padStart(2, '0');
    yyyy = date.getFullYear();
    getMonthName(date.getMonth());
    objectData.login = login;
    objectData.password = password;

    objectData.regDate = `${dd} ${monthName} ${yyyy} г., ${hours}:${minutes}:${seconds}`;
    saveLocalTodos(objectData);
    profileData.push(objectData);

    render();
});