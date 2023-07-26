ShelfDev.group("Signals")
ShelfDev.observe(
    "Signal with Array",
    () => {
        let signal = Shelf.signal([])

        Shelf.bindToSignal(signal, () => {
            console.log("executed")
        })

        
        setInterval(() => {
        }, 1000)

        setTimeout(() => {
            for(let index of signal.value) {
                console.log(index)
            }
        }, 10000)

        return signal
    }
)
ShelfDev.endGroup()
