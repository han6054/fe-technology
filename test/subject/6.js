// 实现一个$attr(name,value)，name为属性，value为元素合集
// 例如 let arr = $attr('class', 'box')  获取页面中所有class 为box的元素

function $attr(property, value) {
  let elements = document.getElementsByTagName('*');
  let arr = [];
  [].forEach.call(elements, (item) => {
      let itemValue = item.getAttribute(property);
      if(property === 'class') {
        new RegExp("/\\b+ value +\\b/").test(itemValue) ?  arr.push(item): null;
        return;
      }
      if(itemValue === value) {
          arr.push(item);
      }
  });
    return arr;
}