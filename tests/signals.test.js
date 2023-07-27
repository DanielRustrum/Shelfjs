ShelfDev.group("Signals")
    ShelfDev.observe(
        "Signal with Array",
        () => {
            // let signal = Shelf.signal([])

            // Shelf.bindToSignal(signal, (mutation, props, args) => {
            //     console.log(`executed: ${mutation} ${props} ${args}`)
            // })

            
            // setInterval(() => {
            //     signal.value.push(Math.random() * 300)
            // }, 1000)

            // setTimeout(() => {
            //     for(let index of signal.value) {
            //         console.log(index)
            //     }
            // }, 10000)

            // return signal
        }
    )

    ShelfDev.observe(
        "Signal with Objects",
        () => {
            // let signal = Shelf.signal({})

            // Shelf.bindToSignal(signal, ( props, value, mutation) => {
            //     console.log(`executed: ${mutation} ${props} ${value}`)
            // })

            
            // setInterval(() => {
            //     signal.value["test"] = Math.random() * 300
            // }, 1000)

            // setTimeout(() => {
            //     console.log(signal.value.test)
            // }, 10000)

            // return signal
        }
    )
ShelfDev.endGroup()
