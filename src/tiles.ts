import { MAP_HEIGHT, MAP_WIDTH, TILES_HEIGHT, TILES_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "./constants"

export const tileMap: {[key: string]: [number, number]} = (() => {
  const map:{[key: number]: [number, number]} = {}
  let i = 0;
  for(let y = 0; y<TILES_HEIGHT; y++) {
    for(let x = 0; x<TILES_WIDTH; x++) {
      map[i] = [x*TILE_WIDTH, y*TILE_HEIGHT]
      i++;
    }
  }
  return map
})()