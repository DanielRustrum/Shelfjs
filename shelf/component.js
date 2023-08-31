{
    const component_map = new Map()
    
    class Component {
        constructor() {
            this.tag = this.constructor.name
            
            this.setup()

            component_map.set(this.tag, this)
        }
    }
    
    let count = 0

    class ExampleComponent extends Component {
        setup() {}
        init({}, children) {
            console.log(this.attributes)
            return `
                <p>count: ${count}</p> 
                <p>Child: ${children}</p>
            `
        }
        update(attributes, children) {}
    }

    new ExampleComponent()

    Shelf.Component = Component
}