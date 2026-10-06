// LOGIN MODAL

function showLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}


// LOGIN

function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {

        message.innerText = "Please enter email and password.";
        message.style.color = "red";

        return;
    }

    message.innerText = "Login successful!";
    message.style.color = "green";

}


// START STUDYING

function startStudying() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


// SCROLL TO FEATURES

function scrollToFeatures() {

    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });

}


// FOCUS TIMER

function startTimer() {

    let seconds = 25 * 60;

    alert("Focus session started! Study for 25 minutes.");

    const timer = setInterval(function() {

        seconds--;

        if (seconds <= 0) {

            clearInterval(timer);

            alert("🎉 Focus session completed!");

        }

    }, 1000);

}


// TASK CHECKBOXES

const tasks = document.querySelectorAll(".task input");

tasks.forEach(function(task) {

    task.addEventListener("change", function() {

        if (this.checked) {

            this.parentElement.style.textDecoration = "line-through";
            this.parentElement.style.color = "#999";

        } else {

            this.parentElement.style.textDecoration = "none";
            this.parentElement.style.color = "#20243a";

        }

    });

});


// CLOSE MODAL WHEN CLICKING OUTSIDE

window.onclick = function(event) {

    const modal = document.getElementById("loginModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};
// ADD STUDY SESSION

function addStudySession() {

    const subject = prompt("Enter subject name:");

    if (subject !== null && subject.trim() !== "") {

        alert(
            "Study session for " +
            subject +
            " has been added!"
        );

    }

}


// ADD TASK

function addTask() {

    const task = prompt("Enter your task:");

    if (task !== null && task.trim() !== "") {

        alert(
            "Task added: " + task
        );

    }

}


// START FOCUS SESSION

function startFocus() {

    alert(
        "🎯 Your 45-minute focus session has started!\n\n" +
        "Put your phone away and focus on your studies."
    );

}
// =====================================
// STUDYPULSE TASK MANAGER
// =====================================


// Get saved tasks

let studyTasks =
    JSON.parse(localStorage.getItem("studyPulseTasks")) || [];


// CREATE TASK

function createTask() {

    const title =
        document.getElementById("taskTitle").value.trim();

    const date =
        document.getElementById("taskDate").value;

    const priority =
        document.getElementById("taskPriority").value;


    if (title === "") {

        alert("Please enter a task name.");

        return;
    }


    const newTask = {

        id: Date.now(),

        title: title,

        date: date,

        priority: priority,

        completed: false

    };


    studyTasks.push(newTask);


    saveTasks();

    displayTasks();


    document.getElementById("taskTitle").value = "";

    document.getElementById("taskDate").value = "";

    document.getElementById("taskPriority").value = "Low";

}


// SAVE TASKS

function saveTasks() {

    localStorage.setItem(
        "studyPulseTasks",
        JSON.stringify(studyTasks)
    );

}


// DISPLAY TASKS

function displayTasks() {

    const taskList =
        document.getElementById("taskList");


    if (!taskList) {
        return;
    }


    const filter =
        document.getElementById("taskFilter").value;


    let filteredTasks = studyTasks;


    if (filter === "pending") {

        filteredTasks =
            studyTasks.filter(
                task => !task.completed
            );

    }


    if (filter === "completed") {

        filteredTasks =
            studyTasks.filter(
                task => task.completed
            );

    }


    taskList.innerHTML = "";


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="no-tasks">
                <h3>🎉 No tasks here!</h3>
                <p>Add a new task to get started.</p>
            </div>
        `;

        updateTaskStatistics();

        return;
    }


    filteredTasks.forEach(function(task) {


        const taskItem =
            document.createElement("div");


        taskItem.className =
            "task-item";


        if (task.completed) {

            taskItem.classList.add(
                "task-completed"
            );

        }


        let priorityClass = "";


        if (task.priority === "High") {

            priorityClass = "priority-high";

        } else if (task.priority === "Medium") {

            priorityClass = "priority-medium";

        } else {

            priorityClass = "priority-low";

        }


        taskItem.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <div class="task-details">

                    <strong>
                        ${task.title}
                    </strong>

                    <small>
                        📅 ${task.date || "No deadline"}
                    </small>

                </div>

            </div>


            <div class="task-actions">

                <span class="priority ${priorityClass}">
                    ${task.priority}
                </span>

                <button
                    class="delete-task"
                    onclick="deleteTask(${task.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        taskList.appendChild(taskItem);

    });


    updateTaskStatistics();

}


// COMPLETE / UNCOMPLETE TASK

function toggleTask(id) {

    const task =
        studyTasks.find(
            task => task.id === id
        );


    if (task) {

        task.completed =
            !task.completed;

    }


    saveTasks();

    displayTasks();

}


// DELETE TASK

function deleteTask(id) {

    const confirmation =
        confirm("Delete this task?");


    if (!confirmation) {
        return;
    }


    studyTasks =
        studyTasks.filter(
            task => task.id !== id
        );


    saveTasks();

    displayTasks();

}


// UPDATE STATISTICS

function updateTaskStatistics() {

    const total =
        studyTasks.length;


    const completed =
        studyTasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const high =
        studyTasks.filter(
            task =>
                task.priority === "High" &&
                !task.completed
        ).length;


    const totalElement =
        document.getElementById("totalTasks");

    const pendingElement =
        document.getElementById("pendingTasks");

    const completedElement =
        document.getElementById("completedTasks");

    const highElement =
        document.getElementById("highTasks");


    if (totalElement)
        totalElement.innerText = total;


    if (pendingElement)
        pendingElement.innerText = pending;


    if (completedElement)
        completedElement.innerText = completed;


    if (highElement)
        highElement.innerText = high;

}


// LOAD TASKS

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayTasks();

    }
);
// =====================================
// STUDYPULSE SMART TIMETABLE
// =====================================


let timetableSessions =
    JSON.parse(
        localStorage.getItem("studyPulseTimetable")
    ) || [];


// CURRENT VIEW

let timetableView = "all";


// ADD SESSION

function addTimetableSession() {

    const subject =
        document
        .getElementById("subjectName")
        .value
        .trim();

    const date =
        document
        .getElementById("studyDate")
        .value;

    const start =
        document
        .getElementById("startTime")
        .value;

    const end =
        document
        .getElementById("endTime")
        .value;


    if (
        subject === "" ||
        date === "" ||
        start === "" ||
        end === ""
    ) {

        alert(
            "Please fill all timetable fields."
        );

        return;
    }


    const newSession = {

        id: Date.now(),

        subject: subject,

        date: date,

        start: start,

        end: end

    };


    timetableSessions.push(
        newSession
    );


    saveTimetable();

    displayTimetable();


    document.getElementById("subjectName").value = "";

    document.getElementById("studyDate").value = "";

    document.getElementById("startTime").value = "";

    document.getElementById("endTime").value = "";

}


// SAVE TIMETABLE

function saveTimetable() {

    localStorage.setItem(
        "studyPulseTimetable",
        JSON.stringify(timetableSessions)
    );

}


// DISPLAY TIMETABLE

function displayTimetable() {

    const list =
        document.getElementById(
            "timetableList"
        );


    if (!list) {
        return;
    }


    let sessions =
        timetableSessions;


    // SHOW TODAY

    if (timetableView === "today") {

        const today =
            new Date()
            .toISOString()
            .split("T")[0];


        sessions =
            timetableSessions.filter(
                session =>
                    session.date === today
            );

    }


    // SORT BY DATE AND TIME

    sessions.sort(function(a, b) {

        const first =
            a.date + " " + a.start;

        const second =
            b.date + " " + b.start;

        return first.localeCompare(second);

    });


    list.innerHTML = "";


    if (sessions.length === 0) {

        list.innerHTML = `

            <div class="empty-timetable">

                <h3>📅 No study sessions</h3>

                <p>
                    Add a study session to build
                    your timetable.
                </p>

            </div>

        `;

        updateSessionCount();

        return;
    }


    sessions.forEach(function(session) {


        const item =
            document.createElement("div");


        item.className =
            "timetable-session";


        item.innerHTML = `

            <div class="session-time">

                ${formatTime(session.start)}

                <br>

                ↓

                <br>

                ${formatTime(session.end)}

            </div>


            <div class="session-details">

                <h3>
                    📚 ${session.subject}
                </h3>

                <p>
                    📅 ${formatDate(session.date)}
                </p>

            </div>


            <button
                class="delete-session"
                onclick="deleteTimetableSession(${session.id})"
            >
                🗑️ Delete
            </button>

        `;


        list.appendChild(item);

    });


    updateSessionCount();

}


// FORMAT TIME

function formatTime(time) {

    const parts =
        time.split(":");

    let hour =
        parseInt(parts[0]);

    const minutes =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        hour +
        ":" +
        minutes +
        " " +
        period
    );

}


// FORMAT DATE

function formatDate(date) {

    const d =
        new Date(date + "T00:00:00");


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// DELETE SESSION

function deleteTimetableSession(id) {

    const confirmDelete =
        confirm(
            "Delete this study session?"
        );


    if (!confirmDelete) {
        return;
    }


    timetableSessions =
        timetableSessions.filter(
            session =>
                session.id !== id
        );


    saveTimetable();

    displayTimetable();

}


// SHOW TODAY

function showToday() {

    timetableView = "today";

    displayTimetable();

}


// SHOW ALL

function showAllSessions() {

    timetableView = "all";

    displayTimetable();

}


// UPDATE COUNT

function updateSessionCount() {

    const counter =
        document.getElementById(
            "sessionCount"
        );


    if (!counter) {
        return;
    }


    let sessions =
        timetableSessions;


    if (timetableView === "today") {

        const today =
            new Date()
            .toISOString()
            .split("T")[0];


        sessions =
            timetableSessions.filter(
                session =>
                    session.date === today
            );

    }


    counter.innerText =
        sessions.length +
        (sessions.length === 1
            ? " Session"
            : " Sessions");

}


// LOAD TIMETABLE

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayTimetable();

    }
);
/* ============================= */
/* FOCUS TIMER */
/* ============================= */

let focusSeconds = 25 * 60;
let focusInterval = null;
let focusDuration = 25;

let focusSessions =
    JSON.parse(localStorage.getItem("studyPulseFocusSessions")) || [];


/* Display Timer */

function updateFocusTimerDisplay() {

    const display = document.getElementById("timerDisplay");

    if (!display) return;

    const minutes = Math.floor(focusSeconds / 60);
    const seconds = focusSeconds % 60;

    display.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


/* Start Timer */

function startFocusTimer() {

    if (focusInterval) return;

    document.getElementById("timerMode").textContent =
        "Focus Session Running";

    focusInterval = setInterval(function () {

        if (focusSeconds > 0) {

            focusSeconds--;

            updateFocusTimerDisplay();

        } else {

            completeFocusSession();

        }

    }, 1000);
}


/* Pause Timer */

function pauseFocusTimer() {

    clearInterval(focusInterval);

    focusInterval = null;

    document.getElementById("timerMode").textContent =
        "Timer Paused";
}


/* Reset Timer */

function resetFocusTimer() {

    clearInterval(focusInterval);

    focusInterval = null;

    focusSeconds = focusDuration * 60;

    document.getElementById("timerMode").textContent =
        "Focus Session";

    updateFocusTimerDisplay();
}


/* Change Duration */

function setFocusDuration(minutes) {

    clearInterval(focusInterval);

    focusInterval = null;

    focusDuration = minutes;

    focusSeconds = minutes * 60;

    document.getElementById("timerMode").textContent =
        minutes + " Minute Focus Session";

    updateFocusTimerDisplay();
}


/* Complete Session */

function completeFocusSession() {

    clearInterval(focusInterval);

    focusInterval = null;

    focusSessions.push({
        duration: focusDuration,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "studyPulseFocusSessions",
        JSON.stringify(focusSessions)
    );

    focusSeconds = focusDuration * 60;

    updateFocusTimerDisplay();

    displayFocusStats();

    alert("🎉 Focus session completed! Great work!");

    document.getElementById("timerMode").textContent =
        "Focus Session Completed";
}


/* Display Statistics */

function displayFocusStats() {

    const today = new Date().toDateString();

    const todaySessions = focusSessions.filter(function(session) {

        return new Date(session.date).toDateString() === today;

    });

    const totalMinutes = focusSessions.reduce(
        function(total, session) {
            return total + session.duration;
        },
        0
    );


    const todayElement =
        document.getElementById("todaySessions");

    const totalElement =
        document.getElementById("totalFocusTime");

    const streakElement =
        document.getElementById("focusStreak");


    if (todayElement) {
        todayElement.textContent = todaySessions.length;
    }

    if (totalElement) {
        totalElement.textContent =
            totalMinutes + " min";
    }

    if (streakElement) {
        streakElement.textContent =
            focusSessions.length;
    }


    displayFocusHistory();
}


/* Display History */

function displayFocusHistory() {

    const history =
        document.getElementById("focusHistory");

    if (!history) return;


    if (focusSessions.length === 0) {

        history.innerHTML =
            '<p class="no-tasks">No completed sessions yet.</p>';

        return;
    }


    const recentSessions =
        focusSessions.slice(-5).reverse();


    history.innerHTML = recentSessions.map(function(session) {

        const date =
            new Date(session.date).toLocaleString();

        return `
            <div class="focus-session-item">

                <div>
                    <strong>🎯 Focus Session</strong>
                    <span>${date}</span>
                </div>

                <strong>
                    ${session.duration} min
                </strong>

            </div>
        `;

    }).join("");
}


/* Load Focus Timer */

document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementById("timerDisplay")) {

        updateFocusTimerDisplay();

        displayFocusStats();

    }

});
/* ============================= */
/* EXAM PLANNER */
/* ============================= */

let studyExams =
    JSON.parse(localStorage.getItem("studyPulseExams")) || [];


/* Add Exam */

function addExam(event) {

    event.preventDefault();

    const subject =
        document.getElementById("examSubject").value;

    const date =
        document.getElementById("examDate").value;

    const time =
        document.getElementById("examTime").value;

    const status =
        document.getElementById("examStatus").value;


    const exam = {

        id: Date.now(),

        subject: subject,

        date: date,

        time: time,

        status: status

    };


    studyExams.push(exam);

    localStorage.setItem(
        "studyPulseExams",
        JSON.stringify(studyExams)
    );


    document.getElementById("examForm").reset();

    displayExams();

}


/* Delete Exam */

function deleteExam(id) {

    studyExams = studyExams.filter(function(exam) {

        return exam.id !== id;

    });

    localStorage.setItem(
        "studyPulseExams",
        JSON.stringify(studyExams)
    );

    displayExams();
}


/* Calculate Days */

function getDaysUntilExam(date) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const examDate = new Date(date);

    examDate.setHours(0, 0, 0, 0);

    const difference =
        examDate - today;

    return Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );
}


/* Display Exams */

function displayExams() {

    const examList =
        document.getElementById("examList");

    if (!examList) return;


    if (studyExams.length === 0) {

        examList.innerHTML =
            '<p class="no-exams">No exams added yet.</p>';

        updateExamStats();

        return;
    }


    studyExams.sort(function(a, b) {

        return new Date(a.date) - new Date(b.date);

    });


    examList.innerHTML = studyExams.map(function(exam) {

        const days =
            getDaysUntilExam(exam.date);


        let countdownText;

        if (days < 0) {

            countdownText = "Exam completed";

        } else if (days === 0) {

            countdownText = "Today!";

        } else if (days === 1) {

            countdownText = "Tomorrow";

        } else {

            countdownText = days + " days left";

        }


        let statusClass = "status-not-started";

        if (exam.status === "In Progress") {

            statusClass = "status-progress";

        }

        if (exam.status === "Prepared") {

            statusClass = "status-prepared";

        }


        return `

            <div class="exam-item">

                <div class="exam-info">

                    <h3>📚 ${exam.subject}</h3>

                    <p>
                        📅 ${exam.date}
                        &nbsp; ⏰ ${exam.time}
                    </p>

                    <span class="exam-status ${statusClass}">
                        ${exam.status}
                    </span>

                </div>


                <div class="exam-countdown">

                    <strong>
                        ${countdownText}
                    </strong>

                </div>


                <button
                    class="delete-exam"
                    onclick="deleteExam(${exam.id})">

                    Delete

                </button>

            </div>

        `;

    }).join("");


    updateExamStats();
}


/* Update Statistics */

function updateExamStats() {

    const total =
        studyExams.length;


    const upcoming =
        studyExams.filter(function(exam) {

            return getDaysUntilExam(exam.date) >= 0;

        }).length;


    const prepared =
        studyExams.filter(function(exam) {

            return exam.status === "Prepared";

        }).length;


    const totalElement =
        document.getElementById("totalExams");

    const upcomingElement =
        document.getElementById("upcomingExams");

    const preparedElement =
        document.getElementById("preparedExams");


    if (totalElement) {

        totalElement.textContent = total;

    }

    if (upcomingElement) {

        upcomingElement.textContent = upcoming;

    }

    if (preparedElement) {

        preparedElement.textContent = prepared;

    }

}


/* Load Exams */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const examForm =
            document.getElementById("examForm");

        if (examForm) {

            examForm.addEventListener(
                "submit",
                addExam
            );

            displayExams();

        }

    }
);
/* ============================= */
/* PROGRESS ANALYTICS */
/* ============================= */

function displayProgressAnalytics() {

    const focusSessions =
        JSON.parse(
            localStorage.getItem(
                "studyPulseFocusSessions"
            )
        ) || [];


    const tasks =
        JSON.parse(
            localStorage.getItem(
                "studyPulseTasks"
            )
        ) || [];


    const exams =
        JSON.parse(
            localStorage.getItem(
                "studyPulseExams"
            )
        ) || [];


    /* Focus Time */

    const totalFocusTime =
        focusSessions.reduce(
            function(total, session) {

                return total + session.duration;

            },
            0
        );


    const focusTimeElement =
        document.getElementById(
            "progressFocusTime"
        );


    if (focusTimeElement) {

        focusTimeElement.textContent =
            totalFocusTime + " min";

    }


    /* Completed Tasks */

    const completedTasks =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    const completedElement =
        document.getElementById(
            "progressCompletedTasks"
        );


    if (completedElement) {

        completedElement.textContent =
            completedTasks;

    }


    /* Upcoming Exams */

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    const upcomingExams =
        exams.filter(function(exam) {

            const examDate =
                new Date(exam.date);

            examDate.setHours(0, 0, 0, 0);

            return examDate >= today;

        }).length;


    const examElement =
        document.getElementById(
            "progressExams"
        );


    if (examElement) {

        examElement.textContent =
            upcomingExams;

    }


    /* Task Percentage */

    let taskPercentage = 0;


    if (tasks.length > 0) {

        taskPercentage =
            Math.round(
                (completedTasks / tasks.length) * 100
            );

    }


    const progressBar =
        document.getElementById(
            "taskProgressBar"
        );


    const progressText =
        document.getElementById(
            "taskProgressText"
        );


    if (progressBar) {

        progressBar.style.width =
            taskPercentage + "%";

    }


    if (progressText) {

        progressText.textContent =
            taskPercentage +
            "% of your tasks completed";

    }


    /* Focus Sessions */

    const sessionCount =
        document.getElementById(
            "focusSessionCount"
        );


    if (sessionCount) {

        sessionCount.textContent =
            focusSessions.length;

    }


    /* Weekly Chart */

    displayWeeklyFocus(focusSessions);

}


/* Weekly Focus Chart */

function displayWeeklyFocus(sessions) {

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    const totals = {

        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0

    };


    sessions.forEach(function(session) {

        const date =
            new Date(session.date);

        const day =
            days[date.getDay()];

        totals[day] += session.duration;

    });


    const maximum =
        Math.max(
            ...Object.values(totals),
            1
        );


    days.forEach(function(day) {

        const bar =
            document.getElementById(
                day.toLowerCase() + "Bar"
            );


        if (!bar) return;


        const height =
            (totals[day] / maximum) * 180;


        bar.style.height =
            Math.max(height, 5) + "px";

    });

}


/* Load Progress Page */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "progressFocusTime"
            )
        ) {

            displayProgressAnalytics();

        }

    }
);
/* ============================= */
/* STUDY GOALS */
/* ============================= */

let studyGoals =
    JSON.parse(
        localStorage.getItem("studyPulseGoals")
    ) || [];


/* Create Goal */

function createGoal(event) {

    event.preventDefault();

    const name =
        document.getElementById("goalName").value;

    const target =
        Number(
            document.getElementById("goalTarget").value
        );

    const unit =
        document.getElementById("goalUnit").value;

    const deadline =
        document.getElementById("goalDeadline").value;


    const goal = {

        id: Date.now(),

        name: name,

        target: target,

        unit: unit,

        progress: 0,

        deadline: deadline,

        completed: false

    };


    studyGoals.push(goal);


    localStorage.setItem(
        "studyPulseGoals",
        JSON.stringify(studyGoals)
    );


    document.getElementById("goalForm").reset();

    displayGoals();

}


/* Add Progress */

function addGoalProgress(id) {

    const goal =
        studyGoals.find(function(item) {

            return item.id === id;

        });


    if (!goal) return;


    let amount =
        prompt(
            "How much progress do you want to add?"
        );


    amount = Number(amount);


    if (!amount || amount <= 0) {

        return;

    }


    goal.progress += amount;


    if (goal.progress >= goal.target) {

        goal.progress = goal.target;

        goal.completed = true;

    }


    localStorage.setItem(
        "studyPulseGoals",
        JSON.stringify(studyGoals)
    );


    displayGoals();

}


/* Delete Goal */

function deleteGoal(id) {

    studyGoals =
        studyGoals.filter(function(goal) {

            return goal.id !== id;

        });


    localStorage.setItem(
        "studyPulseGoals",
        JSON.stringify(studyGoals)
    );


    displayGoals();

}


/* Display Goals */

function displayGoals() {

    const goalList =
        document.getElementById("goalList");

    if (!goalList) return;


    if (studyGoals.length === 0) {

        goalList.innerHTML =
            '<p class="no-goals">No goals created yet.</p>';

        updateGoalStats();

        return;

    }


    goalList.innerHTML =
        studyGoals.map(function(goal) {


            const percentage =
                Math.min(
                    Math.round(
                        (goal.progress / goal.target) * 100
                    ),
                    100
                );


            let unitText =
                goal.unit;


            if (goal.unit === "sessions") {

                unitText = "sessions";

            }


            return `

                <div class="goal-item
                    ${goal.completed ? "goal-completed" : ""}">

                    <div class="goal-header">

                        <div>

                            <h3>
                                🎯 ${goal.name}
                            </h3>

                            <span class="goal-deadline">
                                Deadline: ${goal.deadline}
                            </span>

                        </div>

                        <strong>
                            ${percentage}%
                        </strong>

                    </div>


                    <div class="goal-progress-container">

                        <div
                            class="goal-progress-bar"
                            style="width: ${percentage}%">
                        </div>

                    </div>


                    <div class="goal-progress-info">

                        <span>
                            ${goal.progress}
                            / ${goal.target}
                            ${unitText}
                        </span>

                        <span>
                            ${
                                goal.completed
                                ? "🏆 Completed"
                                : "In Progress"
                            }
                        </span>

                    </div>


                    <div class="goal-actions">

                        ${
                            !goal.completed
                            ? `
                                <button
                                    class="goal-add-progress"
                                    onclick="addGoalProgress(${goal.id})">

                                    + Add Progress

                                </button>
                            `
                            : ""
                        }


                        <button
                            class="goal-delete"
                            onclick="deleteGoal(${goal.id})">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    updateGoalStats();

}


/* Goal Statistics */

function updateGoalStats() {

    const total =
        studyGoals.length;


    const active =
        studyGoals.filter(function(goal) {

            return !goal.completed;

        }).length;


    const completed =
        studyGoals.filter(function(goal) {

            return goal.completed;

        }).length;


    const totalElement =
        document.getElementById("totalGoals");

    const activeElement =
        document.getElementById("activeGoals");

    const completedElement =
        document.getElementById("completedGoals");


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (activeElement) {

        activeElement.textContent =
            active;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }

}


/* Load Goals */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const goalForm =
            document.getElementById("goalForm");


        if (goalForm) {

            goalForm.addEventListener(
                "submit",
                createGoal
            );

            displayGoals();

        }

    }
);
/* ============================= */
/* DYNAMIC DASHBOARD */
/* ============================= */

