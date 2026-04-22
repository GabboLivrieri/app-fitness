import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { Difficulty, DIFFICULTY_ICON } from '../models/difficulty-model';

@Directive({
  selector: '[appDifficulty]'
})
export class DifficultyDirective implements OnChanges {

  @Input('appDifficulty') difficulty!: Difficulty;

  private iconElement?: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.difficulty) return;

    const icon = DIFFICULTY_ICON[this.difficulty];

    if (this.iconElement) {
      this.renderer.removeChild(this.el.nativeElement, this.iconElement);
    }

    this.iconElement = this.renderer.createElement('span');
    this.renderer.addClass(this.iconElement, 'difficulty-icon');
    this.renderer.setStyle(this.iconElement, 'margin-left', '4px');
    this.renderer.setProperty(this.iconElement, 'innerText', icon);

    this.renderer.appendChild(this.el.nativeElement, this.iconElement);
  }
}