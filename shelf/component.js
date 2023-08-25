{
    const component_map = new Map()
    
    function component( 
        component_function,
        component_name = ""
    ) {
        component_map.set(
            component_name === ""? component_function.name: component_name,
            component_function
        )

        return {
            render_type: "component",
            
        }
    }

    Shelf.component = component
}