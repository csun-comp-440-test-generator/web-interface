function login() {
  let role = document.getElementById("role").value;
  let userId = document.getElementById("user-id").value;
  let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("login-error");

  if (userId === "" || password === "") {
    errorMessage.style.display = "block";
    return;
  }

  localStorage.setItem("role", role);
  localStorage.setItem("userId", userId);
  localStorage.setItem("password", password);

  if (role === "instructor") {
    window.location.href = "instructor.html";
  } else {
    window.location.href = "student.html";
  }
}

//INSTRUCTOR.HTML
function getCourses(userId) {
  //Replace with FETCH Reqeust
  return JSON.parse(localStorage.getItem("courses_" + userId) || "[]");
}

function saveCourses(userId, courses) {
  //Replace wtih POST request
  localStorage.setItem("courses_" + userId, JSON.stringify(courses));
}

//COURSE.HTML
async function addCourse(sectionID, courseID, teacherID, assistantID) {
  const body = {
    section_id:sectionID,
    course_id:courseID,
    teacher_id:teacherID,
  };

  if (assistantID !== null){
    body.assistant_id = assistantID;
  }

  const url = 'http://127.0.0.1:8000/course/get_courses'
  try{
    const res = await fetch(url,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body})
    })
    if (!res.ok){
      throw new Error(`Response status: ${res.status}`);
    }
    const json=await res.json();
    return json
  } catch(error){
    console.log(error.message);
  }
}
//STUDENT.HTML
function getEnrolledCourses(id) {
  //replace wtih FETCH request
  return JSON.parse(localStorage.getItem("enrolled_" + id) || "[]");
}
//ENROLL.HTML
//Replace with POST
function enrollStudent(id, course) {
  let list = getEnrolledCourses(id);
  if (!list.includes(course)) {
    list.push(course);
    localStorage.setItem("enrolled_" + id, JSON.stringify(list));
  }
}
//INSTRUCTOR.HTML
//STUDENT.HTML
function getExams(userId) {
  //Replace with FETCH request
  return JSON.parse(localStorage.getItem("exams_" + userId) || "[]");
}

function saveExams(userId, exams) {
  //Replace with POST request
  localStorage.setItem("exams_" + userId, JSON.stringify(exams));
}
//EXAM.HTML
function addExam(title, questions, course, timeLimit) {
  let userId = localStorage.getItem("userId");
  let exams = getExams(userId);
  exams.push({ title, questions, course, timeLimit });
  saveExams(userId, exams);
}

async function getClasses(){
  const url = 'http://127.0.0.1:8000/course/get_courses'
  try{
    const res = await fetch(url,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!res.ok){
      throw new Error(`Response status: ${res.status}`);
    }
    const json=await res.json();
    return json
  } catch(error){
    console.log(error.message);
  }
}