# Shelfjs
A Shelf is a Library meant to clear the weeds through some level of abstraction, but not shove them under the bed and pretend they don't exist.

## Things A Component/Template System Need to Do:
- Manage Node based Events
- Componentise Reactive UI Elements
- Handle Data Transformations
- Respond to Component Changes
- Hide Standard DOM Interactions

## Docs
[Getting Started](./docs/getting-started.md)
[Table of Contents](./docs/table-of-contents.md)

## Road Map
Signals:
- [x] Primatives
- [x] Arrays
- [-] Objects
- [ ] Improve Array/Object/Signal Interface
 
Components:
- [ ] Shadow and Web Component Rendering
- [ ] Direct to DOM Rendering
- [ ] Foundations
- [ ] Component Maps


Rendering:
- [-] Root Element Injection
- [-] Inject Root Data
- [ ] DOM Manipulation
- [ ] Minimize Mutations For Signal Template Lists
- [ ] Memoize DOM Rendering

VDOM:
- [x] Templates
- [x] Embedded Templates
- [x] Template Lists
- [-] Template Functions 
- [ ] Move to WebWorker
- [-] Event Binding
- [ ] SSR/Server Execution
- [ ] Rewrite Parser into Web Assembly
- [ ] Multiple Signals in Signal Array

Styling:
- [ ] Dynamic Style Sheets
- [ ] External Style Attributes
 
DX:
- [ ] JSM Support / Better Importing
- [ ] CLI
- [ ] Dev Server