import { compose } from 'redux'

const string = "abc cde efg"

function removeSpaces(string) {
    return string.split(" ").join("")
}

function doubleString(string) {
    return string.repeat(2)
}

function toUpperCase(string) {
    return string.toUpperCase()
}

// console.log(toUpperCase(doubleString(removeSpaces(string))));

const composeFunc = compose(removeSpaces, doubleString, toUpperCase)
console.log(composeFunc(string));