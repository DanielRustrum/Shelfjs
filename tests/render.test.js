ShelfDev.group("Rendering")
    ShelfDev.observe(
        "Basic", 
        () => {
            Shelf.renderVDOM(
                Shelf.component`<h1>test</h1>`,
                "app"
            )
        }
    )

    ShelfDev.observe(
        "Content Signal", 
        () => {
            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.renderVDOM(
                Shelf.component`<h2>
                    count: ${sig} 
                    <p>hello world!</p>
                    This Doesn't Mutate</h2>`,
                "app2"
            )
        }
    )

    ShelfDev.observe(
        "Attribute Signals", 
        () => {
            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.renderVDOM(
                Shelf.component`<h2 data-signal=${sig}>Another</h2>`,
                "app3"
            )
        }
    )

    ShelfDev.observe(
        "Content Signals Deep", 
        () => {
            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.renderVDOM(
                Shelf.component`<div>
                    <p>counter 2: ${sig}</p>
                </div>
                `,
                "app4"
            )
        }
    )

    ShelfDev.observe(
        "Content Signals Function", 
        () => {
            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.renderVDOM(
                Shelf.component`<div>
                    <p>counter 3: ${[sig, () => {
                        return  Math.random() * 300
                    }]}</p>
                </div>
                `,
                "app5"
            )
        }
    )

    ShelfDev.observe(
        "Content Signals Function in Attributes", 
        () => {
            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.renderVDOM(
                Shelf.component`<div>
                    <div counter=${[sig, () => {
                        return  Math.random() * 300
                    }]}>Stuff here</div>
                </div>
                `,
                "app6"
            )
        }
    )
ShelfDev.endGroup()
ShelfDev.run()
