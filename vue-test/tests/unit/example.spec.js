// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
//
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })


import { add } from '../../src/util'

describe('测试加法', ()=> {
  it('测试数字相加', ()=> {
    expect(add(1,2)).toBe(3)
  });
  it('字符串相加', ()=> {
    expect(add('1','2')).toBe(3)
  })
});
