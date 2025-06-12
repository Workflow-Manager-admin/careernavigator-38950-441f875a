import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * DataUSAService
 * Service for fetching career statistics (growth, demand, salary, etc.) from the DataUSA API.
 */
@Injectable({
  providedIn: 'root'
})
export class DataUSAService {
  // Sample endpoint, replace with actual DataUSA API endpoint and parameters.
  private readonly BASE_URL = 'https://datausa.io/api/data';

  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  /**
   * Returns career statistics (such as growth, demand, salary) for a given occupation/profession.
   * @param occupation SOC code or occupation string
   */
  getCareerStats(occupation: string): Observable<any> {
    // Sample request - adapt parameters for real endpoint.
    // Example: `${this.BASE_URL}?drilldowns=Occupation&measures=Average+Wage&Occupation=${occupation}`
    return this.http.get<any>(`${this.BASE_URL}?mockOccupation=${occupation}`);
  }
}
