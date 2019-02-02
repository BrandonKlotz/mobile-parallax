
var app = {
        
    animationFrameHandler: null,
    background: $(".parallaxBG"),
    flare: $(".flare"),
    body: $("body"),
    logo: $('.truth-logo'),
    pageWidth : $(window).width(),
    pageHeight : $(window).height(),
    midpoint: { x: window.innerWidth/2, y: window.innerHeight/2  },
    limit: {  x: 20,  y: 20 ,
        device:{
            x:30,
            y:35
        }
    },    
    target: { x: 0, y:  0 },
    curPos: { x: 0, y:  0 },
    isMobile: false,
    easing: 0.1,

    init: function() {
        
        this.isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
        var self = this;
        
        if(this.isMobile && window.DeviceOrientationEvent) {        
            
            window.addEventListener('deviceorientation', function(eventData){self.deviceMove(eventData)}, false);        
            this.limit.x = this.limit.device.x;
            this.limit.y = this.limit.device.y;
                    
        }else{
        
            $(document).on('mousemove', $.proxy(this.mouseMove,this));                
        }
        this.sizePage();    
        this.render();        
        $(window).resize($.proxy(this.sizePage, this));
    },
   
    sizePage: function () {

        this.background[0].style.position = "absolute";
        this.background[0].style.width = 100 +  this.limit.x + "%";
        this.background[0].style.height = 100 + this.limit.y + "%";
        this.background[0].style.left = -this.limit.x/2+'%';
        this.background[0].style.top = -this.limit.y/2+'%';

        this.body[0].style.width = 100 +  this.limit.x + "%";
        this.body[0].style.height = 100 + this.limit.y + "%";
      
    },
    mouseMove: function (e) {

        this.body[0].style.backgroundImage = "linear-gradient(" + ((e.pageX / 4) - (e.pageY / 4)) + "deg, midnightblue, purple, teal)";       
        
        this.target.x = -(e.pageX - this.midpoint.x) / this.limit.x;
        this.target.y = -(e.pageY - this.midpoint.y) / this.limit.y;
         
    },
     

    deviceMove: function (a) {
               
        this.body[0].style.backgroundImage = "linear-gradient(" + (a.gamma - 100) + "deg, rgb(" + (a.beta - 100) + "," + (a.gamma - 100) + "," + (a.gamma - 500) + "), rgb(" + (a.gamma - 100) + "," + (a.beta - 100) + "," + (a.beta - 500) + "))";       

        this.target.x = a.gamma * 2; //exaggeration 
        this.target.y = a.beta * 3;

    },

    update:function(){

        this.curPos.x += (this.target.x - this.curPos.x) * this.easing;
        this.curPos.y += (this.target.y - this.curPos.y) * this.easing;

        this.draw();

    },
    draw: function(){
        
        TweenLite.set(this.background, 
                {
                    x:this.curPos.x,
                    y:this.curPos.y,                                    
                });
    },

    render: function(){
        
        var self = this;
        this.update();        
        this.animationFrameHandler = window.requestAnimationFrame(function () {
            self.render();
        });
    },
   
   shutdown : function () {
        window.cancelAnimationFrame(this.animationFrameHandler);    
    }
        
};

$(document).ready(function(){
                    
        app.init();           
});




