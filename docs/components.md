# Components
Components are similar to templates and even encorporates templates in how they work, However they do add more flexiblity than templates. In exchange for this flexibility you are relinqueshing control and how the HTML associated with the Compontent is rendered becomes more unpredictable. Once declared the component is no longer bound to the flow of your program and becomes unbound to scoping.

## How to Declare A Component
To Declare a Component all we need is a Template Function where the only parameter is an object. Within this object is where the inner HTML and arguments will be provided.

Once we provide the function into the `Shelf.component` function the function provided will now be a component.

```javascript
function Name({first_name}) {
    return Shelf.template`<p>Hello ${first_name}!</p>`
}

Shelf.component(Name)
```

## How to Use
Now that the component has been declared we can use it in two places, within our HTML itself, or within our Templates. Do be cautions when using Components within Templates because if a signal is passed as an attribute of the Component, then whenever the signal is updated, then the whole component is rebuilt and rendered. 

Using the Declaration Example above here is how we would use the `Name` Component

```javascript
let template = `<Name first_name="Rusty" />`

Shelf.render(template)
```

or

```html
<Name first_name="Rusty" />
```

## Advanced