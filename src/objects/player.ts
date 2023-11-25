import type { Display } from "rot-js"
import {keysPressed} from '../input.ts'
import {colors} from '../colors.ts'

export class Player {
  pos: {x: number, y: number};

  constructor() {
    this.pos = {x: 4, y: 4}
  }

  draw(display: Display) {
    display.draw(this.pos.x, this.pos.y, '175', colors[17], null)
  }

  update(dt: number) {
    if(keysPressed['ArrowLeft']) {
      this.pos.x -= 1
    }
    if(keysPressed['ArrowRight']) {
      this.pos.x += 1
    }
    if(keysPressed['ArrowUp']) {
      this.pos.y -= 1
    }
    if(keysPressed['ArrowDown']) {
      this.pos.y += 1
    }
  }
}