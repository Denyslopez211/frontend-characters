import { Component, Input } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
})
export class TitleComponent {
  @Input({ required: true }) title!: string;
}
