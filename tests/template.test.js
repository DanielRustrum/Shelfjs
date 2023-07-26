ShelfDev.group("Plain HTML")
    ShelfDev.observe(
        "Single Line", 
        () => Shelf.template`<div>test</div>`
    )
    
    ShelfDev.observe(
        "Multi Line", 
        () => Shelf.template`
            <h1>Hello World!</h1>
            <div>test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => Shelf.template`<div><div>test</div></div>`
    )

    ShelfDev.observe(
        "Multi Line Deep", 
        () => Shelf.template`
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
        () => Shelf.template`
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
        () => Shelf.template`<div attr attr="2">test</div>`
    )

    ShelfDev.observe(
        "Single Line Attributes with Spaces", 
        () => Shelf.template`<div attr attr2="hello world">test</div>`
    )

    ShelfDev.observe(
        "Multi Line Attributes", 
        () => Shelf.template`
            <h1>Hello World!</h1>
            <div attr attr="2">test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Attributes Deep", 
        () => Shelf.template`<div attr1><div><div attr2="sdfsdf">test</div></div></div>`
    )

ShelfDev.endGroup()

ShelfDev.group("Injected HTML")
    ShelfDev.observe(
        "Single Line", 
        () => Shelf.template`<div>${true}</div>`
    )

    ShelfDev.observe(
        "Multi Line", 
        () => Shelf.template`
            <h1>Hello ${"World"}!</h1>
            <div>test</div>
        `
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => Shelf.template`<div><div>${"<p>Fantastic</p>"}</div></div>`
    )

    ShelfDev.observe(
        "Single Line Attributes", 
        () => Shelf.template`<div attr attr="${"as attr"}">test</div>`
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Signals")
    ShelfDev.observe(
        "Single Line", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.template`<div>${sig}</div>`
        }
    )

    ShelfDev.observe(
        "Single Line Deep", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.template`<div><div>before${sig}after</div></div>`
        }
    )

    ShelfDev.observe(
        "Single Line Deep Multiple", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.template`<div><div>${sig}${sig}${sig}${sig}</div>${sig}${sig}</div>`
        }
    )
    ShelfDev.observe(
        "Single Line In Attr", 
        () => {
            let sig = Shelf.signal(0)
            return Shelf.template`<div attr=${sig}>Hello World</div>`
        }
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Embedded Templates")
    ShelfDev.observe(
        "Basic Event Listener",
        () => {
            let embed = Shelf.template`<p>Hello!</p>`
            return Shelf.template`<div>${embed}</div>`
        }
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Events")
    ShelfDev.observe(
        "Basic TT (Template with Template)",
        () => {
            return Shelf.template`<button [onclick]=${() => {console.log("clicked")}}>This is a button</button>`
        }
    )
ShelfDev.endGroup()

ShelfDev.group("Templates With Components")
    // ShelfDev.observe(
    //     "Basic Component",
    //     () => {
    //         let component = () => {
    //             return shelf.template`<p>Hello World!!!</p>`
    //         }
            
    //         return Shelf.template`<div comp>${component}</div>`
    //     }
    // )
ShelfDev.endGroup()

