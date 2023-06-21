export default {
  isEmpty(x) {
    return x === undefined || x === null || x === ''
  },
  isSelected: function(data, index) {
    let c = Object.assign([], data)
    let idx = 0
    c.forEach((x) => {
      x.checked = index === idx
      idx++
    })
  },
  objectIsEmpty(obj) {
    return Object.keys(obj).length === 0
  },
}