function loadDynamicDashboard() {

    /* ========================= */
    /* LOAD DATA */
    /* ========================= */

    const tasks =
        JSON.parse(
            localStorage.getItem("studyPulseTasks")
        ) || [];


    const focusSessions =
        JSON.parse(
            localStorage.getItem(
                "studyPulseFocusSessions"
            )
        ) || [];


    const exams =
        JSON.parse(
            localStorage.getItem("studyPulseExams")
        ) || [];


    const goals =
        JSON.parse(
            localStorage.getItem("studyPulseGoals")
        ) || [];


    /* ========================= */
    /* STUDY TIME */
    /* ========================= */

    const totalFocusTime =
        focusSessions.reduce(
            function(total, session) {

                return total + session.duration;

            },
            0
        );


    const studyTimeElement =
        document.getElementById(
            "dashboardStudyTime"
        );


    if (studyTimeElement) {

        if (totalFocusTime >= 60) {

            const hours =
                Math.floor(totalFocusTime / 60);

            const minutes =
                totalFocusTime % 60;

            studyTimeElement.textContent =
                hours + "h " + minutes + "m";

        } else {

            studyTimeElement.textContent =
                totalFocusTime + " min";

        }

    }


    /* ========================= */
    /* TASKS */
    /* ========================= */

    const completedTasks =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    const dashboardTasks =
        document.getElementById(
            "dashboardTasks"
        );


    if (dashboardTasks) {

        dashboardTasks.textContent =
            completedTasks + "/" + tasks.length;

    }


    /* ========================= */
    /* EXAMS */
    /* ========================= */

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    const upcomingExams =
        exams.filter(function(exam) {

            const examDate =
                new Date(exam.date);

            examDate.setHours(0, 0, 0, 0);

            return examDate >= today;

        });


    const dashboardExams =
        document.getElementById(
            "dashboardExams"
        );


    if (dashboardExams) {

        dashboardExams.textContent =
            upcomingExams.length;

    }


    /* ========================= */
    /* GOAL PROGRESS */
    /* ========================= */

    let goalPercentage = 0;


    if (goals.length > 0) {

        const totalPercentage =
            goals.reduce(
                function(total, goal) {

                    return total +
                        Math.min(
                            (goal.progress /
                            goal.target) * 100,
                            100
                        );

                },
                0
            );


        goalPercentage =
            Math.round(
                totalPercentage / goals.length
            );

    }


    const dashboardGoal =
        document.getElementById(
            "dashboardGoal"
        );


    if (dashboardGoal) {

        dashboardGoal.textContent =
            goalPercentage + "%";

    }


    /* ========================= */
    /* TASK LIST */
    /* ========================= */

    displayDashboardTasks(tasks);


    /* ========================= */
    /* EXAM LIST */
    /* ========================= */

    displayDashboardExams(upcomingExams);

}


