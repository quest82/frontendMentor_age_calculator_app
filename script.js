const yearOfBirth = parseInt('1984', 10)
const monthOfBirth = parseInt('9', 10)
const dayOfBirth = parseInt('24', 10)

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1 // 1 is added to month of current date to remove Date indexing
const currentDay = currentDate.getDate()







console.log(currentDate);

let ageInYears = currentYear - yearOfBirth
console.log(ageInYears);

let ageInMonths = currentMonth - monthOfBirth 
console.log(ageInMonths);

let ageInDays = currentDay - dayOfBirth
console.log(ageInDays);

if (ageInDays < 0) {
    let previousMonthDays = 
}