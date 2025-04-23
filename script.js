function login() {
  let role = document.getElementById("role").value;
  let userId = document.getElementById("user-id").value;
  //let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("login-error");

  if (userId === "") {
    errorMessage.style.display = "block";
    return;
  }

  localStorage.setItem("role", role);
  localStorage.setItem("currentUser", userId);
  //localStorage.setItem("password", password);

  if (role === "instructor" || role ==="assistant") {
    window.location.href = "instructor.html";
  } else if (role === "student") {
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
async function addCourse(courseID, teacherID, assistantID) {
  const body = {
    course_id: courseID,
    teacher_id: teacherID,
  };

  if (assistantID !== null) {
    body.assistant_id = assistantID;
  }

  console.log(JSON.stringify(body))
  const url = 'http://127.0.0.1:8000/section/create'
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return res
  } catch (error) {
    console.log(error.message);
  }
}
//STUDENT.HTML
function getEnrolledCourses(id) {
  //replace wtih FETCH request
  return JSON.parse(localStorage.getItem("enrolled_" + id) || "[]");
}

//INSTRUCTOR.HTML
//STUDENT.HTML
async function getExams(section_id) {
  let url = `http://127.0.0.1:8000/test/retrieve_by_section_id?section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
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

async function getClasses() {
  const url = 'http://127.0.0.1:8000/course/get_courses'
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

//SECTIONS

async function getSectionInfo(section_id) {
  let url = `http://127.0.0.1:8000/section/get_section_info?section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllSections() {
  let url = `http://127.0.0.1:8000/section/get_all_section_info`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getUnregisteredSections(student_id) {
  let url = `http://127.0.0.1:8000/section/get_unregistered_section_info?student_id=${student_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function enrollStudent(student_id,section_id) {
  const enrollment = {
    student_id:student_id,
    section_id:section_id
  }
  let url = `http://127.0.0.1:8000/section/enroll`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enrollment),
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    //const json = await res.json();
    return res
  } catch (error) {
    console.log(error.message);
  }
}

async function getOpenSections(id) {
  let url = `http://127.0.0.1:8000/section/get_open_sections?assistant_id=${id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function addAssistantToCourse(sectionID, assistantID) {
  const body = {
    assistant_id: assistantID,
    section_id:sectionID,
  };

  console.log(JSON.stringify(body))
  const url = 'http://127.0.0.1:8000/section/register_assistant'
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return res
  } catch (error) {
    console.log(error.message);
  }
}



//TEACHER
async function getTeacherInfo(teacher_id) {
  let url = `http://127.0.0.1:8000/teacher/get_teacher_by_id?teacher_id=${teacher_id}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getTeacherSections(teacher_id) {
  let url = `http://127.0.0.1:8000/teacher/get_teacher_sections?teacher_id=${teacher_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function createExam(exam) {
  console.log(JSON.stringify(exam))
  const url = 'http://127.0.0.1:8000/test/create_test'
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exam)
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    //const json=await res.json();
    return res
  } catch (error) {
    console.log(error.message);
  }
}

//ASSISTANT
async function getAssistantInfo(id) {
  let url = `http://127.0.0.1:8000/assistant/get_by_id?assistant_id=${id}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getAssistantSections(id) {
  let url = `http://127.0.0.1:8000/assistant/get_sections?assistant_id=${id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

//STUDENT

async function getStudentInfo(student_id) {
  let url = `http://127.0.0.1:8000/student/get_student_by_id?student_id=${student_id}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getEnrolledSections(student_id) {
  let url = `http://127.0.0.1:8000/student/get_student_sections?student_id=${student_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getRegisteredExams(student_id, section_id) {
  let url = `http://127.0.0.1:8000/student/get_registered_exams?student_id=${student_id}&section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getExam(exam_id, section_id) {
  //REVAMP TO PULL RANDOM TEST FROM BANK
  //CURRENTLY PULLS FULL TEST (BETTER FOR EDITING FOR TEACHER AND TA)
  let url = `http://127.0.0.1:8000/test/retrieve_by_test_id?test_id=${exam_id}&section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getExamQuestionCount(exam_id) {
  //REVAMP TO GET MAX QUESTIONS FROM GENERATED TEST
  let url = `http://127.0.0.1:8000/test/retrieve_question_count?test_id=${exam_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}


async function submitExam(submission) {
  let url = `http://127.0.0.1:8000/test/sumbit_exam`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function updateGrade(student_id, section_id) {
  let url = `http://127.0.0.1:8000/section/update_grade?student_id=${student_id}&section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getExamAttempts(student_id, exam_id) {
  let url = `http://127.0.0.1:8000/test/retrieve_attempts?student_id=${student_id}&test_id=${exam_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}

async function getCurrentGrade(student_id,section_id) {
  let url = `http://127.0.0.1:8000/student/get_current_grade?student_id=${student_id}&section_id=${section_id}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('FASTAPI Error Response:', errorResponse)
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json
  } catch (error) {
    console.log(error.message);
  }
}


