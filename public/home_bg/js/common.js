//===============检测访问设备===================
function is_mobile() {
    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    var u = navigator.userAgent;
    if (null == u) {
        return true;
    }
    var result = regex_match.exec(u);
    if (null == result) {
        return false
    } else {
        return true
    }
}
if (is_mobile()) {
    document.location.href= 'wap/';  ///wap跳转目标页地址,部署时取消注释并更改为wap端的实际访问地址
}
//===============头部导航栏样式切换===================//
$(window).scroll(function() {
    var i =($(".banner").height()- 72);
    //c = $(".logo img");
    /*if ($(".navbar").offset().top > i) {
        $(".navbar").addClass("top-nav-collapse");
        //c.attr("src", "images/logob.png")
    } else {
        $(".navbar").removeClass("top-nav-collapse");
        //c.attr("src", "images/logoa.png")
    }*/

    //内容滚动视差
    $(".anim").each(function(){
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + 580) {
            $(this).addClass("slide");
        }
    });

    $('.footer .ft').each(function(){
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+800) {
            $(this).addClass("slide");
        }
    });

});

//========= 导航栏定位高亮 =========//
$(document).ready(function(){
    var TopOffsetId = ($(".navbar").height()- 30);
    $('.navbar .nav').onePageNav({
        currentClass: 'active',
        scrollThreshold: 0.2,
        scrollSpeed: 1000,
        scrollOffset: TopOffsetId,
    });
    var TopOffsetId = ($(".leftNav").height()- 80);
    $('.leftNav .nav').onePageNav({
        currentClass: 'active',
        scrollThreshold: 0.2,
        scrollSpeed: 1000,
        scrollOffset: TopOffsetId,
    });
});

//=============页面高度适应===============//
$(function () {
    $(".banner,.slideBox,.banner .slideBox .bd li").height($(window).height());
    if( $(window).height() < 600 ) {
        $('.page2,.page3,.page4,.news,.history,.cooperation,.about').css({height: '660'})
        $('.page6').css({height: '660'})
        $('.page2 .warp-box').css({top: '96px'})
        $('.page3 .warp-box').css({top: '87px'})
        $('.page4 .warp-box').css({top: '93px'})
        $('.news .warp-box').css({top: '100px'})
        $('.page6 .warp-box').css({top: '95px'})
    }
    else {
        $('.page2,.page3,.page4,.page6,.news,.history,.cooperation,.about').height($(window).height());
        $('.warp-box').css({top: ($(window).height() - $('.warp-box').height()) / 2})
    }

    $(window).resize(function() {
        $(".banner,.slideBox,.banner .slideBox .bd li").height($(window).height())
        $('.goTop').css({top: ($(window).height() - $('.goTop').height()) / 2})
        if( $(window).height() < 600 ) {
            $('.page2,.page3,.page4,.news,.history,.cooperation,.about').css({height: '660'})
            $('.page6').css({height: '660'})
            $('.page2 .warp-box').css({top: '96px'})
            $('.page3 .warp-box').css({top: '87px'})
            $('.page4 .warp-box').css({top: '93px'})
            $('.news .warp-box').css({top: '100px'})
            $('.page6 .warp-box').css({top: '95px'})
        }
        else {
            $('.page2,.page3,.page4,.page6,.news,.history,.cooperation,.about').height($(window).height());
            $('.warp-box').css({top: ($(window).height() - $('.warp-box').height()) / 2})
        }
    });

    //点击跳转事件
    var g = $(".page2");
    $(".scrolldown").on("click", function(event) {
        event.preventDefault();
        var e = g.offset().top - 42;
        $("body, html").animate({
            scrollTop: e
        }, 800)
    });

    var c = $(".page2");
    $(".link2").on("click", function(event) {
        event.preventDefault();
        var d = c.offset().top - 30;
        $("body, html").animate({
            scrollTop: d
        }, 800)
    });

    var f = $(".page3");
    $(".link3").on("click", function(event) {
        event.preventDefault();
        var g = f.offset().top - 35;
        $("body, html").animate({
            scrollTop: g
        }, 800)
    });

    var x = $(".team");
    $(".link4").on("click", function(event) {
        event.preventDefault();
        var y = x.offset().top - 35;
        $("body, html").animate({
            scrollTop: y
        }, 800)
    });

    var mm = $(".cooperation");
    $(".link5").on("click", function(event) {
        event.preventDefault();
        var nn = mm.offset().top - 35;
        $("body, html").animate({
            scrollTop: nn
        }, 800)
    });

    var m = $(".history");
    $(".link6").on("click", function(event) {
        event.preventDefault();
        var n = m.offset().top - 35;
        $("body, html").animate({
            scrollTop: n
        }, 800)
    });

    ///热区鼠标触碰点击事件
    $(".news-nav li").hover(function(){
        $(this).toggleClass("on").siblings(".news-nav li").removeClass("on")
    });

    $(".ft-icon").hover(function(){
        $(this).toggleClass("on").siblings(".ft-icon").removeClass("on")
    });

    $('.goTop .code').hover(function(){
            $('.goTop .box').addClass("on")
        },
        function() {
            $('.goTop .box').removeClass("on")
        })
})

//=============返回顶部===============//
jQuery(document).ready(function($){
    var offset = 680,
        offset_opacity = 1200,
        scroll_top_duration = 1000,
        $back_to_top = $('.goTop');
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
        $back_to_top.css({top: ($(window).height() - $back_to_top.height()) / 2})
    });
    $(".ckTop").on("click", function(event) {
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

});

//====//
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn",threshold :300,placeholder: "images/grey.png"});
    $("img.alazy").lazyload({effect: "fadeIn",threshold :300,placeholder: "images/grey.png",event:"sporty"});
});

//=============背景缓动配置============//
$(document).ready(function(){
    //$('.page1').parallax("50%", 0.6);
    $('.bg2').parallax("50%", 0.5);
    $('.page3').parallax("50%", 0.4);
    $('.page6').parallax("50%", 0.5);
    $('.page4').parallax("50%", 0.1);
    $('.about').parallax("50%", 0.5);
    $('.team').parallax("50%", 0.5);
    $('.cooperation').parallax("50%", 0.3);
})
//==================================//
!
    /*财富金融*/
    function(t, i) {
        var e = {
            id: "#cardArea",
            sid: ".card-item"
        };
        i.fn.cardArea = function(t) {
            var t = i.extend({},
                e, t);
            return this.each(function() {
                var e = i(t.id),
                    n = e.find(t.sid);
                n.on("mouseenter",function() {i(this).addClass("on").siblings().removeClass("on")
                })
            })
        };
        /*页面加载*/
        /*function handlePreloader() {
         if($('.preloader').length){
         $('.preloader').delay(200).fadeOut(500);
         }
         }
         $(window).load(function(){
         handlePreloader();
         });*/
    } (window, jQuery);
