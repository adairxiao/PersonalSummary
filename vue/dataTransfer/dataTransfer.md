# 数据传递

1. 父子组件通信
    * 父向子通信
      + 通过prop实现通信 [示例1-1](https://github.com/adairxiao/PersonalSummary)<br>

        > * 注意点：child组件中vue修改props，可以被修改但是会报错：<br>
        >   Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.Instead,use a data or computed property based on the prop's value. Prop being mutated: "content"<br>
        >  在示例1.1.js文件 对child中template修改如下<br>
            ```javascript
            template: '<h2 @click="changeContent">{{ content }}</h2>'  
            ```
        >  对child中加入methods<br>
            ```javascript
            methods: {
              changeContent() {
                this.content = "修改成功"
              },
            },
            ```
        >如何解决  

      + $parent [示例1-2](https://github.com/adairxiao/PersonalSummary)
      + $attrs & $listeners
    * 子向父通信
      + $emit/$on
      + $ref 