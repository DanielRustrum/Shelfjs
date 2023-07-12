{
    function signal(default_value = undefined) {
        let signal_obj = {
            render_type: 'signal',
            subscribed: [],
            _value: default_value
        }
        
        Object.defineProperty(signal_obj, "value", {
            get() {return this._value},
            set(new_value) {
                this._value = new_value
                this.subscribed.forEach(callback => callback(new_value))
            }
        })
        
        return signal_obj
    }

    Shelf.signal = signal

    
    function bind(signal, callback) {
        signal.subscribed.push(callback)
    }

    Shelf.bindToSignal = bind
}