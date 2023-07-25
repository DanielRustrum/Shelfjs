# Signals
Signals allow you to bind a callback function, which will be called whenever the value of the signal is updated.

Here is a Basic Example on how to use Signals:
```javascript
// Initalize the signal with a default value
let signal = Shelf.signal(0)

// Bind a callback to the provided signal
Shelf.bind(signal, val => {
    console.log(val)
})

// Add one to the signal value in 1 second intervals
setInterval(() => {
    signal.value += 1
}, 1000)
```