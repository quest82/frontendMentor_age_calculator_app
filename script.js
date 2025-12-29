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

	yearOutput.textContent = ageInYears;
	monthOutput.textContent = ageInMonths;
	dayOutput.textContent = ageInDays;

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
	const inputs = [form.day, form.month, form.year];
	let dateInput = new Date(
		form.year.value,
		form.month.value,
		form.day.value
	).getTime();

	let status = true;

	inputs.forEach((input) => {
		// // 5. Ensure date inputted is valid
		const monthDays = {
			January: 31,
			February: 28,
			March: 31,
			April: 30,
			May: 31,
			June: 30,
			July: 31,
			August: 31,
			September: 30,
			October: 31,
			November: 30,
			December: 31,
		};

		let monthDaysArray = Object.entries(monthDays);
		let monthOfBirthIndexed = parseInt(form.month.value.trim(), 10) - 1;
		if (
			parseInt(form.day.value.trim(), 10) >
			monthDaysArray[monthOfBirthIndexed][1]
		) {
			addRed(input);
			addErrorText("Must be a valid date", "day");
			status = false;
		}


		// Empty form
		if (!input.value.trim()) {
			addRed(input);
			errorText.forEach((text) => {
				text.style.visibility = "visible";
				text.textContent = "This field is required";
			});
			status = false;
		}

		// Future date
		if (currentDate.getTime() < dateInput) {
			addRed(input);
			addErrorText("Must be in the past", "year");
			status = false;
		}

		// Invalid day input
		if (form.day.value > 31) {
			addRed(input);
			addErrorText("Must be a valid day", "day");
			status = false;
		}

		// Invlid month input
		if (form.month.value > 12) {
			addRed(input);
			addErrorText("Must be a valid month", "month");
			status = false;
		}


		if (status === true) {
			ageCalculator();
		}
	});
}

function addErrorText(msg, id) {
	errorText.forEach((text) => {
		if (text.classList.contains(id)) {
			text.style.visibility = "visible";
			text.textContent = msg;
		}
	});
}

function addRed(elem) {
	elem.classList.add("error__border");
	elem.previousElementSibling.style.color = "red";
}
