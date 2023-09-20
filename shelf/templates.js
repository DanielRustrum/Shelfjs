{
    // Fetch Core Library
    let Core = Shelf.__proto__

    // Maps
    let reference_handler_map = new Map()
    let event_handler_map = new Map()
    let node_handler_map = new Map()

    const hash_retries = 10
    /** Generates an unique hash for the provide map; based on the hash_size and the value.
     * 
     * @param {*} map - The hash_map being used
     * @param {*} value - the value to hash for
     * @returns a unique hash based on the hash_size and value.
     */
    function generateHash(map, value) {
        let hash = window.crypto.randomUUID(),
            retry_count = hash_retries,
            hash_found = false,
            crypto = window.crypto.randomUUID
            
        while(
            retry_count <= 0 ||
            !hash_found
        ) {
            if(hash in map) hash_found = true;
            else hash = crypto()
            retry_count -= 1
        }
        
        if (hash_retries === 0) 
            return null;
        return hash
    }
    
    /** Maps the template literal and formats it into 2 parsable data types
     * 
     * @param {*} strings - An Array of Strings from the named template literal
     * @param {*} values - An Array of Values from the named template literal
     * @returns [An Array of strings, embedded templates, and reference hashes; a map of referenced functions]
     */
    function mapLiteral(strings, values) {
        let reference_map = new Map(),
            template_array = [],
            index_strings = ""

        values.push("")

        let values = values
            .map(value => {
                if(
                    tr_type in value &&
                    tr_type in reference_handler_map.keys()
                ) {
                    let hash = generateHash(
                        reference_map, 
                        value
                    )

                    reference_map.set(
                        hash, {
                            value,
                            type: tr_type
                        }
                    )

                    return [`!${hash}`]
                }

                if(
                    tr_type in value &&
                    value.tr_type === "template"
                ) {
                    return [value]
                }

                if(
                    Array.isArray(value) &&
                    tr_type in value[0] &&
                    value[0].tr_type === "template"
                ) {
                    let composite = ""

                    for(let template_string in value) {
                        composite += template_string
                    }

                    return [value.length-1, composite]
                }

                return String(value)
            })

        strings.forEach((value, index) => {
            if(typeof values[index] === "string") {
                index_strings += value + values[index]
            } else {
                index_strings += value
                template_array.push(index_strings, values[index])
            }
        })
        
        return [template_array, reference_map]
    }

    /** Parses the template array into a token-value string
     * 
     * **Tokens:** 
     * 
     * #| : number of Inner Elements
     * 
     * #> : Element with length
     * 
     * #! : VDOM hash map reference
     * 
     * #" : start of value string 
     * 
     * #% : start of attr
     * 
     * = : seperation of attr key and value
     * 
     * #[ : Event Bind Start
     * 
     * ----
     * 
     * @param {*} template_array - An Array of strings, values, and reference hashes 
     * @returns token-value string for easy paring later-on 
     */
    function buildTemplateString(template_array) {
        for(let value of template_array) {
            if(typeof value === "string") {
                for(let char in value) {
                    switch(char) {
                        case ">":
                            break
                    }
                }
            }

            if(
                Array.isArray(value) &&
                typeof value[0] === "string"
            ) {} 
            
            if(
                Array.isArray(value) &&
                typeof value[0] === "number"
            ) {} 

        }
    }
    
    function template(strings, ...values) {
        let [template_array, reference_map] = mapLiteral(strings, values)

        return {
            tr_type: "template",
            template_string: buildTemplateString(template_array),
            references: reference_map
        }
    }

    function buildFragment(parse_string, reference_map) {
        
    }

    function mountFragement(root, fragment, method) {
        switch(method) {
            case "replaced":
                root.after(fragment)
                root.remove()
                break
            case "injected":
                root.replaceChildren(fragment)
                break
        }
    }

    function render(
        renderer,
        query,
        method = "replaced"
    ) {
        let root;
        if(typeof query === "string") {
            root = document.querySelectorAll(query)
        } else if(query instanceof NodeList) {
            root = query
        } else {
            root = [query]
        }
        

        if (typeof renderer === "function") {
            for(let node of root) {
                let [dom_fragment, _] = buildFragment(renderer())
                mountFragement(node, dom_fragment, method)
            }  
        } else {
            for(let node of root) {
                let [dom_fragment, _] = buildFragment(renderer)
                mountFragement(node, dom_fragment, method)
            }       
        }

    }

    // Private APIs
    function defineReferences(hook, handler_callback) {
        reference_handler_map.set(hook, handler_callback)
    }
    function defineEvent(hook, handler_callback) {
        event_handler_map.set( hook, handler_callback )
    }
    function defineNode(hook, handler_callback) {
        node_handler_map.set(hook, handler_callback)
    }

    // Define Module
    Core.define("template", {
        render,
        define: template
    }, {
        defineReferences,
        defineEvent,
        defineNode
    })
}