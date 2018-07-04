/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 */

!
    function(t, i, n, s) {
        var e = function(s, e) {
            this.elem = s, this.$elem = t(s), this.options = e, this.metadata = this.$elem.data("plugin-options"), this.$win = t(i), this.sections = {}, this.didScroll = !1, this.$doc = t(n), this.docHeight = this.$doc.height()
        };
        e.prototype = {
            defaults: {
                navItems: "a",
                currentClass: "current",
                changeHash: !1,
                easing: "swing",
                filter: "",
                scrollSpeed: 750,
                scrollThreshold: .5,
                begin: !1,
                end: !1,
                scrollChange: !1
            },
            init: function() {
                return this.config = t.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)), this
            },
            adjustNav: function(t, i) {
                t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), i.addClass(t.config.currentClass)
            },
            bindInterval: function() {
                var t, i = this;
                i.$win.on("scroll.onePageNav", function() {
                    i.didScroll = !0
                }), i.t = setInterval(function() {
                    t = i.$doc.height(), i.didScroll && (i.didScroll = !1, i.scrollChange()), t !== i.docHeight && (i.docHeight = t, i.getPositions())
                }, 250)
            },
            getHash: function(t) {
                return t.attr("href").split("#")[1]
            },
            getPositions: function() {
                var i, n, s, e = this;
                e.$nav.each(function() {
                    i = e.getHash(t(this)), s = t("#" + i), s.length && (n = s.offset().top, e.sections[i] = Math.round(n))
                })
            },
            getSection: function(t) {
                var i = null,
                    n = Math.round(this.$win.height() * this.config.scrollThreshold);
                for (var s in this.sections) this.sections[s] - n < t && (i = s);
                return i
            },
            handleClick: function(n) {
                var s = this,
                    e = t(n.currentTarget),
                    o = e.parent(),
                    a = "#" + s.getHash(e);
                o.hasClass(s.config.currentClass) || (s.config.begin && s.config.begin(), s.adjustNav(s, o), s.unbindInterval(), s.scrollTo(a, function() {
                    s.config.changeHash && (i.location.hash = a), s.bindInterval(), s.config.end && s.config.end()
                })), n.preventDefault()
            },
            scrollChange: function() {
                var t, i = this.$win.scrollTop(),
                    n = this.getSection(i);
                null !== n && (t = this.$elem.find('a[href$="#' + n + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
            },
            scrollTo: function(i, n) {
                var s = t(i).offset().top;
                t("html, body").animate({
                    scrollTop: s - this.config.scrollOffset
                }, this.config.scrollSpeed, this.config.easing, n)
            },
            unbindInterval: function() {
                clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
            }
        }, e.defaults = e.prototype.defaults, t.fn.onePageNav = function(t) {
            return this.each(function() {
                new e(this, t).init()
            })
        }
    }(jQuery, window, document);



