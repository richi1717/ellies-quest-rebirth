var tmpl = require('../src/template.js')
var hasBeenKilled = 0
function renderMagicMenu(monster, character) {
  $('span.battle-menu-turn + span.menu-attack').remove()
  $('span.battle-menu-turn + span.menu-magic').remove()
  length = $('section.enemy-sprites').length
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

  var html = tmpl.magicMenu({
    monster: monsters,
    character: character
  })
  return html
  }

  module.exports = {
    renderMagicMenu: renderMagicMenu
  }