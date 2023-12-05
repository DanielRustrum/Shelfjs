{
    var Shelf = {}

    Shelf.__proto__ = {
        imported: [],
        modules: {},
        hidden_modules: [],
        waitlist: {}
    }

    // Manage Cross Module Communication
    const module_define = (
        module_name,
        public_api = {},
        hidden_api = {}
    ) => {
        Shelf[module_name] = public_api
        Shelf.__proto__.imported.push(module_name)
        Shelf.__proto__.modules[module_name] = hidden_api
    }

    const module_request = (module_name, method) => {
        if(!Shelf.__proto__.imported.includes(module_name))
            throw new ReferenceError("Module Not Declared");
        if(!(method in Shelf.__proto__.modules[module_name]))
            throw new ReferenceError("Method Not Declared");
        return Shelf.__proto__.modules[module_name][method] 
    }

    const on_module_load = (module_name, callback) => {
        if(!Shelf.__proto__.imported.includes(module_name))
            if(Shelf.__proto__.waitlist.has(module_name))
                Shelf.__proto__.waitlist[module_name].push(callback);
            else
                Shelf.__proto__.waitlist[module_name] = [callback];
        else
            callback();
    }

    const defineShelfType = (object, type) => object.__proto__.shelf_type = type
    const getShelfType = (object) => object.__proto__.shelf_type 
    const checkShelfType = (object, type) => object.__proto__.shelf_type === type


    Shelf.__proto__.define = module_define
    Shelf.__proto__.request = module_request
    Shelf.__proto__.on_load = on_module_load
    Shelf.__proto__.defineType = defineShelfType
    Shelf.__proto__.getType = getShelfType
    Shelf.__proto__.checkType = checkShelfType
}

console.log(Shelf)
