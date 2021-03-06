/*
 Color animation jQuery-plugin
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function i(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function g(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function f(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:i()}});var h=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(h,function(b,a){d.fx.step[a]=function(c){if(!c.init){c.a=f(d(c.elem).css(a));c.end=f(c.end);c.init=true}c.elem.style[a]=g(c.a,c.end,c.pos)}});d.fx.step.borderColor=function(b){if(!b.init)b.end=f(b.end);var a=h.slice(2,6);d.each(a,function(c,e){b.init||(b[e]={a:f(d(b.elem).css(e))});b.elem.style[e]=g(b[e].a,b.end,b.pos)});b.init=true}})(jQuery);

/*
jQuery Waypoints - v1.1
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($,k,m,i,d){var e=$(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){$.extend(this,{element:$(n),oldScroll:-99999,waypoints:[],didScroll:false,didResize:false,doScroll:$.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=$.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){$[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}$.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});$(n).scroll($.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout($.proxy(function(){this.doScroll();this.didScroll=false},this),$[m].settings.scrollThrottle)}},this)).resize($.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout($.proxy(function(){$[m]("refresh");this.didResize=false},this),$[m].settings.resizeThrottle)}},this));e.load($.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;$.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=$.fn[k].defaults.context,q,t=$(this);if(n&&n.context){u=n.context}if(!$.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?$.fn[k].defaults:q.waypoints[p].options,r=$.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=$.isWindow(u)?$[m]("viewportHeight"):$(u).height();return v-$(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:t.offset().top,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}});$[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=$(p);$.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1)}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){$.each(f,function(r,s){var q=$.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?$[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();$.each(s.waypoints,function(u,x){var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=$();$.each(f,function(o,p){$.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};$.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{$.error("Method "+n+" does not exist on jQuery "+k)}}}};$.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};$[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};$[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){$[m]("refresh")})})(jQuery,"waypoint","waypoints",this);

$(document).ready(function() {
    $("#show-personal").click(function(){
      $("#personal").show();
      $("#pro").hide();
      $("#enterprise").hide();
    })
    $("#show-pro").click(function(){
      $("#personal").hide();
      $("#pro").show();
      $("#enterprise").hide();
    })
    $("#show-enterprise").click(function(){
      $("#personal").hide();
      $("#pro").hide();
      $("#enterprise").show();
    })
    
    $("#page2").waypoint(function(event, direction) {
       if (direction === 'down') {
          console.log('page2');
          $("#page-color").animate({backgroundColor: 'rgba(25,148,255,0.5)'},1000)
       }
       else
        if(direction === 'up'){
          console.log('page2 up')
          $("#page-color").animate({background: 'none'},1000)
        }
    },{
      context: $("#page2").parent()
    });
    
    $("#page3").waypoint(function(event, direction) {
       if (direction === 'down') {
          console.log('page3');
          $("#page-color").animate({backgroundColor: 'rgba(255,0,0,0.5)'},1000)
       }
       else 
        if(direction === 'up'){
          $("#page-color").animate({backgroundColor: 'rgba(25,148,255,0.5)'},1000)
       }
    },{
      context: $("#page3").parent()
    });

    $("#page4").waypoint(function(event, direction) {
       if (direction === 'down') {
          console.log('page4');
          $("#page-color").animate({backgroundColor: 'rgba(96,0,179,0.5)'},1000);
       }
       else
        if(direction === 'up'){
          $("#page-color").animate({backgroundColor: 'rgba(255,0,0,0.5)'},1000);
        }
    },{
      context: $("#page4").parent()
    });
    
    $("#page5").waypoint(function(event, direction) {
       if (direction === 'down') {
          console.log('page5');
          $("#page-color").animate({backgroundColor: 'rgba(60,200,0,0.5)'},1000);
          
       }
       else
        if(direction === 'up'){
          $("#page-color").animate({backgroundColor: 'rgba(96,0,179,0.5)'},1000);
        }
    },{
      context: $("#page5").parent()
    });
    
    $("#page4").waypoint(function(event, direction){
      $('.personal').fadeIn(1000);
      console.log('service-group');
    },{
      context: $("#page4").parent(),
      triggerOnce: true
    })

    $("#page2").waypoint(function(){
      $("#text-trans2").animate({
        right: '50px'
      },800);

      $('#text-trans2').toggle(2000);

      $("#img-trans2").animate({
        left: '40px'
      },800);
      $('#img-trans2').toggle(2000);
      console.log('text-trans2');
    },{
      context: $("#page2").parent(),
      triggerOnce: false
    });

   $("#page3").waypoint(function(){
    $('.demo-icon1').toggleClass('animate',1000);
    $('.demo-icon2').toggleClass('animate',1000);
    $('.demo-icon3').toggleClass('animate',1000);
    $('.demo-icon4').toggleClass('animate',1000);

   }) 
});