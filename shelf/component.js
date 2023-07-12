{
    function collapseTemplate(strings, values) {
        let current_string = "", 
            new_result = []
        
        for(
            let index = 0; 
            index < values.length; 
            index += 1
        ) {  
            if(
                values[index].render_type === "signal" ||
                (
                    Array.isArray(values[index]) && 
                    values[index][0].render_type === "signal"
                )
            ) {
                new_result.push(current_string)
                current_string = ""
                new_result.push(values[index])
            } else {
                current_string +=  strings[index] + values[index]
            }
        }
        
        new_result.push(current_string + strings[strings.length - 1])
        
        return new_result
    }

    function buildVDOM(template) {
        let root = {
            type: "component",
            children: []
        }

        let current_node = root

        let stack = [],
            attribute = [],
            node_attrs = [],
            content = []
        
        let last_char = "",
            element = "",
            partial_attribute = "",
            partial_content = ""
        
        
        let in_tag = false,
            in_close_tag = false,
            in_content = false,
            in_attributes = false
        
        stack.push(root)

        for(let segment of template) {
            if(typeof segment === "string") {
                for(let char of segment) {
                    // Attrs                
                    if(
                        in_tag && 
                        (char === "=" || char === " " || char === ">") 
                        && in_attributes 
                        && !in_close_tag
                    ) { 
                        if(partial_attribute !== "")
                            attribute.push(partial_attribute);
                        partial_attribute = ""
                    }
                    if(
                        in_tag && 
                        (char === " " || char === ">") && 
                        in_attributes && 
                        !in_close_tag
                    ){
                        if(attribute.length !== 0)
                            node_attrs.push(attribute);
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
                        !["/", " ", ">", "=", "\"", "'"].includes(char) &&
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
                            current_node.children.push(content);
                        content = []
                        partial_content = ""
                    }
                    
                    // End of Tag                
                    if(char === ">") {
                        if(in_tag) {
                            let node = {
                                type: 'node',
                                children: []
                            }

                            if(!in_close_tag) {
                                node["element"] = element
                                node["attrs"] = node_attrs
                                current_node.children.push(node)
                                
                                if(last_char !== "/") {
                                    stack.push(current_node)
                                    current_node = node
                                }

                            } else {
                                current_node = stack.pop()
                            }
                            

                            in_tag = false
                            in_close_tag = false
                            in_attributes = false

                            node_attrs = []
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
                    
                    // Track Char                
                    last_char = char
                }
            }
        }

        return root
    }
    
    function component(strings, ...values) {
        return buildVDOM(collapseTemplate(strings, values))
    }

    Shelf.component = component

    function render() {}

    Shelf.render = render
}