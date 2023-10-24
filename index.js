const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// limitazione fps per allineare
let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps

const collisionMap = []
// 70 tiles dimensione mappa 
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, i + 70))
}

const battleZonesMap = []
// 70 tiles dimensione mappa 
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70))
}



const boundaries = []
const offset = {
    x: -350,
    y: -660
}
const speed = 6

collisionMap.forEach((row, rIndex) => {
    row.forEach((symbol, sIndex) => {
        if (symbol === 1025)
            boundaries.push(new Boundary({
                position: {
                    x: sIndex * Boundary.width + offset.x,
                    y: rIndex * Boundary.height + offset.y
                }
            }))
    })
})

const battlezones = []

battleZonesMap.forEach((row, rIndex) => {
    row.forEach((symbol, sIndex) => {
        if (symbol === 1025)
            battlezones.push(new Boundary({
                position: {
                    x: sIndex * Boundary.width + offset.x,
                    y: rIndex * Boundary.height + offset.y
                }
            }))
    })
})

const mappaVillaggio = new Image()
mappaVillaggio.src = './Images/mappaVillaggio.png'

const foregroundVillaggio = new Image()
foregroundVillaggio.src = './Images/mappaForeground.png'

const playerUpImage = new Image()
playerUpImage.src = './Images/playerUp.png'
const playerLeftImage = new Image()
playerLeftImage.src = './Images/playerLeft.png'
const playerRightImage = new Image()
playerRightImage.src = './Images/playerRight.png'
const playerDownImage = new Image()
playerDownImage.src = './Images/playerDown.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 20
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mappaVillaggio
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundVillaggio
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground, ...battlezones]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)

}

const battle = {
    initiated: false
}

function animate() {
    const animationId = window.requestAnimationFrame(animate)

    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < msPerFrame) return

    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime

    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()

    })
    battlezones.forEach(battlezone => {
        battlezone.draw()
    })
    player.draw()
    foreground.draw()

    let moving = true
    player.animate = false

    if (battle.initiated) return

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battlezones.length; i++) {
            const battlezone = battlezones[i]
            const overlappingArea =
                (Math.min(player.position.x + player.width,
                    battlezone.position.x + battlezone.width) -
                    Math.max(player.position.x,
                        battlezone.position.x)) *
                (Math.min(player.position.y + player.height,
                    battlezone.position.y + battlezone.height) -
                    Math.max(player.position.y, battlezone.position.y))
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: battlezone
            }) &&
                overlappingArea > player.width * player.height / 2 &&
                // frequenza battaglie nelle zone di fight
                Math.random() < 0.01
            ) {
                // deactivate loop
                window.cancelAnimationFrame('animationId')

                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                initBattle()
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                })
                            }
                        })

                        // animation loop



                    }
                })
                break
            }
        }
    }



    if (keys.w.pressed && lastkey === 'w') {
        player.animate = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + speed
                    }
                }
            })) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(movable => { movable.position.y += speed })
    }
    else if (keys.a.pressed && lastkey === 'a') {
        player.animate = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + speed,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
                movable.position.x += speed
            })
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - speed
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => { movable.position.y -= speed })
    }
    else if (keys.d.pressed && lastkey === 'd') {
        player.animate = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - speed,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => { movable.position.x -= speed })
    }


}

// animate()


let lastkey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = "w"
            break
        case 'a':
            keys.a.pressed = true
            lastkey = "a"
            break
        case 's':
            keys.s.pressed = true
            lastkey = "s"
            break
        case 'd':
            keys.d.pressed = true
            lastkey = "d"
            break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

    }
})

let clicked = false
addEventListener('keydown', () => {
    if (!clicked) {
        audio.Map.play()
        clicked = true
    }
})