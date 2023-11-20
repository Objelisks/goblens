import './style.css'
import html from 'nanohtml'
import {Display} from 'rot-js'
import tilesUrl from '/tiles.png?url'
import {tileMap} from './tiles.ts'

import {Player} from './actors/player'

document.querySelector<HTMLDivElement>('#app')!.appendChild(html`
<div>
  <div id="screen">
  </div>
</div>
`)

const tiles = document.createElement('img')
tiles.src = tilesUrl

const display = new Display({
  layout: 'tile-gl',
  bg: 'black',
  width: 40,
  height: 40,
  tileWidth: 12,
  tileHeight: 12,
  tileColorize: true,
  tileSet: tiles,
  tileMap: tileMap
})
const container = display.getContainer()

if(container) {
  document.querySelector<HTMLDivElement>('#screen')!.appendChild(container)
}

const scene = []
const actors = [new Player()]

let lastTick = Date.now()

const draw = () => {
  const now = Date.now()
  const dt = now - lastTick
  lastTick = now

  // clear
  display.clear()

  // draw scene
  // draw objects
  // draw actors
  actors.forEach(actor => {
    actor.draw(display)
  })

  // update actors
  actors.forEach(actor => {
    actor.update(dt)
  })
  // update world

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)