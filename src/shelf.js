const shelf = {
    component: (string) => {
        return {
            scope: (variables) => {},
            compile: () => {
                return string
            }
        }
    },
    signal: (default_value = undefined) => {
        let value = default_value
        return (value)
    },
    render: (component, root) => {
        let ready_component = component().compile()
        let root_el = document.querySelector(root)
        root_el.innerHTML = ready_component

        // for (const element of root_el) {
        //     element.innerHTML = ready_component
        // }
    }
}