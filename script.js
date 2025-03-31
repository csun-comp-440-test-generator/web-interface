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

function getCourses(userId) {
  return JSON.parse(localStorage.getItem("courses_" + userId) || "[]");
}

function saveCourses(userId, courses) {
  localStorage.setItem("courses_" + userId, JSON.stringify(courses));
}

function addCourse(name) {
  let userId = localStorage.getItem("userId");
  let courses = getCourses(userId);
  if (!courses.includes(name)) {
    courses.push(name);
    saveCourses(userId, courses);
  }
}

function getEnrolledCourses(id) {
  return JSON.parse(localStorage.getItem("enrolled_" + id) || "[]");
}

function enrollStudent(id, course) {
  let list = getEnrolledCourses(id);
  if (!list.includes(course)) {
    list.push(course);
    localStorage.setItem("enrolled_" + id, JSON.stringify(list));
  }
}

function getExams(userId) {
  return JSON.parse(localStorage.getItem("exams_" + userId) || "[]");
}

function saveExams(userId, exams) {
  localStorage.setItem("exams_" + userId, JSON.stringify(exams));
}

function addExam(title, questions, course, timeLimit) {
  let userId = localStorage.getItem("userId");
  let exams = getExams(userId);
  exams.push({ title, questions, course, timeLimit });
  saveExams(userId, exams);
}