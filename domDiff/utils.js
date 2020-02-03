let utils =  {
    setAttr(element, attr , value) {
        switch(attr) {
            case 'style':
                element.style.cssText = value;
                break;
            case 'value':
                let tagName = element.tagName.toLowercase();
                if(tagName == 'input' || tagName == 'textarea') {
                 element.value = value
                }else {
                    element.setAttribute(attr, value)
                }
                break;
            default: 
                element.setAttribute(attr, value);
                break;     
        }
        element.setAttribute(attr, value)
    }
}
module.exports =  utils
