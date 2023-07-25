ShelfDev.group("Rendering")
    let test_element = document.querySelector("test")
    ShelfDev.observe(
        "Basic", 
        () => {
            test_element.append(document.createElement("app"))
            Shelf.renderVDOM(
                Shelf.template`<h1>test</h1>`,
                document.querySelector("app")
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

            Shelf.renderVDOM(
                Shelf.template`<h2>
                    count: ${sig} 
                    <p>hello world!</p>
                    This Doesn't Mutate
                </h2>`,
                document.querySelector("app2")
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

            Shelf.renderVDOM(
                Shelf.template`<h2 data-signal=${sig}>Another</h2>`,
                document.querySelector("app3")
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

            Shelf.renderVDOM(
                Shelf.template`<div>
                    <p>counter 2: ${sig}</p>
                </div>
                `,
                document.querySelector("app4")
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

            Shelf.renderVDOM(
                Shelf.template`<div>
                    <p>counter 3: ${[sig, () => {
                        return  Math.random() * 300
                    }]}</p>
                </div>
                `,
                document.querySelectorAll("app5")
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

            Shelf.renderVDOM(
                Shelf.template`<div>
                    <div counter=${[sig, () => {
                        return  Math.random() * 300
                    }]}>Stuff here</div>
                </div>
                `,
                document.querySelector("app6")
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
ShelfDev.endGroup()

ShelfDev.group("Function Rendering")
    ShelfDev.observe(
        "Component Function", 
        () => {
            test_element.append(document.createElement("app8"))

            const comp = (props) => {
                let sig = Shelf.signal(0)

                setInterval(() => {
                    sig.value += 1
                }, 1000)

                return Shelf.template`<div>
                    <div counter=${[sig, () => {
                        return  Math.random() * 300
                    }]}>Stuff here</div>
                </div>
                `
            }
            
            Shelf.render(comp, "app8")
        }
    )
ShelfDev.endGroup()

ShelfDev.run()