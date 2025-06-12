import { Component } from '@angular/core';
import { DataUSAService } from '../../services/data-usa.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * GrowthStatisticsComponent fetches career statistics using DataUSAService.
 * Shows loading and error states, and displays dynamic/statistical results.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-growth-statistics',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  template: `
    <section class="formal-panel">
      <h2>Growth Statistics</h2>
      <form (ngSubmit)="onSubmit()" class="spaced" #form="ngForm" style="margin-bottom:1em;">
        <label>
          Occupation:
          <input [(ngModel)]="occupation" name="occupation" required placeholder="e.g. Software Engineer" [disabled]="loading" />
        </label>
        <button type="submit" [disabled]="loading || !occupation">Fetch Statistics</button>
      </form>
      <ng-container *ngIf="loading">
        <span>Loading statistics...</span>
      </ng-container>
      <ng-container *ngIf="error && !loading">
        <div style="color:#d32f2f;">Error: {{ error }}</div>
      </ng-container>
      <ng-container *ngIf="stats && !loading && !error">
        <div>
          <strong>Results for "{{ stats.occupation || occupation }}"</strong>
          <ul>
            <li>Growth: {{ stats.growth ?? 'N/A' }}</li>
            <li>Demand: {{ stats.demand ?? 'N/A' }}</li>
            <li>Median Salary: {{ stats.salary ?? 'N/A' }}</li>
          </ul>
          <pre *ngIf="stats | json as jsonStr"><code>{{ jsonStr }}</code></pre>
        </div>
      </ng-container>
      <ng-container *ngIf="!stats && !loading && !error">
        <p>Enter an occupation to view current career growth and salary data.</p>
      </ng-container>
    </section>
  `
})
export class GrowthStatisticsComponent {
  occupation = 'Software Engineer'; // Default occupation
  stats: any = null;
  loading = false;
  error: string | null = null;

  constructor(private dataUsa: DataUSAService) {}

  // PUBLIC_INTERFACE
  onSubmit() {
    if (!this.occupation) return;
    this.loadStats(this.occupation);
  }

  loadStats(occupation: string) {
    this.loading = true;
    this.error = null;
    this.stats = null;
    this.dataUsa.getCareerStats(occupation).subscribe({
      next: (data) => {
        this.stats = {
          occupation: occupation,
          growth: data.mockGrowth ?? '3.2%',
          demand: data.mockDemand ?? 'High',
          salary: data.mockSalary ?? '$105,000',
          ...data
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = (err?.message || 'Failed to fetch statistics');
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.loadStats(this.occupation);
  }
}
