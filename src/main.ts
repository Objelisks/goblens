import './style.css'
import html from 'nanohtml'
import {Display} from 'rot-js'
import tilesUrl from '/tiles.png?url'
import {tileMap} from './tiles.ts'
import area1 from '/new1.psci?url'

import {Player} from './objects/player.ts'
import { Area } from './area.ts'
import { objectMap } from './objects/objectMap.ts'

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
  width: 20,
  height: 20,
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


let area:Area
const objects:{draw:(display:Display)=>void, update:(dt:number)=>void}[] = []

fetch('/new1.psci').then(res => res.json()).then(data => {
  area = Area.loadTiles(data)
  objects.splice(0, 0, ...Area.loadObjects(data))
})


let lastTick = Date.now()

const draw = () => {
  const now = Date.now()
  const dt = now - lastTick
  lastTick = now

  // clear
  display.clear()

  // draw scene
  if(area) {
    area.draw(display)
  }
  // draw objects
  objects.forEach(object => {
    object.draw(display)
  })

  // update objects
  objects.forEach(object => {
    object.update(dt)
  })
  // update world

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)