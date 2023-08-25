{
    let Core = Shelf.__proto__
    function signal(default_value = undefined) {
        let signal_obj = {
            render_type: 'signal',
            subscribed: [],
        }
        
        if(
            Array.isArray(default_value) ||
            typeof default_value === "object"
        )
            signal_obj['value'] = new Proxy(default_value, {
                get(target, prop, receiver) {
                    const value = Reflect.get(target, prop, receiver)

                    if(
                        typeof value === "function" &&
                        Array.isArray(target) &&
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
                    ) {
                        let wrapper = (...args) => {
                            signal_obj["subscribed"]
                                .forEach(
                                    callback => callback(prop, args, "indirect")
                                );
                            return value.bind(target)(...args)
                        }
                        return wrapper
                    }

                    return value
                },
                set(obj, prop, value) {
                    Reflect.set(obj, prop, value)
                    
                    signal_obj["subscribed"]
                        .forEach(callback => callback(prop, value, "direct"));

                }
            });
        else {
            signal_obj["_value"] = default_value
            
            Object.defineProperty(signal_obj, "value", {
                get() {return this._value},
                set(new_value) {
                    this._value = new_value
                    this.subscribed.forEach(callback => callback(new_value))
                }
            })
        };
        
        return signal_obj
    }

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
    
    function bind(signal, callback) {
        signal.subscribed.push(callback)
    }

    Core.define(
        "signals",
        {
            signal,
            trigger
        },
        {
            bind
        }
    )
}
