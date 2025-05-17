import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { FilterInputComponent } from './components/filter-input.component';
import { PostsListComponent } from './components/posts-list.component';
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  declarations: [
    PostsComponent,
    FilterInputComponent,
    PostsListComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    PostsRoutingModule,
  ],
})
export class PostsModule {}
