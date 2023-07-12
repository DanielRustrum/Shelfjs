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
        console.log(template)
        let root = {
            type: "component",
            children: []
        }

        let current_node = root

        let node_stack = [],
            current_attr = [],
            node_attrs = [],
            content_array = []
        
        let last_char = "",
            tag_string = "",
            attr_string = "",
            content_string = ""
        
        let in_tag = false,
            in_close_tag = false,
            in_content = false,
            in_attributes = false

        node_stack.push(root)

        for(let segment of template) {
            if(typeof segment === "string") {
                for(let char in segment) {
                    // Attrs                
                    
                    
                    // Build Strings               
                    
                    
                    
                    
                    // Toggle States                
                    
                    
                    // Track Char                
                    
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


console.log(
    Shelf.component`<div>sdfsdfsd</div>`
)