import { Component } from '@angular/core';
import { KaviaAiService } from '../../services/kavia-ai.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [HttpClientModule],
  template: `<h2>Recommendations</h2><p>Your personalized career recommendations will appear here.</p>`
})
export class RecommendationsComponent {
  constructor(private kaviaAi: KaviaAiService) {
    // LINT: explicitly use variable for now
    this.kaviaAi.toString();
  }

  // Future: Use this.kaviaAi.getCareerRecommendations({ /* user profile */ }) for AI recommendations.
}
