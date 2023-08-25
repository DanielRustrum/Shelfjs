{
    let style = {}

    function parseStyleSheet(strings, values) {
        
    }

    function mountStyleSheet(string) {
        let sheet_blob = new Blob([string], {
            type: ""
        })

        let sheet_url = URL.createObjectURL(sheet_blob)
    }

    function createStyleSheet(strings, ...values) {
        return {}
    }
    style.sheet = createStyleSheet

    Shelf.style = style
}