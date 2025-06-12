import { Routes } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';

export const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'recommendations',
        loadComponent: () =>
          import('./pages/recommendations/recommendations.component').then(m => m.RecommendationsComponent)
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./pages/statistics/statistics.component').then(m => m.StatisticsComponent)
      },
      {
        path: 'growth-statistics',
        loadComponent: () =>
          import('./pages/statistics/growth-statistics.component').then(m => m.GrowthStatisticsComponent)
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./pages/jobs/jobs.component').then(m => m.JobsComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
];
