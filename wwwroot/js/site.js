function showCalendar() {
    var calendar = document.getElementById("calendar");
    calendar.style.display = "block";
    renderCalendar(); // Call renderCalendar to display the calendar for the current year
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
    var unitsInYear = 20; // Each year has 20 time units, from 0 to 1000 in steps of 50s
    var html = "";

    for (var i = 1; i <= unitsInYear; i++) {
        html += '<div class="calendar-day" onclick="selectDate(' + i + ')">' + (i-1)*50 + ' - ' + (i*50-1) + '</div>';
    }

    calendarGrid.innerHTML = html;
    updateYearOptions();
}

function selectDate(timeUnit) {
    var year = document.getElementById("year").value;
    var selectedDate = String((timeUnit-1)*50).padStart(3, '0') + year;
    document.getElementById("myDate").value = selectedDate;
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
    var imperialYear = String(currentYear % 1000).padStart(3, '0') + '.M' + Math.floor(currentYear / 1000);
    var yearOption = document.getElementById('yearOption');
    yearOption.value = imperialYear;
    yearOption.textContent = imperialYear;
}

// Translates a real year like 2024 into an Imperial year like 024.M2
function getImperialYear(realYear) {
    var imperialYear = String(realYear % 1000).padStart(3, '0') + '.M' + Math.floor(realYear / 1000);
    return imperialYear;
}

// Translates an Imperial Year like 024.M2 into a real year like 2024
function translateImperialYear(imperialYear) {
    var translatedYear = imperialYear.split('M')[1] + '' + imperialYear.split('.')[0];
    return translatedYear;
}

document.addEventListener("DOMContentLoaded", setCurrentYear);