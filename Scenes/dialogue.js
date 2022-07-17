document.querySelector('#dialogueBox').addEventListener('click', e => {
    console.log(e.currentTarget)
    console.log(isClicked)

    if (isClicked) {
        return
    }
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
    isClicked = true
    timer = delay
})

