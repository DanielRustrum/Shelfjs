ShelfDev.group("Plain HTML")
    ShelfDev.observe(
        "Single Line", 
        () => Shelf.component`<div>test</div>`
    )
    
    ShelfDev.observe(
        "Multi Line", 
        () => Shelf.component`
            <h1>Hello World!</h1>
            <div>test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => Shelf.component`<div><div>test</div></div>`
    )

    ShelfDev.observe(
        "Multi Line Deep", 
        () => Shelf.component`
            <h1>Hello World!</h1>
            <div>test</div>
            <div>
                <div>
                    <div>
                    sadasd
                    </div>
                </div>
            </div>
        `
    )
    
    ShelfDev.observe(
        "Multi Line Deep Interlaced", 
        () => Shelf.component`
            <h1>Hello World!</h1>
            <div>test</div>
            <div>
                asda
                <div>
                    <div>
                    sadasd
                    </div>
                </div>
            </div>
        `
    )

    ShelfDev.observe(
        "Single Line Attributes", 
        () => Shelf.component`<div attr attr="2">test</div>`
    )

    ShelfDev.observe(
        "Single Line Attributes with Spaces", 
        () => Shelf.component`<div attr attr2="hello world">test</div>`
    )

    ShelfDev.observe(
        "Multi Line Attributes", 
        () => Shelf.component`
            <h1>Hello World!</h1>
            <div attr attr="2">test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Attributes Deep", 
        () => Shelf.component`<div attr1><div><div attr2="sdfsdf">test</div></div></div>`
    )

ShelfDev.endGroup()

ShelfDev.group("Injected HTML")
    ShelfDev.observe(
        "Single Line", 
        () => Shelf.component`<div>${true}</div>`
    )

    ShelfDev.observe(
        "Multi Line", 
        () => Shelf.component`
            <h1>Hello ${"World"}!</h1>
            <div>test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => Shelf.component`<div><div>${"<p>Fantastic</p>"}</div></div>`
    )

    ShelfDev.observe(
        "Single Line Attributes", 
        () => Shelf.component`<div attr attr="${"as attr"}">test</div>`
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Signals")
    ShelfDev.observe(
        "Single Line", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.component`<div>${sig}</div>`
        }
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.component`<div><div>before${sig}after</div></div>`
        }
    )

    ShelfDev.observe(
        "Single Line Deep Multiple", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.component`<div><div>${sig}${sig}${sig}${sig}</div>${sig}${sig}</div>`
        }
    )
    ShelfDev.observe(
        "Single Line In Attr", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.component`<div attr=${sig}>Hello World</div>`
        }
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Embedded Templates")

ShelfDev.endGroup()

ShelfDev.group("Templates With Events")
ShelfDev.endGroup()

ShelfDev.group("Rendering")
    ShelfDev.observe(
        "Basic", 
        () => {
            Shelf.render(
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

            Shelf.render(
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

            Shelf.render(
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

            Shelf.render(
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

            Shelf.render(
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

            Shelf.render(
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