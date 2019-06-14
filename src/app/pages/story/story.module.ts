import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoryPage } from './story.page';
import { DragDirective } from 'src/app/directives/drag.directive';

const routes: Routes = [
  {
    path: '',
    component: StoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DragDirective,
    StoryPage
  ],
  exports: [
    DragDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StoryPageModule {}
