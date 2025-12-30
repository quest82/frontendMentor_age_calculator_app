// DOM Queries
const form = document.querySelector(".ageCalculator__form");
const yearOutput = document.querySelector(".yearOutput span");
const monthOutput = document.querySelector(".monthOutput span");
const dayOutput = document.querySelector(".dayOutput span");
const errorText = Array.from(document.querySelectorAll(".error__text"));

// Store up the current date in year, month & day as integers
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // 1 is added to month of current date to account for Date() indexing
const currentDay = currentDate.getDate();

form.addEventListener("submit", (e) => {
	e.preventDefault();

	formValidation();
});

function ageCalculator() {
	// Store up date of birth in year, month & day as integers
	const yearOfBirth = parseInt(form.year.value.trim(), 10);
	const monthOfBirth = parseInt(form.month.value.trim(), 10);
	const dayOfBirth = parseInt(form.day.value.trim(), 10);

	// Initial calculations to get the age of the user in the years, months and days they've been alive e.g 40 Years, 3 Months, 16 Days
	// Subtracting the current year, month (number), and day from the that of the date of birth should offer the answer easily
	let ageInYears = currentYear - yearOfBirth;
	let ageInMonths = currentMonth - monthOfBirth;
	let ageInDays = currentDay - dayOfBirth;

	// For when the month of the DOB hasn't been reached (DOB is 6 - June but the current year is 3 - March)
	// This would give a negative month using the initial calculation. To account for that, a year needs to be removed from age in years and the deficit month is removed from a full year in months (12)

	if (ageInMonths < 0 && ageInDays < 0) {
		getMonthsNegative();
		getDaysWhenNegative();
	}

	//  If the date of the birthday hasn't been reached
	if (ageInDays < 0) {
		getDaysWhenNegative();
	}

	if (ageInMonths < 0) {
		getMonthsNegative();
	}

	let yearStart = 0;
	let monthStart = 0;
	let dayStart = 0;
	let yearCount = setInterval(() => {
		yearOutput.textContent = yearStart;
		if (yearStart === ageInYears) {
			clearInterval(yearCount);
		} else {
			yearStart++;
		}
	}, 100);

	let monthCount = setInterval(() => {
		monthOutput.textContent = monthStart;
		if (monthStart === ageInMonths) {
			clearInterval(monthCount);
		} else {
			monthStart++;
		}
	}, 100);

	let dayCount = setInterval(() => {
		dayOutput.textContent = dayStart;
		if (dayStart === ageInDays) {
			clearInterval(dayCount);
		} else {
			dayStart++;
		}
	}, 100);

	function getMonthsNegative() {
		ageInYears = ageInYears - 1;
		ageInMonths = 12 + ageInMonths;
	}

	function getDaysWhenNegative() {
		// If the date of the birthday hasn't been reached, the initial calculation will yield a negative number for age in days so it taken from the full previous month
		const previousMonthDays = new Date(
			currentYear,
			currentMonth - 1,
			0
		).getDate(); // To get the number of days of the previous month
		ageInDays = previousMonthDays + ageInDays;
		ageInMonths = ageInMonths - 1;
	}
}

function formValidation() {
	clearErrors();
	// Store up date of birth in year, month & day as integers
	const yob = form.year;
	const mob = form.month;
	const dob = form.day;

	let dateInput = new Date(
		parseInt(yob.value.trim(), 10),
		parseInt(mob.value.trim(), 10) - 1,
		parseInt(dob.value.trim(), 10)
	);

	let status = true;

	// Empty form
	if (!parseInt(yob.value.trim(), 10)) {
		addRed(yob);
		addErrorText("This field is required", "year");
		status = false;
	}

	if (!parseInt(mob.value.trim(), 10)) {
		addRed(mob);
		addErrorText("This field is required", "month");
		status = false;
	}

	if (!parseInt(dob.value.trim(), 10)) {
		addRed(dob);
		addErrorText("This field is required", "day");
		status = false;
	}

	if (!status) return; // No further code runs if at least one input is empty

	// Future date

	if (currentDate.getTime() < dateInput.getTime()) {
		addRed(dob, mob, yob);
		addErrorText("Must be in the past", "year");
		status = false;
	}

	// Invalid date
	if (
		dateInput.getFullYear() !== parseInt(yob.value.trim(), 10) ||
		dateInput.getMonth() !== parseInt(mob.value.trim(), 10) - 1 ||
		dateInput.getDate() !== parseInt(dob.value.trim(), 10)
	) {
		addRed(dob, mob, yob);
		addErrorText("Must be a valid date", "day");
		addErrorText("", "year");
		status = false;
	}

	// Invalid day, month & year
	if (parseInt(dob.value.trim(), 10) > 31) {
		addRed(dob);
		addErrorText("Must be a valid day", "day");
		status = false;
	}

	if (parseInt(mob.value.trim(), 10) > 12) {
		addRed(mob);
		addErrorText("Must be a valid month", "month");
		status = false;
	}

	if (parseInt(yob.value.trim(), 10) > currentYear) {
		addRed(mob);
		addErrorText("Must be in the past", "year");
		addErrorText("", "day");
		status = false;
	}

	if (status) {
		ageCalculator();
	}
}

function addErrorText(msg, id) {
	errorText.forEach((text) => {
		if (text.classList.contains(id)) {
			text.style.visibility = "visible";
			text.textContent = msg;
		}
	});
}

function addRed(...elem) {
	elem.forEach((elem) => {
		elem.classList.add("error__border");
		elem.previousElementSibling.style.color = "red";
	});
}

function clearErrors() {
	errorText.forEach((text) => {
		text.style.visibility = "hidden";
	});

	document.querySelectorAll(".error__border").forEach((el) => {
		el.classList.remove("error__border");
		el.previousElementSibling.style.color = "";
	});
}
