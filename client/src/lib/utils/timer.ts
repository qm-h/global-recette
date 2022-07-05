const timerBefore = (action: () => void, timer: number) => {
    setTimeout(() => {
        action()
    }, timer)
}

export default timerBefore
