import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * KaviaAiService
 * Service for generating AI-powered career recommendations (via OpenAI, Kavia AI, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class KaviaAiService {
  // Sample endpoint, replace with real endpoint for OpenAI/Kavia AI backend proxy if available.
  private readonly BASE_URL = 'https://api.example.com/career-recommendations';

  constructor(private http: HttpClient) {
    // LINT: explicitly use variable for now
    this.http.toString();
  }

  // PUBLIC_INTERFACE
  /**
   * Get career recommendations for a given user profile or input.
   * @param userProfile Arbitrary object representing user's profile
   */
  getCareerRecommendations(userProfile: any): Observable<any> {
    // In production, POST the user profile/prompt to an API endpoint (OpenAI, Kavia AI, etc.)
    return this.http.post<any>(this.BASE_URL, userProfile);
  }
}