/* ============================= */
/* DASHBOARD TASKS */
/* ============================= */

function displayDashboardTasks(tasks) {

    const container =
        document.getElementById(
            "dashboardTaskList"
        );


    if (!container) return;


    if (tasks.length === 0) {

        container.innerHTML =
            '<p class="dashboard-empty">' +
            'No tasks yet. Add some tasks!' +
            '</p>';

        return;

    }


    const pendingTasks =
        tasks
            .filter(function(task) {

                return !task.completed;

            })
            .slice(0, 5);


    if (pendingTasks.length === 0) {

        container.innerHTML =
            '<p class="dashboard-empty">' +
            '🎉 All tasks completed!' +
            '</p>';

        return;

    }


    container.innerHTML =
        pendingTasks.map(function(task) {

            return `

                <div class="dashboard-dynamic-item">

                    <div>

                        <strong>
                            📝 ${task.title}
                        </strong>

                        <small>
                            ${task.date || "No date"}
                        </small>

                    </div>

                    <span>
                        ${task.priority}
                    </span>

                </div>

            `;

        }).join("");

}


/* ============================= */
/* DASHBOARD EXAMS */
/* ============================= */

function displayDashboardExams(exams) {

    const container =
        document.getElementById(
            "dashboardExamList"
        );


    if (!container) return;


    if (exams.length === 0) {

        container.innerHTML =
            '<p class="dashboard-empty">' +
            'No upcoming exams.' +
            '</p>';

        return;

    }


    const upcoming =
        exams.slice(0, 4);


    container.innerHTML =
        upcoming.map(function(exam) {

            const examDate =
                new Date(exam.date);


            const today =
                new Date();

            today.setHours(0, 0, 0, 0);


            const difference =
                examDate - today;


            const days =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            let countdown;


            if (days === 0) {

                countdown = "Today";

            } else if (days === 1) {

                countdown = "Tomorrow";

            } else {

                countdown =
                    days + " days";

            }


            return `

                <div class="dashboard-dynamic-item">

                    <div>

                        <strong>
                            📚 ${exam.subject}
                        </strong>

                        <small>
                            ${exam.date}
                            •
                            ${exam.time}
                        </small>

                    </div>

                    <strong>
                        ${countdown}
                    </strong>

                </div>

            `;

        }).join("");

}


