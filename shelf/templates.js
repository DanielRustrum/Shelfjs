{
    // Fetch Core Library
    let Core = Shelf.__proto__

    // Maps
    let hook_handler_map = new Map()
    let event_handler_map = new Map()
    let node_handler_map = new Map()

    const collapseTemplate = (strings, values) => {
        let current_string = "", 
            new_result = []
        
        for(
            let index = 0; 
            index < values.length; 
            index += 1
        ) {  
            current_string += strings[index]
    
            if(
                hook_handler_map
                    .has(
                        Core.getType(values[index])
                    ) ||
                (
                    Array.isArray(values[index]) && 
                    hook_handler_map
                        .has(
                            Core.getType(values[index])
                        )
                ) ||
                typeof values[index] === 'function' ||
                values[index] instanceof DocumentFragment ||
                values[index] instanceof HTMLElement ||
                values[index] instanceof NodeList
            ) {
                new_result.push(current_string)
                current_string = ""
                new_result.push(values[index])
            } else {
                current_string += values[index]
            }
        }
        
        new_result.push(current_string + strings[strings.length - 1])
        return new_result
    }

    const buildFragment = (template) => {
        let fragment = new DocumentFragment()

        let current_node = fragment
    
        let stack = [],
            attribute = [],
            attributes = [],
            content = []
        
        let last_char = "",
            element = "",
            partial_attribute = "",
            partial_content = ""
        
        
        let in_tag = false,
            in_close_tag = false,
            in_content = false,
            in_attributes = false,
            in_attribute_string = false
        
        stack.push(fragment)
    

        for (const segment of template) {
            if(typeof segment === "string") {
                for(let char of segment) {
                    //* Attrs                
                    if(
                        in_tag && 
                        ["=", " ", ">"].includes(char) &&
                        !in_attribute_string && 
                        in_attributes && 
                        !in_close_tag
                    ) { 
                        if(partial_attribute !== "")
                            attribute.push(partial_attribute);
                        partial_attribute = ""
                    }
                    if(
                        in_tag && 
                        (char === " " || char === ">") &&
                        !in_attribute_string && 
                        in_attributes && 
                        !in_close_tag
                    ){
                        if(attribute.length !== 0)
                            attributes.push(attribute);
                        attribute = []
                    }
    
                    //* Build Strings               
                    if(
                        in_tag && 
                        !in_attributes && 
                        !["/", " ", ">"].includes(char) &&
                        !in_close_tag
                    )
                        element += char;
                    
                    if(
                        in_tag && 
                        in_attributes && 
                        (
                            (!in_attribute_string && !["/", " ", ">", "=", "\"", "'", "\n"].includes(char)) ||
                            (in_attribute_string && !["\"",].includes(char))
                        ) && 
                        !in_close_tag
                    ) 
                        partial_attribute += char;
                    
                    if(in_content && char !== '<') 
                        partial_content += char;
                    
                    //* Start Of Tag
                    if(char === "<") {
                        in_content = false
                        if(partial_content !== "")
                            content.push(partial_content);
                        if(content.length !== 0 && current_node)
                            current_node.append(content);
                        content = []
                        partial_content = ""
                    }
                    
                    //* End of Tag                
                    if(char === ">") {
                        if(in_tag) {
                            if(!in_close_tag) {
                                let node = document.createElement(element);

                                for (const attr of attributes) {
                                    if(attr.length === 0) continue;

                                    if(
                                        attr[0].startsWith("[") &&
                                        attr[0].endsWith("]")
                                    ) {
                                        let event_name = attr[0].slice(1, -1)
                                        if(event_handler_map.has(event_name))
                                            event_handler_map.get(event_name)(node, attr[1]);
                                        else
                                            node.addEventListener(event_name, attr[1]);
                                    } else {
                                        if(attr.length === 2)
                                            node.setAttribute(attr[0], attr[1]);
                                        else
                                            node.setAttribute(attr[0], "");
                                    }
                                }
                                
                                if(last_char !== "/") {
                                    stack.push(current_node)
                                    current_node = node
                                }
    
                            } else {
                                let popped_node = stack.pop()
                                popped_node.append(current_node)
                                current_node = popped_node
                            }
                            
    
                            in_tag = false
                            in_close_tag = false
                            in_attributes = false
    
                            attributes = []
                            element = ""
                        }
                        
                        in_content = true
                    }
                    
                    //* Toggle States                
                    if(in_tag && char === " ") 
                        in_attributes = true;
                    if(char === "<") 
                        in_tag = true;
                    if(last_char === "<" && char === "/") 
                        in_close_tag = true;
                    if(char === "\"" && in_attributes)
                        in_attribute_string = !in_attribute_string;
                    
                    //* Track Char                
                    last_char = char
                }
            }

            if(in_attributes) {
                if(hook_handler_map.has(Core.getType(segment))) {
                    let hook_obj = hook_handler_map.get(Core.getType(segment))
                    if(hook_obj.activation === "insert")
                        partial_attribute += String(hook_obj.callback({
                            value: segment,
                            attribute: attribute.length !== 0? attribute[0]: "",
                            node: current_node
                        }));
                }

                if(
                    typeof segment === 'function' &&
                    Core.getType(segment) === undefined
                ) {
                    attribute.push(segment)
                    partial_attribute = ""
                }

            }

            if(in_content) {
                if(hook_handler_map.has(Core.getType(segment))) {
                    let hook_obj = hook_handler_map.get(Core.getType(segment))
                    if(hook_obj.activation === "insert")
                        partial_content += String(hook_obj.callback({
                            value: segment
                        }));
                }

                if(
                    typeof segment === 'function' &&
                    Core.getType(segment) === undefined
                ) {
                    partial_content += segment()
                }
            }
        }

        return current_node
    }
    
    const template = (strings, ...values) => {
        return buildFragment(collapseTemplate(strings, values))
    }

    // Private APIs
    const defineHook = (hook, handler_callback, activation = "insert") => {
        hook_handler_map.set(hook, {callback: handler_callback, activation})
    }
    const defineEvent = (hook, handler_callback) => {
        event_handler_map.set( hook, handler_callback )
    }
    const defineNode = (hook, handler_callback) => {
        node_handler_map.set(hook, handler_callback)
    }

    // Define Module
    Core.define("template", template, {
        defineHook,
        defineEvent,
        defineNode
    })

    let test_temp = template`
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
}