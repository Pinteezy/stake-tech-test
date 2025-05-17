import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/posts-list/posts-list.module').then((m) => m.PostsListModule),
  },
  {
    path: 'posts/:id',
    loadChildren: () =>
      import('./features/post-detail/post-detail.module').then(
        (m) => m.PostDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