/* ============================= */
/* LOAD DASHBOARD */
/* ============================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "dashboardStudyTime"
            )
        ) {

            loadDynamicDashboard();

        }

    }
);
/* ============================= */
/* SMART RECOMMENDATIONS */
/* ============================= */

let recommendationAction = "focus";


function generateSmartRecommendation() {

    const recommendation =
        document.getElementById(
            "smartRecommendation"
        );


    const button =
        document.getElementById(
            "recommendationButton"
        );


    if (!recommendation) return;


    /* Load Data */

    const tasks =
        JSON.parse(
            localStorage.getItem(
                "studyPulseTasks"
            )
        ) || [];


    const exams =
        JSON.parse(
            localStorage.getItem(
                "studyPulseExams"
            )
        ) || [];


    const goals =
        JSON.parse(
            localStorage.getItem(
                "studyPulseGoals"
            )
        ) || [];


    const focusSessions =
        JSON.parse(
            localStorage.getItem(
                "studyPulseFocusSessions"
            )
        ) || [];


    /* ========================= */
    /* PRIORITY 1 - HIGH TASK */
    /* ========================= */

    const highPriorityTask =
        tasks.find(function(task) {

            return (
                !task.completed &&
                task.priority === "High"
            );

        });


    if (highPriorityTask) {

        recommendation.innerHTML = `

            <h3>
                🔥 Complete your high-priority task
            </h3>

            <p>
                Your next priority should be:
                <strong>
                    ${highPriorityTask.title}
                </strong>
            </p>

            <p class="recommendation-reason">
                This task has been marked as High Priority.
            </p>

        `;


        recommendationAction = "tasks";


        button.textContent =
            "Open Tasks";

        return;

    }


    /* ========================= */
    /* PRIORITY 2 - EXAM */
    /* ========================= */

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    const upcomingExams =
        exams
            .filter(function(exam) {

                const examDate =
                    new Date(exam.date);

                examDate.setHours(0, 0, 0, 0);

                return examDate >= today;

            })
            .sort(function(a, b) {

                return new Date(a.date) -
                    new Date(b.date);

            });


    if (upcomingExams.length > 0) {

        const nearestExam =
            upcomingExams[0];


        const examDate =
            new Date(nearestExam.date);


        const difference =
            examDate - today;


        const days =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (days <= 7) {

            recommendation.innerHTML = `

                <h3>
                    📚 Prepare for your upcoming exam
                </h3>

                <p>
                    Your
                    <strong>
                        ${nearestExam.subject}
                    </strong>
                    exam is coming up soon.
                </p>

                <p class="recommendation-reason">
                    You have approximately
                    ${days} day(s) remaining.
                </p>

            `;


            recommendationAction = "focus";


            button.textContent =
                "Start Focus Session";

            return;

        }

    }


    /* ========================= */
    /* PRIORITY 3 - GOAL */
    /* ========================= */

    const activeGoal =
        goals.find(function(goal) {

            return !goal.completed;

        });


    if (activeGoal) {

        const percentage =
            Math.round(
                (activeGoal.progress /
                activeGoal.target) * 100
            );


        recommendation.innerHTML = `

            <h3>
                🎯 Continue working toward your goal
            </h3>

            <p>
                Your goal:
                <strong>
                    ${activeGoal.name}
                </strong>
            </p>

            <p class="recommendation-reason">
                Current progress:
                ${percentage}%
            </p>

        `;


        recommendationAction = "goals";


        button.textContent =
            "Open Goals";

        return;

    }


    /* ========================= */
    /* PRIORITY 4 - FOCUS */
    /* ========================= */

    if (focusSessions.length === 0) {

        recommendation.innerHTML = `

            <h3>
                🚀 Start your first focus session
            </h3>

            <p>
                You haven't completed a focus session yet.
                Start with a 25-minute study session.
            </p>

        `;


        recommendationAction = "focus";


        button.textContent =
            "Start Focus Session";

        return;

    }


    /* ========================= */
    /* DEFAULT */
    /* ========================= */

    recommendation.innerHTML = `

        <h3>
            🌟 You're doing well!
        </h3>

        <p>
            Keep completing tasks and focus sessions
            to maintain your study progress.
        </p>

    `;


    recommendationAction = "focus";


    button.textContent =
        "Start Focus Session";

}


