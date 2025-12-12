// Store up date of birth in year, month & day as integers
const yearOfBirth = parseInt("1984", 10);
const monthOfBirth = parseInt("9", 10);
const dayOfBirth = parseInt("24", 10);

// Store up the current date in year, month & day as integers
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // 1 is added to month of current date to account for Date() indexing
const currentDay = currentDate.getDate();

// Initial calculations to get the age of the user in the years, months and days they've been alive e.g 40 Years, 3 Months, 16 Days
// Subtracting the current year, month (number), and day from the that of the date of birth should offer the answer easily
let ageInYears = currentYear - yearOfBirth;
let ageInMonths = currentMonth - monthOfBirth;
let ageInDays = currentDay - dayOfBirth;

// For when the month of the DOB hasn't been reached (DOB is 6 - June but the current year is 3 - March)
// This would give a negative using the initial calculation. To account for that, a year needs to be removed from age in years and the deficit month is removed from a full year in months (12)
// If the date of the birthday hasn't been reached, the initial calculation will yield a negative number for age in days so it taken from the full previous month

if (ageInMonths < 0 && ageInDays < 0) {
	ageInYears = ageInYears - 1;
	ageInMonths = 12 + ageInMonths;
	getDaysWhenNegative();
}

if (ageInDays < 0) {
	getDaysWhenNegative();
}

if (ageInMonths < 0) {
	ageInYears = ageInYears - 1;
	ageInMonths = 12 + ageInMonths;
}

function getDaysWhenNegative() {
	const previousMonthDays = new Date(
		currentYear,
		currentMonth - 1,
		0
	).getDate(); // To get the number of days of the previous month
	ageInDays = previousMonthDays + ageInDays;
	ageInMonths = ageInMonths - 1;
}

console.log("Years", ageInYears);
console.log("Months", ageInMonths);
console.log("Days", ageInDays);
