import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('navMenu') navMenu!: ElementRef;
  @ViewChild('experienceCards') experienceCards!: ElementRef;

  ngAfterViewInit(): void {
    this.observeCards(); // Call method to observe experience cards
  }

  toggleMenu(): void {
    const nav = this.navMenu.nativeElement.querySelector('ul'); // Select the <ul> element
    if (nav) {
      nav.classList.toggle('nav-active');
    }
  }

  // Method to observe the experience cards and apply animation
  observeCards(): void {
    const cards = this.experienceCards.nativeElement.querySelectorAll('.experience-card'); // Select all experience cards
    const observerOptions = {
      root: null, // Use the viewport as the container
      threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add the 'visible' class to trigger animation
          observer.unobserve(entry.target); // Stop observing once card is visible
        }
      });
    }, observerOptions);

    cards.forEach((card: any) => {
      observer.observe(card); // Start observing each card
    });
  }
}