/* ============================= */
/* RECOMMENDATION BUTTON */
/* ============================= */

function openRecommendationAction() {

    if (recommendationAction === "tasks") {

        window.location.href =
            "tasks.html";

    }

    else if (recommendationAction === "goals") {

        window.location.href =
            "goals.html";

    }

    else {

        window.location.href =
            "focus.html";

    }

}


/* Load Recommendation */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "smartRecommendation"
            )
        ) {

            generateSmartRecommendation();

        }

    }
);
/* ============================= */
/* STUDENT PROFILE */
/* ============================= */

function loadStudentProfile() {

    const savedName =
        localStorage.getItem(
            "studyPulseStudentName"
        );


    const nameElement =
        document.getElementById(
            "studentName"
        );


    if (!nameElement) return;


    if (savedName) {

        nameElement.textContent =
            savedName;

    }

}


/* Edit Student Profile */

function editStudentProfile() {

    const currentName =
        localStorage.getItem(
            "studyPulseStudentName"
        ) || "Student";


    const newName =
        prompt(
            "Enter your name:",
            currentName
        );


    if (
        newName &&
        newName.trim() !== ""
    ) {

        localStorage.setItem(
            "studyPulseStudentName",
            newName.trim()
        );


        loadStudentProfile();

    }

}


/* Load Profile */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadStudentProfile();

    }
);
/* ============================= */
/* MOBILE MENU */
/* ============================= */

