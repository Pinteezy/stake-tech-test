import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostsListComponent } from './posts-list.component';
import { PostsListRoutingModule } from './posts-list-routing.module';

@NgModule({
  declarations: [PostsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    PostsListRoutingModule,
  ],
})
export class PostsListModule {}
