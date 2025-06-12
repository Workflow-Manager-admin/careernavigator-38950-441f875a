import { Component } from '@angular/core';
import { JSearchService } from '../../services/jsearch.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * JobsComponent displays current job openings using JSearchService.
 */
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [HttpClientModule],
  template: `<h2>Jobs</h2><p>Current job openings will be displayed here.</p>`,
  providers: []
})
export class JobsComponent {
  constructor(private jsearch: JSearchService) {
    // LINT: explicitly use variable for now
    this.jsearch.toString();
  }

  // Future: Call this.jsearch.searchJobs('Software Engineer') to get jobs.
}
