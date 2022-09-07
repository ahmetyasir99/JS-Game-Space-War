const space = document.querySelector('#space')
const enemy = document.createElement('div')
const spaceWidth = 400
const spaceHeight = 500
const enemyWidth = 40
const enemyHeight = 40
const userWidth = 40
const userHeight = 40
const enemyAmount = 10
let enemyLeft = 0
const spaceBorder = 1
let goRight = true
let fire
let fires = []

space.style.border = "1px solid black"
space.style.marginLeft = "100px"

const user = document.createElement('div')
user.classList.add('user')
space.appendChild(user)
user.style.left = spaceWidth / 2 + space.getBoundingClientRect().x - 20 + 'px'
user.style.top = spaceHeight + space.getBoundingClientRect().y - 45 + 'px'

document.addEventListener('keydown', userMove)


for (let i = 0; i < enemyAmount; i++) {
    const createdEnemy = document.createElement('div')
    createdEnemy.classList.add('enemy')
    createdEnemy.style.width = enemyWidth + 'px'
    createdEnemy.style.height = enemyHeight + 'px'
    createdEnemy.style.left = space.getBoundingClientRect().x + i * 42 + 'px'
    space.appendChild(createdEnemy)
}

function userMove(e) {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowLeft':
            if (user.getBoundingClientRect().x - space.getBoundingClientRect().x >= 1) { // 1 yerine border
                user.style.left = user.getBoundingClientRect().x - 10 + 'px'
            }
            break;
        case 'ArrowRight':
            if (user.getBoundingClientRect().x - space.getBoundingClientRect().x <= spaceWidth - 1 - userWidth) { // 1 yerine border
                user.style.left = user.getBoundingClientRect().x + 10 + 'px'
            }
            break;
        case 'ArrowUp':
            // fireları random yapıp ekranda birden fazla fire olması için
            fires.push(document.createElement('div'))
            fires[fires.length - 1].classList.add('fire')
            space.appendChild(fires[fires.length - 1])
            fires[fires.length - 1].style.left = user.getBoundingClientRect().left + 'px'
            fires[fires.length - 1].style.top = user.getBoundingClientRect().top + 'px'
    }
    if (enemyTopRight[0] > userTopLeft[0] && enemyTopLeft[0] < userTopRight[0] && userTopLeft[1] < enemyBottomLeft[1]) {
        clearInterval(newInterval)
        document.removeEventListener('keydown', userMove)
    }
}




const allBlocks = Array.from(document.querySelectorAll('.enemy'))
for (let i = 0; i < allBlocks.length; i++) {
    allBlocks[i].direction = true
}

let enemyTopLeft = [0, 0]
let enemyBottomLeft = [0, 0]
let enemyTopRight = [0, 0]


let userTopLeft = [0, 0]
let userTopRight = [0, 0]


const newInterval = setInterval(() => {

    for (let i = 0; i < allBlocks.length; i++) {

        enemyTopLeft[0] = allBlocks[i].getBoundingClientRect().left
        enemyTopLeft[1] = allBlocks[i].getBoundingClientRect().top
        enemyBottomLeft[0] = allBlocks[i].getBoundingClientRect().left
        enemyBottomLeft[1] = allBlocks[i].getBoundingClientRect().top + enemyHeight
        enemyTopRight[0] = allBlocks[i].getBoundingClientRect().left + enemyWidth
        enemyTopRight[1] = allBlocks[i].getBoundingClientRect().top


        userTopLeft[0] = user.getBoundingClientRect().left
        userTopLeft[1] = user.getBoundingClientRect().top
        userTopRight[0] = user.getBoundingClientRect().left + userWidth
        userTopRight[1] = user.getBoundingClientRect().top

        if (fires[0]) {
            for (let k = 0; k < fires.length; k++) {
                if (fires[k].getBoundingClientRect().top < space.getBoundingClientRect().top) {
                    fires[k].remove()
                }
                if (fires[k].getBoundingClientRect().top < enemyBottomLeft[1] && fires[k].getBoundingClientRect().top > enemyTopLeft[1] && fires[k].getBoundingClientRect().left > enemyTopLeft[0] && fires[k].getBoundingClientRect().left < enemyTopRight[0]) {
                    fires[k].remove()
                    fires.splice(k, 1)//// kalkabilir bi anlamı yok
                    allBlocks[i].remove()
                } else {
                    fires[k].style.top = fires[k].getBoundingClientRect().top - 1 + 'px'
                }
            }
        }

        if (enemyTopRight[0] > userTopLeft[0] && enemyTopLeft[0] < userTopRight[0] && userTopLeft[1] < enemyBottomLeft[1]) {
            clearInterval(newInterval)
            document.removeEventListener('keydown', userMove)
        }
        if (allBlocks[i].direction == true) {
            if (allBlocks[i].getBoundingClientRect().x - space.getBoundingClientRect().x + 42 >= spaceWidth) {
                console.log('yön değiştir');
                allBlocks[i].direction = false
                allBlocks[i].style.top = allBlocks[i].getBoundingClientRect().top + 45 + 'px'
            } else {
                allBlocks[i].style.left = allBlocks[i].getBoundingClientRect().x + 2 + 'px'
            }
        }
        else {
            if (allBlocks[i].getBoundingClientRect().x - space.getBoundingClientRect().x <= 0) {
                console.log('yön değiştir');
                allBlocks[i].direction = true
                allBlocks[i].style.top = allBlocks[i].getBoundingClientRect().top + 45 + 'px'
            } else {
                allBlocks[i].style.left = allBlocks[i].getBoundingClientRect().x - 2 + 'px'
            }
        }
    }
}, 10)
