# Getting Started
## including Shelf modules
```html
    <script src="./shelf/core.js"></script>
    <script src="./shelf/signal.js"></script>
    <script src="./shelf/component.js"></script>
    <script src="./index.js"></script>
```

## Create a Template
```javascript
    let template = Shelf.component`<h1>Hello World!</h1>`
    Shelf.render(template, "app")
```

## Data Manipulation
```javascript
    let signal = Shelf.signal(0)

    setInterval(() => count.value += 1, 1000)

    let template = Shelf.component`<p>count: ${signal}</p>`
    Shelf.render(template, "app")
```