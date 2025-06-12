import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * JSearchService
 * Service for fetching job opportunities and listings from the JSearch API.
 */
@Injectable({
  providedIn: 'root'
})
export class JSearchService {
  // Sample endpoint, replace with actual JSearch API endpoint and credentials.
  private readonly BASE_URL = 'https://jsearch.p.rapidapi.com/search';

  constructor(private http: HttpClient) {
    // LINT: explicitly use variable for now
    this.http.toString();
  }

  // PUBLIC_INTERFACE
  /**
   * Search jobs by occupation or keyword.
   * @param query Search term or occupation
   */
  searchJobs(query: string): Observable<any> {
    // Add required HTTP headers (API key, host) when integrating with live API.
    // This is a placeholder/simple GET for development.
    return this.http.get<any>(`${this.BASE_URL}?query=${encodeURIComponent(query)}`);
  }
}
