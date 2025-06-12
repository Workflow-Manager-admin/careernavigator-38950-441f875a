import { Component } from '@angular/core';
import { DataUSAService } from '../../services/data-usa.service';
import { HttpClientModule } from '@angular/common/http';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-growth-statistics',
  standalone: true,
  imports: [HttpClientModule],
  template: `<h2>Growth Statistics</h2>
    <p>Career growth, demand, and salary statistics will appear here. (placeholder)</p>`
})
export class GrowthStatisticsComponent {
  constructor(private dataUsa: DataUSAService) {
    // LINT: explicitly use variable for now
    this.dataUsa.toString();
  }

  // Future: Use this.dataUsa.getCareerStats('Software Engineer') to get statistics.
}
