import { Component } from '@angular/core';
import { KaviaAiService } from '../../services/kavia-ai.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * RecommendationsComponent uses KaviaAiService to provide AI-powered recommendations.
 * Shows loading, error states, and dynamic results.
 */
@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  template: `
    <section class="formal-panel">
      <h2>Recommendations</h2>
      <form (ngSubmit)="onSubmit()" #recommendForm="ngForm" style="margin-bottom:1em;">
        <label>
          Profile Focus:
          <input [(ngModel)]="userProfile.interest" name="interest" required placeholder="e.g. Data Science" [disabled]="loading" />
        </label>
        <button type="submit" [disabled]="loading || !userProfile.interest">Get Recommendations</button>
      </form>
      <ng-container *ngIf="loading">
        <span>Getting your recommendations...</span>
      </ng-container>
      <ng-container *ngIf="error && !loading">
        <div style="color:#d32f2f;">Error: {{ error }}</div>
      </ng-container>
      <ng-container *ngIf="recommendations && !loading && !error">
        <div>
          <strong>AI-driven Recommendations:</strong>
          <ul>
            <li *ngFor="let rec of recommendations">
              {{ rec.title }} <span *ngIf="rec.score">&ndash; Fit Score: {{ rec.score }}</span>
              <br><span style="color: #555;">{{ rec.description }}</span>
            </li>
          </ul>
        </div>
      </ng-container>
      <ng-container *ngIf="!recommendations && !loading && !error">
        <p>Enter an interest or focus area and get career track recommendations by AI.</p>
      </ng-container>
    </section>
  `
})
export class RecommendationsComponent {
  userProfile: any = { interest: 'Data Science' };
  recommendations: Array<{ title: string, description: string, score?: number }> | null = null;
  loading = false;
  error: string | null = null;

  constructor(private kaviaAi: KaviaAiService) {}

  // PUBLIC_INTERFACE
  onSubmit() {
    if (!this.userProfile.interest) return;
    this.getRecommendations(this.userProfile);
  }

  getRecommendations(profile: any) {
    this.loading = true;
    this.error = null;
    this.recommendations = null;
    this.kaviaAi.getCareerRecommendations(profile).subscribe({
      next: (resp) => {
        this.recommendations = (resp.recommendations as any[]) ?? [
          { title: 'Data Scientist', description: 'Apply analytics and machine learning to derive insights from data.', score: 92 },
          { title: 'ML Engineer', description: 'Develop and deploy machine learning models in production.', score: 88 },
          { title: 'Business Analyst', description: 'Bridge business problems with analytics-driven solutions.', score: 83 }
        ];
        this.loading = false;
      },
      error: (err) => {
        this.error = (err?.message || 'Failed to get recommendations');
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.getRecommendations(this.userProfile);
  }
}
