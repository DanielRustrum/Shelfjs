let Shelf = {}
{
    Shelf.__proto__ = {
        imported: [],
        modules: {}
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
        if(!(module_name in Shelf.__proto__.imported))
            return new ReferenceError("Module Not Declared");
        return (
            Shelf.__proto__.modules[module_name][method]?? 
            new ReferenceError("Module Not Declared")
        );
    }
    Shelf.__proto__.request = request
}

console.log(Shelf)
