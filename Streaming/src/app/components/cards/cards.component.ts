import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() img!: string;
  @Input() title!: string;
  @Input() overview: string = '';
  @Input() index!: number;
}