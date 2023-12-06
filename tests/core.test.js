Shelf.init("./shelf")

Shelf.namespace(async () => {
    const style = await Shelf.use("style")
    const html = await Shelf.use("template")
    console.log(style, html)

    let test_temp = html`
        <h1 test>Hello</h1>
        <div>
            sdasdd
            <p test="11">hi</p>
            <div>
                <p>test</p>
                ${() => "static-loaded"}
            </div>
            </div>
        <button [click]=${async () => {
            console.log("clicked")
        }}>Click Me!</button>
        <name:space>sdfsd</name:space>
    `
    
    console.log(test_temp.cloneNode(true))
    document.querySelector("test").append(test_temp)
    
})
