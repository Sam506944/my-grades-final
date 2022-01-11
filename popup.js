//Imports grades.js functions
import {
  getGradedClasses,
  updateTable
} from "./grades.js";

//Button functions below
function open_myGann() {
  window.open('https://gannacademy.myschoolapp.com/app/student#studentmyday/progress');
}

function open_contact() {
  window.open('mailto:mygrades989@gmail.com?subject=myGrades%20Contact');
}

function open_despair() {
  window.open('https://despair.com/');
}

//Reload function: Get Id, get name, display footer, display header
async function reload() {
  fetch('https://gannacademy.myschoolapp.com/api/webapp/context?').then((res) => {
    res.json().then(async (data) => {
      if (String(data.UserInfo.UserId).indexOf('undefined') !== -1) {
        document.getElementsByTagName('footer')[0].style.display = "none";
        document.getElementsByTagName('header')[0].style.display = "none";
        switchTab('connection_alert');
      } else {
        if (data.UserInfo.UserId === 4319754) { //If it's Joe
          document.getElementById('user_name').innerHTML = "<i id='user_icon' class='fas fa-user-circle'></i>" + "Samuel" + " " + "Hirsh";
        } else if (data.UserInfo.NickName) {
          document.getElementById('user_name').innerHTML = "<i id='user_icon' class='fas fa-user-circle'></i>" + data.UserInfo.NickName;
        } else {
          document.getElementById('user_name').innerHTML = "<i id='user_icon' class='fas fa-user-circle'></i>" + data.UserInfo.FirstName + " " + data.UserInfo.LastName;
        }
        updateTable(await getGradedClasses());
        document.getElementsByTagName('footer')[0].style.display = "block";
        document.getElementsByTagName('header')[0].style.display = "block";
        switchTab('grade_page');
      }
    });
  }).catch((error) => { //If error occurs in fetch
    if (error == "TypeError: Failed to fetch") { //If error is 'failed to fetch'
      document.getElementsByTagName('footer')[0].style.display = "none";
      document.getElementsByTagName('header')[0].style.display = "none";
      switchTab('connection_alert');
    }
  })
}

//Button event listeners: _error indicates button in error message
document.getElementById('gann_button').addEventListener('click', open_myGann);
document.getElementById('link_button_error').addEventListener('click', open_myGann);
document.getElementById('contact_button').addEventListener('click', open_contact);
document.getElementById('reload_button').addEventListener('click', reload);
document.getElementById('reload_button_error').addEventListener('click', reload);
document.getElementById('despair_button').addEventListener('click', open_despair);


//Tab control function: all tabs have class tab. Code designed to support more pages and therefor more features.
function switchTab(desiredTab) {
  const tabs = document.getElementsByClassName('tab');
  for (let currentTab of tabs) {
    currentTab.style.display = "none";
  }
  tabs[desiredTab].style.display = "block";
}

reload();
