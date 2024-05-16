function showCalendar() {
    var calendar = document.getElementById("calendar");
    calendar.style.display = "block";
    renderCalendar(); // Call renderCalendar to display the calendar for the current year
}

function prevYear() {
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(yearSelect.value);
    var currentYearInReality = new Date().getFullYear();
    if (currentYear <= currentYearInReality) {
        return; // Don't navigate into the past
    }
    yearSelect.value = currentYear - 1;
    renderCalendar();
}

function nextYear() {
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(yearSelect.value);
    var currentYearInReality = new Date().getFullYear();
    if (currentYear == currentYearInReality + 3) {
        return; // Don't navigate too far into the future
    }
    yearSelect.value = currentYear + 1;
    renderCalendar();
}

function renderCalendar() {
    var yearSelect = document.getElementById("year");
    var year = parseInt(yearSelect.value);
    var calendarGrid = document.getElementById("calendarGrid");
    var unitsInYear = 20; // Each year has 20 time units, from 0 to 1000 in steps of 50s
    var html = "";

    for (var i = 1; i <= unitsInYear; i++) {
        html += '<div class="calendar-day" onclick="selectDate(' + i + ')">' + i + '</div>';
    }

    calendarGrid.innerHTML = html;
    updateYearOptions();
}

function selectDate(day) {
    var year = document.getElementById("year").value;
    var selectedDate = year + "-1-" + day; // Needs to change, is still assuming we are working with a normal dating system of day-month-year
    document.getElementById("myDate").value = selectedDate;
    document.getElementById("calendar").style.display = "none";
}

function updateYearOptions() {
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(yearSelect.value);
    var currentYearInReality = new Date().getFullYear();
    yearSelect.innerHTML = ""; // Clear existing options
    for (var i = currentYearInReality; i <= currentYearInReality + 3; i++) { // Display a range of 3 years starting from the current real year
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.add(option);
    }
    yearSelect.value = currentYear; // Set selected year back to original value
}