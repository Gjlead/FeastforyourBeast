document.addEventListener("DOMContentLoaded", setCurrentYear);

function showCalendar() {
    var calendar = document.getElementById("calendar");
    var dateField = document.getElementById("dateField");
    var rect = dateField.getBoundingClientRect();

    // Position calendar under text field
    calendar.style.position = "absolute";
    calendar.style.top = (rect.bottom + window.scrollY) + "px";
    calendar.style.left = (rect.left + window.scrollX) + "px";

    calendar.style.display = "block";
    renderCalendar(); // Call renderCalendar to display the calendar for the current year

    document.addEventListener("click", closeCalendar);
}

function closeCalendar(event) {
    var calendar = document.getElementById("calendar");
    var dateField = document.getElementById("dateField");
    if (calendar.style.display === "block" && !calendar.contains(event.target) && event.target !== dateField) {
        calendar.style.display = "none";
        document.removeEventListener("click", closeCalendar);
    }
}

function prevYear() {
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(translateImperialYear(yearSelect.value));
    var currentYearInReality = new Date().getFullYear();
    if (currentYear <= currentYearInReality) {
        return; // Don't navigate into the past
    }
    yearSelect.value = getImperialYear(currentYear - 1);
    renderCalendar();
}

function nextYear() {
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(translateImperialYear(yearSelect.value));
    var currentYearInReality = new Date().getFullYear();
    if (currentYear == currentYearInReality + 3) {
        return; // Don't navigate too far into the future
    }
    yearSelect.value = getImperialYear(currentYear + 1);
    renderCalendar();
}

function renderCalendar() {
    var calendarGrid = document.getElementById("calendarGrid");
    var yearSelect = document.getElementById("year");
    var currentYear = parseInt(translateImperialYear(yearSelect.value));
    var unitsInYear = 20; // Each year has 20 time units, from 0 to 1000 in steps of 50s
    var secondsInYear = 365 * 24 * 60 * 60; // Not accounting for leap years, but we don't need that level of accuracy for our purposes
    var timeUnit = secondsInYear / 1000;
    var secondsPassed = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / 1000); // Number of seconds that have already passed this year
    var currentRealTimeUnit = Math.floor(secondsPassed / timeUnit);

    var html = "";

    for (var i = 1; i <= unitsInYear; i++) {
        var startTime = (i - 1) * 50;
        var endTime = i * 50 - 1;
        var isPast = currentRealTimeUnit >= startTime && currentYear == new Date().getFullYear(); // Checks if any given time unit lies in the past
        // If date is in the past, make it unclickable and add pastDate style, else make it clickable
        html += '<div class="calendar-day' + (isPast ? ' pastDate' : '') + '" onclick="' + (isPast ? '' : 'selectDate(' + i + ')') + '">' + startTime + ' - ' + endTime + '</div>';
    }

    calendarGrid.innerHTML = html;
    updateYearOptions();
}

// Writes the time unit and year into the date field after clicking on a time unit in the calendar.
function selectDate(timeUnit) {
    var year = document.getElementById("year").value;
    var selectedDate = String((timeUnit-1)*50).padStart(3, '0') + year;
    document.getElementById("dateField").value = selectedDate;
    document.getElementById("calendar").style.display = "none";
}

function updateYearOptions() {
    var yearSelect = document.getElementById("year");
    var currentYear = yearSelect.value;
    var currentYearInReality = new Date().getFullYear();
    yearSelect.innerHTML = ""; // Clear existing options
    for (var i = currentYearInReality; i <= currentYearInReality + 3; i++) { // Display a range of 3 years starting from the current real year
        var option = document.createElement("option");
        option.value = getImperialYear(i);
        option.textContent = getImperialYear(i);
        yearSelect.add(option);
    }
    yearSelect.value = currentYear; // Set selected year back to original value
}

// Sets the current year as the already selected option of the calendar
function setCurrentYear() {
    var currentYear = new Date().getFullYear();
    var imperialYear = getImperialYear(currentYear);
    var yearOption = document.getElementById('yearOption');
    yearOption.value = imperialYear;
    yearOption.textContent = imperialYear;
}

// Translates a real year like 2024 into an Imperial year like 024.M3
function getImperialYear(realYear) {
    var imperialYear = String(realYear % 1000).padStart(3, '0') + '.M' + (Math.floor(realYear / 1000) + 1);
    return imperialYear;
}

// Translates an Imperial Year like 024.M3 into a real year like 2024
function translateImperialYear(imperialYear) {
    var translatedYear = (parseInt(imperialYear.split('M')[1]) - 1) + '' + imperialYear.split('.')[0];
    console.log(translatedYear);
    return translatedYear;
}