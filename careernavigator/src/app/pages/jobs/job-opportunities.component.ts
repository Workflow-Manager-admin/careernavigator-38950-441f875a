import { Component } from '@angular/core';
import { JSearchService } from '../../services/jsearch.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * JobOpportunitiesComponent fetches job opportunities via JSearchService.
 * Displays loading, error states, and returned mock/dynamic job data.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-job-opportunities',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  template: `
    <section class="formal-panel">
      <h2>Job Opportunities</h2>
      <form (ngSubmit)="onSubmit()" #form="ngForm" style="margin-bottom:1em;">
        <label>
          Job Search:
          <input [(ngModel)]="jobSearch" name="jobSearch" required placeholder="e.g. Software Engineer" [disabled]="loading" />
        </label>
        <button type="submit" [disabled]="loading || !jobSearch">Find Jobs</button>
      </form>
      <ng-container *ngIf="loading">
        <span>Finding current job openings...</span>
      </ng-container>
      <ng-container *ngIf="error && !loading">
        <div style="color:#d32f2f;">Error: {{ error }}</div>
      </ng-container>
      <ng-container *ngIf="jobs?.length && !loading && !error">
        <div>
          <strong>Jobs for "{{ jobSearch }}":</strong>
          <ul>
            <li *ngFor="let job of jobs">
              <span style="font-weight:600;">{{ job.title }}</span> at <span>{{ job.company }}</span>
              <div style="color:#777;">{{ job.location }} | {{ job.type }} | <a *ngIf="job.url" [href]="job.url" target="_blank">View</a></div>
            </li>
          </ul>
        </div>
      </ng-container>
      <ng-container *ngIf="!jobs?.length && !loading && !error">
        <p>Enter a job title or keyword to view relevant job opportunities.</p>
      </ng-container>
    </section>
  `
})
export class JobOpportunitiesComponent {
  jobSearch = 'Software Engineer';
  jobs: Array<{ title: string, company: string, location: string, type: string, url?: string }> = [];
  loading = false;
  error: string | null = null;

  constructor(private jsearch: JSearchService) {}

  // PUBLIC_INTERFACE
  onSubmit() {
    if (!this.jobSearch) return;
    this.searchJobs(this.jobSearch);
  }

  searchJobs(query: string) {
    this.loading = true;
    this.error = null;
    this.jobs = [];
    this.jsearch.searchJobs(query).subscribe({
      next: (resp) => {
        this.jobs = (resp.data as any[]) ?? [
          {
            title: 'Software Engineer',
            company: 'Tech Innovations LLC',
            location: 'Remote',
            type: 'Full-time',
            url: 'https://careers.example/job1'
          },
          {
            title: 'Full Stack Developer',
            company: 'WebApps Inc.',
            location: 'New York, NY',
            type: 'Contract',
            url: 'https://careers.example/job2'
          }
        ];
        this.loading = false;
      },
      error: (err) => {
        this.error = (err?.message || 'Failed to load jobs');
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.searchJobs(this.jobSearch);
  }
}