function toggleMobileMenu() {

    const sidebar =
        document.querySelector(".sidebar");


    if (sidebar) {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }

}
/* ============================= */
/* SETTINGS */
/* ============================= */

function loadSettings() {

    const settings = JSON.parse(
        localStorage.getItem("studyPulseSettings")
    ) || {};

    const nameInput = document.getElementById("settingsName");
    const courseInput = document.getElementById("settingsCourse");
    const targetInput = document.getElementById("dailyStudyTarget");
    const focusInput = document.getElementById("defaultFocusDuration");
    const notificationInput = document.getElementById("enableNotifications");

    if (!nameInput) return;

    nameInput.value = settings.name || "";
    courseInput.value = settings.course || "";
    targetInput.value = settings.dailyTarget || 2;
    focusInput.value = settings.focusDuration || 25;
    notificationInput.checked = settings.notifications || false;
}


function saveSettings(event) {

    if (event) {
        event.preventDefault();
    }

    const name = document.getElementById("settingsName").value.trim();
    const course = document.getElementById("settingsCourse").value.trim();
    const dailyTarget = document.getElementById("dailyStudyTarget").value;
    const focusDuration = document.getElementById("defaultFocusDuration").value;
    const notifications = document.getElementById("enableNotifications").checked;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    const settings = {
        name: name,
        course: course,
        dailyTarget: dailyTarget,
        focusDuration: focusDuration,
        notifications: notifications
    };

    localStorage.setItem(
        "studyPulseSettings",
        JSON.stringify(settings)
    );

    // Keep existing profile system updated
    localStorage.setItem(
        "studyPulseStudentName",
        name
    );

    const message = document.getElementById("settingsMessage");

    if (message) {
        message.textContent = "✅ Settings saved successfully!";
    }

    if (typeof loadStudentProfile === "function") {
        loadStudentProfile();
    }
}


