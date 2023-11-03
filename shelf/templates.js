{
    // Fetch Core Library
    let Core = Shelf.__proto__

    // Maps
    let reference_handler_map = new Map()
    let event_handler_map = new Map()
    let node_handler_map = new Map()

    function collapseTemplate(strings, values) {
        let current_string = "", 
            new_result = []
        
        for(
            let index = 0; 
            index < values.length; 
            index += 1
        ) {  
            current_string += strings[index]
    
            if(
                values[index].render_type === "signal" ||
                (
                    Array.isArray(values[index]) && 
                    values[index][0].render_type === "signal"
                ) ||
                values[index].render_type === "template" || (
                    Array.isArray(values[index]) && 
                    values[index][0].render_type === "template"
                ) ||
                values[index].render_type === "child" ||
                typeof values[index] === 'function' ||
                values[index] instanceof HTMLElement
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
    
    function buildVDOM(template) {
        let root = {
            render_type: "template",
            children: []
        }
    
        let current_node = root
    
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
        
        stack.push(root)
    
        for(let segment of template) {
            if(typeof segment === "string") {
                for(let char of segment) {
                    // Attrs                
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
    
                    // Build Strings               
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
                    
                    // Start Of Tag
                    if(char === "<") {
                        in_content = false
                        if(partial_content !== "")
                            content.push(partial_content);
                        if(content.length !== 0 && current_node)
                            //@ts-ignore
                            current_node.children.push(content);
                        content = []
                        partial_content = ""
                    }
                    
                    // End of Tag                
                    if(char === ">") {
                        if(in_tag) {
                            let node = {
                                render_type: 'node',
                                children: []
                            }
    
                            if(!in_close_tag) {
                                // @ts-ignore
                                node["element"] = element
                                //@ts-ignore
                                node["attrs"] = attributes
                                //@ts-ignore
                                current_node.children.push(node)
                                
                                if(last_char !== "/") {
                                    stack.push(current_node)
                                    current_node = node
                                }
    
                            } else {
                                //@ts-ignore
                                current_node = stack.pop()
                            }
                            
    
                            in_tag = false
                            in_close_tag = false
                            in_attributes = false
    
                            attributes = []
                            element = ""
                        }
                        
                        in_content = true
                    }
                    
                    // Toggle States                
                    if(in_tag && char === " ") 
                        in_attributes = true;
                    if(char === "<") 
                        in_tag = true;
                    if(last_char === "<" && char === "/") 
                        in_close_tag = true;
                    if(char === "\"" && in_attributes)
                        in_attribute_string = !in_attribute_string;
                    
                    // Track Char                
                    last_char = char
                }
            }
    
           
            if(segment.render_type === 'signal') {
                if(in_content) {
                    content.push(partial_content)
                    content.push(segment)
                    partial_content = ""
                }
                
                if(in_attributes) {
                    attribute.push(segment)
                }
            }
    
            if(typeof segment === 'function') {
                if(in_attributes && attribute.length === 1) {
                    attribute.push(segment)
                }
            }
    
            if(
                segment.render_type === 'template' ||
                segment.render_type === 'child'
            ) {
                //@ts-ignore
                current_node.children.push(segment)
            }
    
            if(Array.isArray(segment)) {
                if(segment[0].render_type === "signal") {
                    if(in_content) {
                        content.push(partial_content)
                        content.push(segment)
                        partial_content = ""
                    }
    
                    if(in_attributes) {
                        attribute.push(segment)
                    }
                }
    
                if(segment[0].render_type === "template") {
                    //@ts-ignore
                    current_node.children.push(...segment)
                }
            }
    
            if(segment instanceof HTMLElement) {
                //@ts-ignore
                current_node.children.push(segment)
            }
    
        }
    
        return root
    }
    
    function buildFragment(VDOM) {
        if(VDOM instanceof HTMLElement) {
            return [VDOM, {}]
        }
    
        if(VDOM.render_type === 'template') {
            let node_fragment = new DocumentFragment()
            for (let node of VDOM.children) {
                let [result_node, _] = buildFragment(node)
                node_fragment.append(result_node)
            }
            return [node_fragment, {}]
        }
    
        if (VDOM.render_type === 'node') {
            let element = document.createElement(VDOM["element"])
            
            for (let attr of VDOM.attrs) {
                if(
                    attr[0].startsWith("[") && 
                    attr[0].endsWith("]")
                )
                    element.addEventListener(
                        attr[0]
                            .substr(
                                1,
                                attr[0].length-2
                            ),
                        attr[1]
                    );
                else if (attr.length === 1)
                    element.setAttribute(attr[0], "");
                else if(attr[1].render_type === 'signal') {
                    element.setAttribute(attr[0], attr[1].value)
                    bind(attr[1], (value) => {
                        element.setAttribute(attr[0], value)
                    })
                } else if(
                    Array.isArray(attr[1]) && attr[1][0].render_type === 'signal'
                ) {
                    if(attr[1][1].constructor.name == 'AsyncFunction')
                        element.setAttribute(
                            attr[0], 
                            attr[1][1]()
                            .then(()=>{})
                            .catch((error)=>{
                                throw error;
                            })
                        );
                    else element.setAttribute(
                        attr[0], 
                        attr[1][1]()
                    );
    
                    bind(attr[1][0], () => {
                        if(attr[1][1].constructor.name == 'AsyncFunction')
                            element.setAttribute(
                                attr[0], 
                                attr[1][1]()
                                .then(()=>{})
                                .catch((error)=>{
                                    throw error;
                                })
                            );
                        else element.setAttribute(
                            attr[0], 
                            attr[1][1]()
                        );
                    })
                }
                else
                    element.setAttribute(attr[0], attr[1]);       
            }
            
            let index = 0
            let signals = []
            for (let node of VDOM.children) {
                let [result_node, data] = buildFragment(node)
                
                if('signals' in data && data.signals.length > 0) {
                    signals.push([index, data.signals, node])
                }
                
                if(typeof result_node === 'string')
                    element.insertAdjacentHTML('beforeend', result_node);
                else
                    element.append(result_node);
                index += 1
            }
    
            if(signals.length > 0) {
                for(let signal_data of signals) {
                    for(let signal of signal_data[1]) {
                        bind(signal, () => {
                            let [result_node, _] = buildFragment(signal_data[2])
                            let old = element.childNodes[signal_data[0]]
                            old.replaceWith(
                                result_node
                            )
                        })
                    }
                }
            }
            
            return [element, {}]
        }
    
        if (VDOM.render_type === 'child') {
            return [VDOM.content, {}]
        }
    
    
        let content_string = ""
        let signals_content = []
    
        for(let content of VDOM) {
            if (
                content.render_type === "signal"
            ) {
                content_string += content.value
                signals_content.push(content)
            } else if(Array.isArray(content) && content[0].render_type === 'signal') {
                if(content[1].constructor.name == 'AsyncFunction')
                    content_string += content[1]().then(()=>{}).catch((error)=>{throw error;});
                else content_string += content[1]();
                signals_content.push(content[0])
            } else if(content instanceof HTMLElement) {
            } else {
                content_string += content
            }
        }
    
        return [document.createTextNode(content_string), {
            signals: signals_content
        }]
    
    
    }
    
    function template (strings, ...values) {
        return buildVDOM(collapseTemplate(strings, values))
    }
    
    function render(template) {
        return buildFragment(template)[0]
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