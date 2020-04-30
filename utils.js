const isIncreases = value => value.charAt(0) !== '-'
const getEarnings = (volume, average, currentValue) =>
    (volume * currentValue) - (volume * average)

export { isIncreases, getEarnings }