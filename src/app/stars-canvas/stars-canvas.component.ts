import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stars-canvas',
  templateUrl: './stars-canvas.component.html',
  styleUrls: ['./stars-canvas.component.scss']
})
export class StarsCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('stars') starsCanvas: ElementRef;
  @Input('stars-count') starsCount: number = 500;
  stars: Star[];
  context: CanvasRenderingContext2D;
  animateInterval: number;
  canvasW: number;
  canvasH: number;
  fps = 60;
  fpsInterval = 1000 / this.fps;
  now: number;
  then: number;
  constructor() { 
    this.stars = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = this.starsCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    const canvasBoundingClientRect = this.starsCanvas.nativeElement.getBoundingClientRect();
    this.canvasW = canvasBoundingClientRect.width;
    this.canvasH = canvasBoundingClientRect.height;
    	// Create all the stars
    for(var i = 0; i < this.starsCount; i++) {
      var x = Math.round(Math.random() * this.canvasW);
      var y = Math.round(Math.random() * this.canvasH);
      var length = 0.2;
      var opacity = Math.random();
      
      // Create a new star and draw
      var star = new Star(x, y, length, opacity, this.context, this.canvasW, this.canvasH);
      
      // Add the the stars array
      this.stars.push(star);
    }
    this.startAnimating();
  }

  startAnimating() {
    this.then = Date.now();
    console.log(this.stars);
    this.animateInterval = requestAnimationFrame(this.animate.bind(this));
  }

  animate(delta) {
    this.animateInterval = requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    const elapsed = this.now - this.then;
    // limit fps.
    if (elapsed > this.fpsInterval) {
      this.then = this.now - (elapsed % this.fpsInterval);
      this.context.clearRect(0, 0, this.canvasW, this.canvasH);
      for (let star of this.stars) {
        star.draw();
      }
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animateInterval);
  }

}

class Star {
  x: number;
	y: number;
	length: number;
	opacity: number;
	factor: number;
	increment: number;
  context: CanvasRenderingContext2D;
  canvasW: number;
  canvasH: number;

  constructor(x: number, y: number, length: number, opacity: number, context: CanvasRenderingContext2D, canvasW: number, canvasH: number) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * .03;
    this.context = context;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  draw() {
    this.context.rotate((Math.PI * 1 / 10));
    
    // Save the context
    this.context.save();
    
    // move into the middle of the canvas, just to make room
    this.context.translate(this.x, this.y);
    
    // Change the opacity
    if(this.opacity > 1) {
      this.factor = -1;
    }
    else if(this.opacity <= 0) {
      this.factor = 1;
      
      this.x = Math.round(Math.random() * this.canvasW);
      this.y = Math.round(Math.random() * this.canvasH);
    }      
    this.opacity += this.increment * this.factor;
    
    this.context.beginPath()
    for (var i = 5; i--;) {
      this.context.lineTo(0, this.length);
      this.context.translate(0, this.length);
      this.context.rotate((Math.PI * 2 / 10));
      this.context.lineTo(0, - this.length);
      this.context.translate(0, - this.length);
      this.context.rotate(-(Math.PI * 6 / 10));
    }
    this.context.lineTo(0, this.length);
    this.context.closePath();
    this.context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
    this.context.shadowBlur = 5;
    this.context.shadowColor = '#fff';
    this.context.fill();
    
    this.context.restore();
  }
}