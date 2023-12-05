{
    // Fetch Core Library
    let Core = Shelf.__proto__

    const mount = (root, node) => {}
    const duplicate = (node) => {}
    const event = {
        add: (node, event, handler, options) => {},
        get: (node) => {}
    }

     // Define Module
     Core.define("dom", {
        mount,
        duplicate,
        event
    }, {})
}