export const keysPressed: {[key: string]: boolean} = {}

window.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true
})

window.addEventListener('keyup', (event) => {
  keysPressed[event.key] = false
})