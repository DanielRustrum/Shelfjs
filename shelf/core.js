{
    globalThis.Shelf = {}

    Shelf.__proto__ = {
        imported: [],
        modules: {},
        hidden_modules: []
    }

    // Manage Cross Module Communication
    function define(
        module_name,
        public_api = {},
        hidden_api = {}
    ) {
        Shelf[module_name] = public_api
        Shelf.__proto__.imported.push(module_name)
        Shelf.__proto__.modules[module_name] = hidden_api
    }
    Shelf.__proto__.define = define

    function request(module_name, method) {
        if(!Shelf.__proto__.imported.includes(module_name))
            throw new ReferenceError("Module Not Declared");
        if(!(method in Shelf.__proto__.modules[module_name]))
            throw new ReferenceError("Method Not Declared");
        return Shelf.__proto__.modules[module_name][method] 
    }
    Shelf.__proto__.request = request
}

console.log(Shelf)
