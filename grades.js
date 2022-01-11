export async function getGradedClasses(includeMissingAssignments=true, dateStart='first', dateEnd='today') { //Function to return a list of classes, each class an array with [points earned, total points, percent, letter, array with all asignments in the class]
  const today = new Date().toLocaleDateString(); //MM/DD/YYYY
  if (dateStart === 'first') {dateStart = '8/26/2019';}
  if (dateEnd === 'today') {dateEnd = today;}
  let allAssignments = await fetch('https://gannacademy.myschoolapp.com/api/webapp/context?').then(async (res) => {
    return await res.json().then(async (data) => {
      let fetchId = data.UserInfo.UserId;
      return await fetch("https://gannacademy.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&filter=2&dateStart="+"8/28/2019"+"&dateEnd="+today+"&persona=2&statusList=&sectionList=").then(async (data) => {
        return await data.json().then(async (data) => { //data is now a json list of all assignments
          let filteredAssignments = data.filter((assignment) => { //Filter out the ones not wanted
            const date_due = new Date(assignment.date_due).getTime();
            return ((assignment.has_grade || (assignment.missing_ind && includeMissingAssignments)) && assignment.publish_grade && (includeMissingAssignments || !assignment.missing_ind) && (new Date(dateStart).getTime() <= date_due && date_due <= new Date(dateEnd).getTime()));
          });
          let allAssignments = filteredAssignments.map((assignment) => {
            return fetch("https://gannacademy.myschoolapp.com/api/datadirect/AssignmentStudentDetail?format=json&studentId=" + fetchId + "&AssignmentIndexId=" + assignment.assignment_index_id);
          });
          let jsonPromises = await Promise.all(allAssignments).then((res) => {
            return res.map((promise) => {return promise.json();});
          });

          allAssignments = await Promise.all(jsonPromises).then((res) => {
            return res.map((assignment) => {return assignment[0];});
          });

          return [allAssignments, filteredAssignments];
        });
      });
    })
  }); //allAssignments is now a list of all asignment
  const gradelessAssignments = allAssignments[1];
  allAssignments = allAssignments[0];
  console.log(allAssignments);

  //Create the classes letiable
  let classes = {};
  for (let [index, assignment] of allAssignments.entries()) { //Makes the class list then adds each assignemnt to its respective class and grades it
    let Class = classes[assignment.sectionName];
    if (!Class && ((!gradelessAssignments[index].missing_ind && assignment.pointsEarned) || gradelessAssignments[index].missing_ind)) {
      Class = [0, 0, 0, undefined, [assignment]]; //Points earned, max points, percent, letter, list of all assignments in that class
    } else if (((!gradelessAssignments[index].missing_ind && assignment.pointsEarned) || gradelessAssignments[index].missing_ind)) {
      Class[4].push(assignment);
    } else {continue;}

    Class[0] += assignment.pointsEarned;
    Class[1] += assignment.maxPoints;
    Class[2] = Class[0] / Class[1] * 100; //Percent
    if (Class[2] >= 97) { //Adds the letter grade
      Class[3] = "A+";
    } else if (Class[2] >= 93) {
      Class[3] = "A";
    } else if (Class[2] >= 90) {
      Class[3] = "A-";
  } else if (Class[2] >= 87) {
      Class[3] = "B+";
    } else if (Class[2] >= 83) {
      Class[3] = "B";
    } else if (Class[2] >= 80) {
      Class[3] = "B-";
  } else if (Class[2] >= 77) {
      Class[3] = "C+";
    } else if (Class[2] >= 73) {
      Class[3] = "C";
    } else if (Class[2] >= 70) {
      Class[3] = "C-";
  } else if (Class[2] >= 67) {
      Class[3] = "D+";
    } else if (Class[2] >= 63) {
      Class[3] = "D";
    } else if (Class[2] >= 60) {
      Class[3] = "D-";
  } else if (Class[2] < 59.99) {
      Class[3] = "F";
    }
    classes[assignment.sectionName] = Class;
  }
  return classes;
}


export function updateTable(classes) {
  let tbody = document.getElementById("tbody");
  while (tbody.firstChild) {tbody.removeChild(tbody.firstChild);} //Empty tbody

  for (let key in classes) {
    let row = document.createElement("tr");
    row.setAttribute("id", key);

    let className = document.createElement("td");
    className.setAttribute("class", "name");
    className.setAttribute("id", key + "name");
    className.innerHTML = key;

    let letter = document.createElement("td");
    letter.setAttribute("class", "letter");
    letter.setAttribute("id", key + "letter");
    letter.innerHTML = classes[key][3];

    let percent = document.createElement("td");
    percent.setAttribute("class", "percent");
    percent.setAttribute("id", key + "percent");
    percent.innerHTML = classes[key][2].toFixed(2);

    let points = document.createElement("td");
    points.setAttribute("class", "points");
    points.setAttribute("id", key + "points");
    points.innerHTML = classes[key][0] + "/" + classes[key][1];

    row.appendChild(className);
    row.appendChild(letter);
    row.appendChild(percent);
    row.appendChild(points);
    tbody.appendChild(row);
  }
}
