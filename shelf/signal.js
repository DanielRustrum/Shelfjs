{
    function signal(default_value = undefined) {
        let signal_obj = {
            render_type: 'signal',
            subscribed: [],
            _value: default_value
        }
        
        if(
            Array.isArray(default_value) ||
            typeof default_value === "object"
        )
            signal_obj['value'] = new Proxy(default_value, {
                get(target, prop, receiver) {
                    console.log(signal_obj["subscribed"])
                    const value = Reflect.get(target, prop, receiver)

                    if(typeof value === "function"){
                        return value.bind(target)
                    }

                    if(
                        Array.isArray(signal_obj["_value"]) &&
                        [
                            "copyWithin",
                            "fill",
                            "pop",
                            "push",
                            "reverse",
                            "shift",
                            "sort",
                            "splice",
                            "unshift"
                        ].includes(prop)
                    ) signal_obj["subscribed"]
                        .forEach(callback => callback());
                    
                    return value
                },
                set(obj, prop, value) {
                    Reflect.set(signal_obj["_value"], prop, value)
                    Reflect.set(obj, prop, value)
                    
                    signal_obj["subscribed"]
                        .forEach(callback => callback(value));

                }
            });
        else 
            Object.defineProperty(signal_obj, "value", {
                get() {return this._value},
                set(new_value) {
                    this._value = new_value
                    this.subscribed.forEach(callback => callback(new_value))
                }
            });
        
        return signal_obj
    }

    Shelf.signal = signal

    function trigger() {
        let signal_obj = {
            render_type: 'signal',
            subscribed: [],
            trigger: () => {
                this.subscribed.forEach(callback => callback(new_value))
            }
        }
        
        return signal_obj
    }
    Shelf.trigger = trigger

    
    function bind(signal, callback) {
        signal.subscribed.push(callback)
    }

    Shelf.bindToSignal = bind
}