function resetSettings() {

    const confirmReset = confirm(
        "Are you sure you want to reset your settings?"
    );

    if (!confirmReset) {
        return;
    }

    localStorage.removeItem("studyPulseSettings");

    document.getElementById("settingsName").value = "";
    document.getElementById("settingsCourse").value = "";
    document.getElementById("dailyStudyTarget").value = 2;
    document.getElementById("defaultFocusDuration").value = 25;
    document.getElementById("enableNotifications").checked = false;

    document.getElementById("settingsMessage").textContent =
        "🔄 Settings have been reset.";
}


document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("settingsName")) {
        loadSettings();
    }

});
/* ============================= */
/* LOGIN PROTECTION */
/* ============================= */

function protectDashboardPage() {

    const protectedPages = [
        "dashboard.html",
        "tasks.html",
        "timetable.html",
        "focus.html",
        "exams.html",
        "progress.html",
        "goals.html",
        "settings.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    if (
        protectedPages.includes(currentPage) &&
        localStorage.getItem("studyPulseLoggedIn") !== "true"
    ) {
        window.location.href = "index.html";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    protectDashboardPage();
});
/* ============================= */
/* DYNAMIC STUDENT PROFILE */
/* ============================= */

function loadDynamicStudentProfile() {

    const courseElement =
        document.getElementById("studentCourse");

    if (!courseElement) return;

    const settings =
        JSON.parse(
            localStorage.getItem("studyPulseSettings")
        ) || {};

    if (settings.course) {
        courseElement.textContent = settings.course;
    }
}


