function calcLevel(exp) {
  if (exp < calcExp(2)) return 1
  if (exp > 2450250) return 100
  return Math.floor(exp / Math.sqrt(exp * 250))
}

function calcExp(level) {
  level = level
  return 250 * (level * level)
}

function calcExpTNL(exp) {
  return calcExp(calcLevel(exp) + 1) - exp
}

module.exports = {
  calcLevel: calcLevel,
  calcExp: calcExp,
  calcExpTNL: calcExpTNL
}