import { Display } from "rot-js"
import { colors } from "./colors"
import { MAP_WIDTH } from "./constants"
import { objectMap } from "./objects/objectMap"

export class Area {
  objects = []
  tiles:{char:string, color:string}[] = []

  // loads a playscii .psci json file
  static loadTiles(data:any) {
    const frame = data.frames[0]
    const area = new Area()
    //area.objects = frame.layers.find('objects')
    area.tiles = frame.layers
      .find((layer:{name:string}) => layer.name === 'tiles')?.tiles
      .map(tile => ({char: tile.char, color: colors[tile.fg-1]}))
    
    return area
  }

  static loadObjects(data:any) {
    const objects = []
    const frame = data.frames[0]
    frame.layers
      .find((layer:{name:string}) => layer.name === 'tiles')?.tiles
      .forEach(tile => {
        const ObjClass:any = objectMap[tile.char]
        if(ObjClass) {
          objects.push(new ObjClass(tile))
        }
      })
    return objects
  }

  draw(display:Display) {
    this.tiles.forEach((tile, i) => {
      const x = i%MAP_WIDTH
      const y = Math.floor(i/MAP_WIDTH)
      display.draw(x, y, tile.char, tile.color, null)
    })
  }
}