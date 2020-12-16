/*------------------------------------------数据与方法 HTML:{{}} JS:newVue...data{}----------------------------------------*/
//赋值：{{ message1 }}
var chart1 = new Vue({
  el: '#chart1',
  data: {
    block: {
      one: 57
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    message1: 'Hello Vue!',
    message2: 'Hello World!'
  }
})

//悬停提示：v-bind:title="message"
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
app2.message = '新消息' ;

//隐藏：v-if="seen"
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true //false 消失
  }
})

//for循环：<ele v-for="todo in todos"> {{ todo.text }} </ele>
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
app4.todos.push({ text: '新项目' })

//点击事件：v-on:click="reverseMessage"
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      // this.message = this.message.split('').reverse().join('') //文字全部反过来
      // this.message = this.message.concat('aaaa') //添加字符
      this.message = this.message.replace(this.message,'aaaa') //修改字符
    }
  }
})

//绑定输入框和文字：v-model="message"
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})

//数组 -> 循环 //必须是todo
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})


// data==vm, vm.a == data.a, 这两个对象的值相同
var data = { a: 1 }
var vm = new Vue({
  data: data
})


//点击不能修改
var obj = {
  foo: 'bar'
}
Object.freeze(obj) //点击不能修改
new Vue({
  el: '#app_1',
  data: obj
})

//区分系统和自己定义的
var data = { a: 1 }
var vm = new Vue({
  el: '#example', //vm.$el === document.getElementById('example')
  data: data //vm.$data === data
})


/*------------------------------------------生命周期钩子----------------------------------------*/
//将实例挂载到 DOM 并在数据变化时更新 DOM
new Vue({
  data: {
    a: 1
  },
  created: function () {
    console.log('a is: ' + this.a)
  }
})

//这个将不会改变
var vm_bojsshow_1 = new Vue({
  el: '#bojsshow_1',
  data: {
    msg: 'Hi',
    rawHtml: 'Using mustaches: <span style="color: rgb(23, 206, 212)">This should be blue.</span>',
    color: 'blue',
    number: 1,
    ok: false,
    message: 'Hello',
    
    seen: true,
    href: 'http://www.baidu.com',
    url: 'http://www.baidu.com',
    attributename : 'href',
    eventname: 'focus'
  },
  methods: {
    click1: function() {
      console.log('click1')
    },
    click2: function() {
      console.log('click2')
    },
    doSomething: function() {
      console.log('doSomething')
    },
    onSubmit1(){return false;},
    onSubmit2(e){
      e.preventDefault();
    }
  }
})
vm_bojsshow_1.msg = 'Hi……'



//计算属性
var vm_bojsshow_1 = new Vue({
  el: '#app_2',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    firstName2: 'San',
    lastName2: 'Zhang'
  },
  methods: {
  },
  computed: {
    now: function () {
      return Date.now()
    },
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    },
    quanming: {
      // getter
      get: function () {
        return this.firstName2 + ' ' + this.lastName2
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName2 = names[0]
        this.lastName2 = names[names.length - 1]
      }
    }
  }
})

//侦听器 axios
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: { //数据
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: { //始终监听
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () { //结束后
    //我们希望限制访问的频率, AJAX请求直到用户输入完毕才会发出
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: { //方法
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})


//Class 与 Style 绑定
var vm_bojsshow_1 = new Vue({
  el: '#app_4',
  data: {
    isActive: true,
    hasError: false,
    error: null,
    activeClass: true,
    errorClass: false,
    classObject: {
      active: true,
      'text-danger': false
    },
    //绑定内联样式
    activeColor: 'red',
    fontSize: 30,
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
})


//v-if
var vm_bojsshow_1 = new Vue({
  el: '#app_5',
  data: {
    type: "A",
    "loginType": "username"
  }
})

//v-for
var example1 = new Vue({
  el: '#app_6',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ],

    parentMessage: 'Parent',

    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    },

    numbers: [ 1, 2, 3, 4, 5 ],

    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]],

    todos: [
      {todo: 1, isComplete: false},
      {todo: 2, isComplete: true}
    ],
    
  },
  computed: {
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  },
  methods: {
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
})
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})


//事件处理
new Vue({
  el: '#app_7',
  data: {
    counter: 0,

    name: 'Vue.js'
  },
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      console.log(this.name)
      // `event` 是原生 DOM 事件
      if (event) {
        console.log(event.target.tagName)
      }
    },
    say: function (message) {
      console.log(message)
    },
    warn: function (message, event) {
      // 现在我们可以访问原生事件对象
      if (event) {
        event.preventDefault()
      }
      console.log(message)
    },

    doThis: function(event) {
      console.log(event.target.tagName)
    }
  }
})


//表单输入绑定
var vm = new Vue({
  el: '#app_8',
  data: {
    textMessage: '',
    textareaMessage: '',

    checked: true,
    checkedNames: [],
    picked: '',
    selected: '',
    selected2: '',

    selected3: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ],

    toggle: true,
    toggle1: true,
    toggle2: false,

    selected4:'',
    picked1: '',
    picked2: ''
  }
})


//组件基础
//全局注册 组件
Vue.component('button-counter', {
  data: function () {
    return { //必须是一个函数
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

Vue.component('blog-post2', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})

Vue.component('blog-post3', {
  props: ['post'],
  template: `
    <div class="blog-post3">
      <h3>{{ post.title }}</h3>
      <button  v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})

Vue.component('blog-post4', {
  props: ['post'],
  template: `
    <div class="blog-post4">
      <h3>{{ post.title }}</h3>
      <button  v-on:click="$emit('enlarge-text', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})

Vue.component('blog-post5', {
  props: ['post'],
  template: `
    <div class="blog-post5">
      <h3>{{ post.title }}</h3>
      <button  v-on:click="$emit('enlarge-text', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})



//要放在注册之后
new Vue({
  el: '#app_9',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],

    postFontSize: 1
  },
  methods: {
    onEnlargeText: function (enlargeAmount) {
      this.postFontSize += enlargeAmount
    }
  }
})