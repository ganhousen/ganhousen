
const ctx = '@@InfiniteScroll';

//节流
var throttle = function(fn, delay) {
  //now:当前的时间;
  //lastExec:上次执行的时间;
  //timer: 记录timeout的id;
  //context: fn执行的上下文作用域;
  //args:函数执行传递的参数;
  var now, lastExec, timer, context, args; //eslint-disable-line
  //scroll回调函数真正执行的核心函数
  var execute = function(){
    fn.apply(context, args);//实现类的继承
    lastExec = now; //上一次执行
  };
  //闭包函数(绑定到scroll事件上的回调函数)
  return function() {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      //判断是否超过指定时间间隔，超过则执行
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

//获取滚动距离
var getScrollTop = function(element){
  if (element === window) {
    //document.documentElement.scrollTop：获取当前页面的滚动条纵坐标位置
    //pageYOffset：属性相等于 scrollY 属性。
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }
  return element.scrollTop;
};

//返回一个CSSStyleDeclaration对象，其中包含当前元素的所有计算的样式。
var getComputedStyle =  document.defaultView.getComputedStyle;

//获取当前节点的overflowY属性
var getScrollEventTarget = function(element) {
  var currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    var overflowY = getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
};

//获取页面可视高度
var getVisibleHeight = function(element) {
  if (element === window) {
    return document.documentElement.clientHeight;
  }
  return element.clientHeight;
};

//获取元素top
var getElementTop = function(element) {
  if (element === window){
    return getScrollTop(window);
  }
  //返回元素的大小及其相对于视口的位置。
  //获取滚动距离。
  return element.getBoundingClientRect().top + getScrollTop(window);
};

var isAttached = function(element) {
  var currentNode = element.parentNode;
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true;
    }
    if (currentNode.nodeType === 11) {
      return false;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
};

//在当前指令绑定到dom上之后，在dom更新后执行doBind()核心代码
//搜索出当前页面的scroll view，
//并未当前scrollview注册onscroll的钩子函数，
//并且对滚动的回调函数就行了节流优化策略；
//以及对自定义属性的处理。
var doBind = function() {
  //执行过一次了(绑定过了), 直接返回,不继续执行
  if (this.binded) return; // eslint-disable-line
  
  this.binded = true;

  var directive = this;
   // 指令绑定的dom节点
  var element = directive.el;
  //获取滚动的dom
  directive.scrollEventTarget = getScrollEventTarget(element);
  // 节流函数, 时间间隔为200ms
  directive.scrollListener = throttle(doCheck.bind(directive), 200);
  //监听事件
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);
  //获取事件属性--是否无限滚动
  var disabledExpr = element.getAttribute('infinite-scroll-disabled');
  var disabled = false;
  if (disabledExpr) {
    //注册当前变量的变化的回调函数
    this.vm.$watch(disabledExpr, function(value) {
      directive.disabled = value;
      if (!value && directive.immediateCheck) {
        doCheck.call(directive);
      }
    });
    disabled = Boolean(directive.vm[disabledExpr]);
  }

  directive.disabled = disabled;

  //获取事件属性--滚动距离，注意：只能传递数字或者vm中的data或props数据
  var distanceExpr = element.getAttribute('infinite-scroll-distance');
  var distance = 0;
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr);
    if (isNaN(distance)) {
      distance = 0;
    }
  }
  directive.distance = distance;

   //infinite-scroll-immediate-check: 是否立即检查，注意：这个数据的值，只能通过Vue中的data或props中获取
  var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
  var immediateCheck = false;
  console.log('immediateCheckExpr',immediateCheckExpr)
  if (immediateCheckExpr) {
    immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
  }

  directive.immediateCheck = immediateCheck;

  if (immediateCheck) {
    doCheck.call(directive);
  }

  //infinite-scroll-listen-for-event的处理
  var eventName = element.getAttribute('infinite-scroll-listen-for-event');
  if (eventName) {
    directive.vm.$on(eventName, function() {
      doCheck.call(directive);
    });
  }

};

var doCheck = function(force){
  var scrollEventTarget = this.scrollEventTarget;
  var element = this.el;
  var distance = this.distance;

  if (force !== true && this.disabled) return; //eslint-disable-line
  var viewportScrollTop = getScrollTop(scrollEventTarget);
  var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

  var shouldTrigger = false;

  if (scrollEventTarget === element) {
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
  } else {
    var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;
    shouldTrigger = viewportBottom + distance >= elementBottom;
  }

  if (shouldTrigger && this.expression) {
    this.expression();
  }
};

export default {
  // 指令绑定的钩子函数
  bind(el, binding, vnode) {
    // 为当前el添加我们需要使用的属性，它的value就是我们后面操作所需的对象
    el[ctx] = {
      el,// 当前指令绑定的dom节点
      vm: vnode.context,// 当前vNode所在的Vue实例
      expression: binding.value
    };
    const args = arguments;
    // 当前Vue实例挂载到到dom上之后执行的回调函数
    var cb = function() {
      //在此次事件循环完成dom相关更新之后,执行当前指令相关业务
      el[ctx].vm.$nextTick(function(){
        // 当前dom在html标签里面  当前dom不在 documentFragment 里面
        if (isAttached(el)) {
          doBind.call(el[ctx], args);
        }
        el[ctx].bindTryCount = 0;

        var tryBind = function() {
          if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
          el[ctx].bindTryCount++;
          if (isAttached(el)) {
            doBind.call(el[ctx], args);
          } else {
            setTimeout(tryBind, 50);
          }
        };

        tryBind();
      });
    };
    if (el[ctx].vm._isMounted){
      console.log('callback');
      cb();
      return;
    }
    // 如果阅读过vue源码, Vue通过callHook()调用其相关生命周期方法,此时也会调用通过hook注册的回调钩子函数
    el[ctx].vm.$on('hook:mounted', cb);

  },
  //当前指令解绑定的回调钩子函数
  unbind(el) {
    //将当前scroll view的 scroll事件remove掉
    if (el[ctx] && el[ctx].scrollEventTarget) {
      el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
  }
};



