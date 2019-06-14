import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[drag]',
  host: {
    '[pan]': 'handlePan($event)'
  }
})
export class DragDirective {

  @Input('top') top: any = 0;
  @Input('left') left: any = 0;

  currentPosition: any = {
    y: 0,
    x: 0
  }

  constructor(
  public element: ElementRef,
  public renderer: Renderer,
  ) { }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute')
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.top + 'px')
    this.renderer.setElementStyle(this.element.nativeElement, 'left', this.left + 'px')
  }





  handlePan(ev){

    this.renderer.setElementStyle(this.element.nativeElement, 'top', ev.center.y + 'px')
    this.renderer.setElementStyle(this.element.nativeElement, 'left', ev.center.x + 'px')
  }





}
