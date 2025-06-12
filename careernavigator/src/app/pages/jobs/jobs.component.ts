import { Component } from '@angular/core';
import { JobOpportunitiesComponent } from './job-opportunities.component';

/**
 * JobsComponent acts as a container/wrapper for JobOpportunitiesComponent.
 */
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [JobOpportunitiesComponent],
  template: `
    <app-job-opportunities></app-job-opportunities>
  `
})
export class JobsComponent {}
