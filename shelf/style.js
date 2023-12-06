{
    // Fetch Core Library
    let Core = Shelf.__proto__

    const sheet = (strings, ...value) => {}
    const inline = (strings, ...value) => {}
    const test = () => console.log("Styling")

     // Define Module
     Core.define("style", {
        sheet,
        inline,
        test
    }, {})
}