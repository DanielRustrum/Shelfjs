{
    var Shelf = {}

    Shelf.__proto__ = {
        hidden_modules: new Map(),
        public_modules: new Map(),
        waitlist: new Map()
    }

    //* Manage Cross Module Communication
    const module_define = (
        module_name,
        public_api = {},
        hidden_api = {}
    ) => {
        if(Shelf.__proto__.public_modules.has(module_name)) return;

        Shelf.__proto__.public_modules.set(module_name, public_api)
        Shelf.__proto__.hidden_modules.set(module_name, hidden_api)

        if(Shelf.__proto__.waitlist.has(module_name))
                Shelf.__proto__.waitlist.get(module_name)();
    }

    const module_request = (module_name, method) => {
        if(!Shelf.__proto__.hidden_modules.has(module_name))
            throw new ReferenceError("Module Not Declared");
        if(!Shelf.__proto__.hidden_modules[module_name].has(method))
            throw new ReferenceError("Method Not Declared");
        return Shelf.__proto__.hidden_modules.get(module_name)[method] 
    }

    const on_module_load = (module_name, callback) => {
        if(!Shelf.__proto__.hidden_modules.has(module_name))
            if(Shelf.__proto__.waitlist.has(module_name))
                Shelf.__proto__.waitlist.get(module_name).push(callback);
            else
                Shelf.__proto__.waitlist.set(module_name, [callback]);
        else
            callback();
    }

    //* Universal Module Object Identitification
    const defineShelfType = (object, type) => object.__proto__.shelf_type = type
    const getShelfType = (object) => object.__proto__.shelf_type 
    const checkShelfType = (object, type) => object.__proto__.shelf_type === type

    //* Dynamically Loaded Module Files
    let root_node = null
    let root_dir = "./shelf"

    const init = (library_directory) => {
        root_node = document.querySelector("script[shelf-core]")
        root_dir = library_directory
    }

    const useModule = (module_name) => {
        if(root_node === null)
            throw new ReferenceError("Either Init hasn't been called or the core script tag hasn't been added to html body tag.");
        
        if(Shelf.__proto__.public_modules.has(module_name)) 
            return Shelf.__proto__.public_modules.get(module_name);

        return new Promise((resolve, reject) => {
            let module_script = document.createElement("script")
            module_script.setAttribute("shelf-module", "")
            module_script.setAttribute("src", `${root_dir}/${module_name}.js`)
            module_script.setAttribute("type", `text/javascript`)

            module_script.addEventListener('load', () => {
                resolve(Shelf.__proto__.public_modules.get(module_name))
            });
            module_script.addEventListener('error', reject);
            
            root_node.after(module_script)
        })
    }

    const namespace = async_callback => {
        (async () => {
            await async_callback();
        })();
    }


    //* Core API Definitions
    Shelf.__proto__.define = module_define
    Shelf.__proto__.request = module_request
    Shelf.__proto__.on_load = on_module_load
    Shelf.__proto__.defineType = defineShelfType
    Shelf.__proto__.getType = getShelfType
    Shelf.__proto__.checkType = checkShelfType

    Shelf.init = init
    Shelf.use = useModule
    Shelf.namespace = namespace
}

console.log("Core Object:", Shelf)
