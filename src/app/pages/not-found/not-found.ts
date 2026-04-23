import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MaterialModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
