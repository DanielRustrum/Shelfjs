ShelfDev.group("Rendering")
    let test_element = document.querySelector("test")
    ShelfDev.observe(
        "Basic", 
        () => {
            test_element.append(document.createElement("app"))
            Shelf.render(
                Shelf.template`<h1>test</h1>`,
                "app"
            )
        }
    )

    ShelfDev.observe(
        "Content Signal", 
        () => {
            test_element.append(document.createElement("app2"))

            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.render(
                Shelf.template`<h2>
                    count: ${sig} 
                    <p>hello world!</p>
                    This Doesn't Mutate
                </h2>`,
                "app2"
            )
        }
    )

    ShelfDev.observe(
        "Attribute Signals", 
        () => {
            test_element.append(document.createElement("app3"))

            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.render(
                Shelf.template`<h2 data-signal=${sig}>Another</h2>`,
                "app3"
            )
        }
    )

    ShelfDev.observe(
        "Content Signals Deep", 
        () => {
            test_element.append(document.createElement("app4"))

            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.render(
                Shelf.template`<div>
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
            test_element.append(document.createElement("app5"))

            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.render(
                Shelf.template`<div>
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
            test_element.append(document.createElement("app6"))

            let sig = Shelf.signal(0)

            setInterval(() => {
                sig.value += 1
            }, 1000)

            Shelf.render(
                Shelf.template`<div>
                    <div counter=${[sig, () => {
                        return  Math.random() * 300
                    }]}>Stuff here</div>
                </div>
                `,
                "app6"
            )
        }
    )

    ShelfDev.observe(
        "Basic with render function", 
        () => {
            test_element.append(document.createElement("app7"))

            Shelf.render(
                Shelf.template`<h1>test</h1>`,
                "app7"
            )
        }
    )

    ShelfDev.observe(
        "Basic TT (Template with Template)",
        () => {
            test_element.append(document.createElement("app9"))

            let embed = Shelf.template`<p>Hello!</p>`
            let template = Shelf.template`<div super>${embed}</div>`
            Shelf.render(template, "app9")
        }
    )

    ShelfDev.observe(
        "Event Listener with Signals",
        () => {
            test_element.append(document.createElement("app10"))

            let signal = Shelf.signal(0)
            let temp = Shelf.template`
                <p>button has been clicked: ${signal}</p>
                <button 
                    [click]=${() => signal.value += 1}
                >
                    Click this button
                </button>
            `

            Shelf.render(temp, "app10")

        }
    )

    ShelfDev.observe(
        "Template List",
        () => {
            test_element.append(document.createElement("app11"))

            let embed = []
            for(let index of 
                Array(
                    Math.floor(Math.random() * 20)
                ).keys()
            ) {
                embed.push(Shelf.template`<li>${index}</li>`)
            }
            
            let temp = Shelf.template`<ul>${embed}</ul>`

            Shelf.render(temp, "app11")
        }
    )
ShelfDev.endGroup()

ShelfDev.group("Component Rendering")
ShelfDev.endGroup()

ShelfDev.run()