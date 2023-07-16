let ShelfDev = {}
{
    let test_data = {
        executables: [],
    }

    function group(name) {
        test_data.executables.push(() => console.groupCollapsed(name))
    }
    ShelfDev.group = group
    function endGroup() {
        test_data.executables.push(() => console.groupEnd())
    }
    ShelfDev.endGroup = endGroup

    function observe(name, callback) {
        test_data.executables.push(() => console.groupCollapsed(name))
        test_data.executables.push(() => {
            if(callback.constructor.name === 'AsyncFunction')
                callback()
                .then(result => {
                    console.log(result)
                })
                .catch(error => {
                    console.log(error)
                });
            else console.log(callback());
        })

        test_data.executables.push(() => console.groupEnd())
    }
    ShelfDev.observe = observe

    function debug(callback) {
        test_data.executables.push(() => {
            console.log(callback())
        })
    }
    ShelfDev.debug = debug


    function run() {
        console.clear()
        
        for(let executable of test_data.executables) {
            executable()
        }
    }
    ShelfDev.run = run
}