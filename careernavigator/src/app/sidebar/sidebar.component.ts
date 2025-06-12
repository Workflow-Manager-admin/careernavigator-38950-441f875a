import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * SidebarComponent: Navigation sidebar with responsive/collapsible behavior and accessibility support.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  collapsed = false;

  // PUBLIC_INTERFACE
  /**
   * Toggle sidebar collapsed state for mobile view.
   */
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    // Set ARIA attributes if necessary (handled in template).
  }
}
