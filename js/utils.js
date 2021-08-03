
const makeElament = (selector, parent = document) => parent.querySelector(selector);
const createDOM = (element) => document.createElement(element);



function normalizedDate(time){
    var year = new Date(time).getFullYear();
    var month = String(new Date(time).getMonth() + 1).padStart(2, '0');
    var day = String( new Date(time).getDate()).padStart(2, '0');

    return day + '.' + month + '.' + year;
}
