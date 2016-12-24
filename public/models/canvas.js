(function(){
  'use strict'

  class LoadingAnimation{
    constructor(data){
      this.field = document.getElementById(data.id);
      this.ctx = this.field.getContext('2d');
      this.field.height = data.height || 40;
      this.field.width  = data.width || 240;
      this.ctx.clearRect(0, 0, this.field.width, this.field.height);
      this.strokeStyle = data.color || "rgba(16,128,255, 0.9)";
      this.top_bottom = Math.round(this.field.height/20);
      this.left_right = Math.round(this.field.width/40);
      this.border = this.left_right;
      this.count=0;
      this.load_elem_height = this.field.height-2*(this.border+this.top_bottom);
      this.load_elem_width = Math.round((this.field.width-2*(this.border) -11*this.left_right)/10);
      this.left_right = Math.round((this.field.width-2*this.border-this.load_elem_width*10)/11);
      this.speed = data.speed || 5000;
      this.draw_border();
    }

    draw_border(color){
      let width = this.field.width, height = this.field.height;
      this.ctx.lineWidth = this.border;
      this.ctx.strokeStyle = color||this.strokeStyle;
      this.ctx.strokeRect(0, 0, width, height);
    }
    
    draw_load_elem(x, y, w, h, type="rect", color){
      this.ctx.fillStyle = color||this.strokeStyle;
      if(type=="rect"){
        this.ctx.fillRect(x, y, w, h);
      }else if(type=="circle"){
        this.ctx.beginPath();
        this.ctx.arc(x+w/2, y+h/2, w*0.6, 0, 2*Math.PI, false);
        this.ctx.fill();
      }
    }

    run_animation(){
      this.timerId = setInterval(function(){
        if(this.count===10){
          this.ctx.clearRect(0, 0, this.field.width, this.field.height);
          this.draw_border();
          this.count=0;
        }
        this.draw_load_elem(this.border+this.left_right*(this.count+1)+this.count*this.load_elem_width,
         this.border+this.top_bottom, this.load_elem_width, this.load_elem_height, this.count%2?"rect":"circle");
        this.count++;
      }.bind(this), Math.round(this.speed/10));

    }

    stop_animation(){
      this.ctx.clearRect(0, 0, this.field.width, this.field.height);
      clearInterval(this.timerId);
    }

  }

  window.LoadingAnimation = LoadingAnimation;
})();
