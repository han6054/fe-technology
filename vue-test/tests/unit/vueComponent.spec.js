import Vue from 'vue'
import Message from '../../src/components/message'
import { mount } from '@vue/test-utils'

describe('message组件测试', ()=> {
    it('测试初始化data',()=> {
        expect( Message.data().text).toBe('vue-text');
    });
    it('测试点击事件, message改变',()=> {
       let wrapper = mount(Message);
       wrapper.find('.btn').trigger('click')
       expect(wrapper.vm.text).toBe('click message')
    })
})