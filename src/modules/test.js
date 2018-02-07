const addAndTurnToArray = (a, b) => [a, b, a+b]

export default function () {
    let x = addAndTurnToArray(3, 4)
    console.log(...x)
}
