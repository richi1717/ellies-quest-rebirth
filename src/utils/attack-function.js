var tmpl = require('../src/template.js')
var hasBeenKilled = 0

function renderAttackMenu(monster, character) {
  $('span.battle-menu-turn + span.menu-attack').remove()
  console.log('attack')
  length = $('section.enemy-sprites').length
  console.log(length)
  i = 0
  monsters = []
  console.log(i, monsters)
  console.log(hasBeenKilled)

  while (i < length) {
    i++
    enemy = (i + hasBeenKilled)
    nameOf = $('section.enemy' + enemy).data('nameOf')
    console.log(nameOf)
    target = 'enemy' + enemy
    monsters.push({ name: nameOf, target: target })
  }
  var html = tmpl.attackMenu({
    monster: monsters,
    character: character
  })
  return html
}

module.exports = {
  renderAttackMenu: renderAttackMenu
}