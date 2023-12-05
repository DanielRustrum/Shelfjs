{
    const component_map = new Map()
    
    class Component {
        constructor() {
            this.tag = this.constructor.name
            this.template = []
            
            this.setup()

            component_map.set(this.tag, this)
        }
    }

    Shelf.Component = Component
}