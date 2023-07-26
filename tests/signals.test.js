ShelfDev.group("Signals")
ShelfDev.observe(
    "Signal with Array",
    () => {
        let signal = Shelf.signal([])

        Shelf.bindToSignal(signal, () => {
            console.log(signal.value)
        })

        setInterval(() => {
            signal.value.push("val")
        }, 1000)

        return signal
    }
)
ShelfDev.endGroup()
