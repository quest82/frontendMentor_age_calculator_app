// DOM Queries

const form = document.querySelector(".ageCalculator__form");
const yearOutput = document.querySelector(".yearOutput span");
const monthOutput = document.querySelector(".monthOutput span");
const dayOutput = document.querySelector(".dayOutput span");

// Store up the current date in year, month & day as integers
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // 1 is added to month of current date to account for Date() indexing
const currentDay = currentDate.getDate();

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Store up date of birth in year, month & day as integers
	const yearOfBirth = parseInt(form.year.value, 10);
	const monthOfBirth = parseInt(form.month.value, 10);
	const dayOfBirth = parseInt(form.day.value, 10);

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

	console.log("year", ageInYears);
	console.log("month", ageInMonths);
	console.log("day", ageInDays);

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

	form.reset();
});
