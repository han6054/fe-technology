export function add(x, y) {
    if(parseInt(x) == x) {
        x = Number(x)
    }
    if(parseInt(y) == y) {
        y = Number(y)
    }
    return x+y
}