/* ============================= */
/* DASHBOARD LIVE CLOCK */
/* ============================= */

function updateDashboardClock() {

    const clock =
        document.getElementById("dashboardClock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}


setInterval(updateDashboardClock, 1000);


/* ============================= */
/* INITIALIZE DASHBOARD */
/* ============================= */

document.addEventListener("DOMContentLoaded", function () {

    loadDynamicStudentProfile();

    updateDashboardClock();

});
/* ============================= */
/* TIMETABLE CALENDAR */
/* ============================= */

let calendarDate = new Date();


function displayCalendar() {

    const calendarDays =
        document.getElementById("calendarDays");

    const calendarMonth =
        document.getElementById("calendarMonth");

    if (!calendarDays || !calendarMonth) {
        return;
    }

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDay =
        new Date(year, month, 1).getDay();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    calendarMonth.textContent =
        calendarDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });

    calendarDays.innerHTML = "";

    // Empty spaces before first day
    for (let i = 0; i < firstDay; i++) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className = "calendar-day empty";

        calendarDays.appendChild(emptyDay);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {

        const dayElement =
            document.createElement("div");

        dayElement.className = "calendar-day";

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const sessions =
            timetableSessions.filter(
                session => session.date === dateString
            );

        dayElement.innerHTML = `
            <strong>${day}</strong>
            ${
                sessions.length > 0
                ? `<span class="calendar-session">
                    📚 ${sessions.length} session${sessions.length > 1 ? "s" : ""}
                   </span>`
                : ""
            }
        `;

        if (
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
        ) {
            dayElement.classList.add("today");
        }

        calendarDays.appendChild(dayElement);
    }
}


function changeCalendarMonth(direction) {

    calendarDate.setMonth(
        calendarDate.getMonth() + direction
    );

    displayCalendar();
}


document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("calendarDays")) {
        displayCalendar();
    }

});
/* ============================= */
/* TASK SEARCH */
/* ============================= */

function searchTasks() {

    const searchInput =
        document.getElementById("taskSearch");

    if (!searchInput) return;

    const searchText =
        searchInput.value.toLowerCase().trim();

    const taskItems =
        document.querySelectorAll(".task-item");

    taskItems.forEach(function(item) {

        const text =
            item.textContent.toLowerCase();

        if (text.includes(searchText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }

    });
}
/* ============================= */
/* TIMETABLE SEARCH */
/* ============================= */

function searchTimetable() {

    const input =
        document.getElementById("timetableSearch");

    if (!input) return;

    const searchText =
        input.value.toLowerCase().trim();

    const sessions =
        document.querySelectorAll(".timetable-session");

    sessions.forEach(function(session) {

        const text =
            session.textContent.toLowerCase();

        session.style.display =
            text.includes(searchText) ? "" : "none";
    });
}
/* ============================= */
/* EXAM SEARCH */
/* ============================= */

function searchExams() {

    const input =
        document.getElementById("examSearch");

    if (!input) return;

    const searchText =
        input.value.toLowerCase().trim();

    const exams =
        document.querySelectorAll(".exam-item");

    exams.forEach(function(exam) {

        const text =
            exam.textContent.toLowerCase();

        exam.style.display =
            text.includes(searchText) ? "" : "none";
    });
}
/* ============================= */
/* GOAL SEARCH */
/* ============================= */

function searchGoals() {

    const input =
        document.getElementById("goalSearch");

    if (!input) return;

    const searchText =
        input.value.toLowerCase().trim();

    const goals =
        document.querySelectorAll(".goal-item");

    goals.forEach(function(goal) {

        const text =
            goal.textContent.toLowerCase();

        goal.style.display =
            text.includes(searchText) ? "" : "none";
    });
}