//=====背景图缓动=======//
(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;

        //get the starting position of each element to have parallax applied to it
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();

            $this.each(function(){
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);




/*弹窗*/
TINY={};
function T$(i){return document.getElementById(i)}
TINY.box=function(){
    var j,m,b,g,v,p=0;
    return{
        show:function(o){
            v={opacity:70,close:1,animate:1,fixed:1,mask:1,maskid:'',boxid:'',topsplit:2,url:0,post:0,height:0,width:0,html:0,iframe:0};
            for(s in o){v[s]=o[s]}
            if(!p){
                j=document.createElement('div'); j.className='tbox';
                p=document.createElement('div'); p.className='tinner';
                b=document.createElement('div'); b.className='tcontent';
                m=document.createElement('div'); m.className='tmask';
                g=document.createElement('div'); g.className='tclose'; g.v=0;
                document.body.appendChild(m); document.body.appendChild(j); j.appendChild(p); p.appendChild(b);
                m.onclick=g.onclick=TINY.box.hide; window.onresize=TINY.box.resize
            }else{
                j.style.display='none'; clearTimeout(p.ah); if(g.v){p.removeChild(g); g.v=0}
            }
            p.id=v.boxid; m.id=v.maskid; j.style.position=v.fixed?'fixed':'absolute';
            if(v.html&&!v.animate){
                p.style.backgroundImage='none'; b.innerHTML=v.html; b.style.display='';
                p.style.width=v.width?v.width+'px':'auto'; p.style.height=v.height?v.height+'px':'auto'
            }else{
                b.style.display='none';
                if(!v.animate&&v.width&&v.height){
                    p.style.width=v.width+'px'; p.style.height=v.height+'px'
                }else{
                    p.style.width=p.style.height='100px'
                }
            }
            if(v.mask){this.mask(); this.alpha(m,1,v.opacity)}else{this.alpha(j,1,100)}
            if(v.autohide){p.ah=setTimeout(TINY.box.hide,1000*v.autohide)}else{document.onkeyup=TINY.box.esc}
        },
        fill:function(c,u,k,a,w,h){
            if(u){
                if(v.image){
                    var i=new Image(); i.onload=function(){w=w||i.width; h=h||i.height; TINY.box.psh(i,a,w,h)}; i.src=v.image
                }else if(v.iframe){
                    this.psh('<iframe src="'+v.iframe+'" width="'+v.width+'" frameborder="0" height="'+v.height+'"></iframe>',a,w,h)
                }else{
                    var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
                    x.onreadystatechange=function(){
                        if(x.readyState==4&&x.status==200){p.style.backgroundImage=''; TINY.box.psh(x.responseText,a,w,h)}
                    };
                    if(k){
                        x.open('POST',c,true); x.setRequestHeader('Content-type','application/x-www-form-urlencoded'); x.send(k)
                    }else{
                        x.open('GET',c,true); x.send(null)
                    }
                }
            }else{
                this.psh(c,a,w,h)
            }
        },
        psh:function(c,a,w,h){
            if(typeof c=='object'){b.appendChild(c)}else{b.innerHTML=c}
            var x=p.style.width, y=p.style.height;
            if(!w||!h){
                p.style.width=w?w+'px':''; p.style.height=h?h+'px':''; b.style.display='';
                if(!h){h=parseInt(b.offsetHeight)}
                if(!w){w=parseInt(b.offsetWidth)}
                b.style.display='none'
            }
            p.style.width=x; p.style.height=y;
            this.size(w,h,a)
        },
        esc:function(e){e=e||window.event; if(e.keyCode==27){TINY.box.hide()}},
        hide:function(){TINY.box.alpha(j,-1,0,3); document.onkeypress=null; if(v.closejs){v.closejs()}},
        resize:function(){TINY.box.pos(); TINY.box.mask()},
        mask:function(){m.style.height=this.total(1)+'px'; m.style.width=this.total(0)+'px'},
        pos:function(){
            var t;
            if(typeof v.top!='undefined'){t=v.top}else{t=(this.height()/v.topsplit)-(j.offsetHeight/2)/*; t=t<5?5:t*/}
            if(!v.fixed&&!v.top){t+=this.top()}
            j.style.top=t+'px';
            j.style.left=typeof v.left!='undefined'?v.left+'px':(this.width()/2)-(j.offsetWidth/2)+'px'
        },
        alpha:function(e,d,a){
            clearInterval(e.ai);
            if(d){e.style.opacity=0; e.style.filter='alpha(opacity=0)'; e.style.display='block'; TINY.box.pos()}
            e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)
        },
        ta:function(e,a,d){
            var o=Math.round(e.style.opacity*100);
            if(o==a){
                clearInterval(e.ai);
                if(d==-1){
                    e.style.display='none';
                    e==j?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''
                }else{
                    if(e==m){
                        this.alpha(j,1,100)
                    }else{
                        j.style.filter='';
                        TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height)
                    }
                }
            }else{
                var n=a-Math.floor(Math.abs(a-o)*.5)*d;
                e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
            }
        },
        size:function(w,h,a){
            if(a){
                clearInterval(p.si); var wd=parseInt(p.style.width)>w?-1:1, hd=parseInt(p.style.height)>h?-1:1;
                p.si=setInterval(function(){TINY.box.ts(w,wd,h,hd)},20)
            }else{
                p.style.backgroundImage='none'; if(v.close){p.appendChild(g); g.v=1}
                p.style.width=w+'px'; p.style.height=h+'px'; b.style.display=''; this.pos();
                if(v.openjs){v.openjs()}
            }
        },
        ts:function(w,wd,h,hd){
            var cw=parseInt(p.style.width), ch=parseInt(p.style.height);
            if(cw==w&&ch==h){
                clearInterval(p.si); p.style.backgroundImage='none'; b.style.display='block'; if(v.close){p.appendChild(g); g.v=1}
                if(v.openjs){v.openjs()}
            }else{
                if(cw!=w){p.style.width=(w-Math.floor(Math.abs(w-cw)*.6)*wd)+'px'}
                if(ch!=h){p.style.height=(h-Math.floor(Math.abs(h-ch)*.6)*hd)+'px'}
                this.pos()
            }
        },
        top:function(){return document.documentElement.scrollTop||document.body.scrollTop},
        width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},
        height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},
        total:function(d){
            var b=document.body, e=document.documentElement;
            return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):
                Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
        }
    }
}();


/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);