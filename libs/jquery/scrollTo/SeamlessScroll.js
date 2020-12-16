(function ($) {
  $.fn.myScroll = function (options) {
    //默认配置
    var defaults = {
      speed: 40, //滚动速度,值越大速度越慢
      rowHeight: 106 //每行的高度
    };

    var opts = $.extend({}, defaults, options),
      intId = [];

    function marquee(obj, step) {

      obj.find("ul").animate({ //html中必须有的ul
        marginTop: '-=1'
      }, 0, function () {
        var s = Math.abs(parseInt($(this).css("margin-top")));
        if (s >= step) {
          $(this).find("li").slice(0, 1).appendTo($(this)); //截取ul中的第一个li,添加到ul的最后
          $(this).css("margin-top", 0);
        }
      });
    }

    this.each(function (i) {
      var rowHeight = opts["rowHeight"],
        speed = opts["speed"],
        _this = $(this); //这里的_this指向div.myscroll

      intId[i] = setInterval(function () {
        if (_this.find("ul").height() <= _this.height()) { //当ul的高度小于html中，div.myscroll的高度，则结束定时器
          clearInterval(intId[i]);
        } else {
          marquee(_this, rowHeight);
        }
      }, speed);

      _this.hover(function () { //鼠标移动到div.myscroll上时，结束定时器
        clearInterval(intId[i]);
      }, function () { //鼠标离开div.myscroll容器，判断ul的高度若小于等于div.myscroll高度，则结束定时器（不滚动），否则调用marquee函数
        intId[i] = setInterval(function () {
          if (_this.find("ul").height() <= _this.height()) {
            clearInterval(intId[i]);
          } else {
            marquee(_this, rowHeight);
          }
        }, speed);
      });
    });
  }
})(jQuery);

//引用方法
// $('.myscroll').myScroll({
//   speed: 40, //数值越大，速度越慢
//   rowHeight: 106 //li的高度
// });