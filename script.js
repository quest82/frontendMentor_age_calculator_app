const yearOfBirth = parseInt("1984", 10);
const monthOfBirth = parseInt("9", 10);
const dayOfBirth = parseInt("24", 10);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // 1 is added to month of current date to remove Date indexing
const currentDay = currentDate.getDate();

let ageInYears = currentYear - yearOfBirth;
let ageInMonths = currentMonth - monthOfBirth;
let ageInDays = currentDay - dayOfBirth;

if (ageInMonths < 0 && ageInDays < 0) {
	ageInYears = ageInYears - 1;
	ageInMonths = 12 + currentMonth - monthOfBirth;
	const previousMonthDays = new Date(
		currentYear,
		currentMonth - 1,
		0
	).getDate(); // To get the number of days of the previous month
	ageInDays = previousMonthDays + ageInDays;
	ageInMonths = ageInMonths - 1;
}

if (ageInDays < 0) {
	const previousMonthDays = new Date(
		currentYear,
		currentMonth - 1,
		0
	).getDate(); // To get the number of days of the previous month
	ageInDays = previousMonthDays + ageInDays;
	ageInMonths = ageInMonths - 1;
}

if (ageInMonths < 0) {
	ageInYears = ageInYears - 1;
	ageInMonths = 12 + currentMonth - monthOfBirth;
}

console.log("Years", ageInYears);
console.log("Months", ageInMonths);
console.log("Days", ageInDays);
