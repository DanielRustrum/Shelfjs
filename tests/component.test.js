function Test({
    some_arg,
    children
}) {
    return Shelf.template`<div arg=${some_arg}>${children}</div>`
}

Shelf.component(Test)