document.querySelector('#dialogueBox').addEventListener('click', e => {

    if (isClicked) {
        return
    }
    console.log(queue)

    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
    isClicked = true
    timer = delay
})

