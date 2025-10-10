

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('statsSection') statsSection!: ElementRef;

    slides = [
        {
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop',
            heading5: 'Innovating Global Supply Chains',
            heading1: 'Leading the Way in <span class="text-primary">Logistics</span> Excellence',
            paragraph: 'Experience seamless supply chain management with our cutting-edge logistics solutions, delivered with precision and care.'
        },
        {
            image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&h=1080&fit=crop',
            heading5: 'Your Cargo, Our Priority',
            heading1: 'Reliable <span class="text-primary">Deliveries</span>, Every Time',
            paragraph: 'Trust us with your most critical shipments. Our advanced tracking and dedicated team ensure timely and secure transportation.'
        },
        {
            image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=1080&fit=crop',
            heading5: 'Optimizing Efficiency',
            heading1: 'Smart Solutions for <span class="text-primary">Modern</span> Logistics',
            paragraph: 'Leverage our technology to streamline your operations, reduce costs, and gain a competitive edge in the market.'
        },
        {
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&h=1080&fit=crop', 
            heading5: 'Global Reach, Local Touch',
            heading1: 'Connecting the World with <span class="text-primary">Seamless</span> Logistics',
            paragraph: 'Expand your market with our extensive global network and personalized service, ensuring every shipment is handled with expertise.'
        }
    ];

    currentSlideIndex: number = 0;
    private slideInterval: any;

   
    customersCount: number = 0;
    cargosCount: number = 0;
    countriesCount: number = 0;
    successRate: number = 0;
    private statsAnimated: boolean = false;
    private observer!: IntersectionObserver;

    ngOnInit(): void {
        this.startAutoSlide();
    }

    ngAfterViewInit(): void {
        
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.statsAnimated) {
                        this.animateStatistics();
                        this.statsAnimated = true;
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (this.statsSection) {
            this.observer.observe(this.statsSection.nativeElement);
        }
    }

    ngOnDestroy(): void {
        this.stopAutoSlide();
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    startAutoSlide(): void {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); 
    }

    stopAutoSlide(): void {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    goToSlide(index: number): void {
        this.stopAutoSlide();
        this.currentSlideIndex = index;
        this.startAutoSlide();
    }

    nextSlide(): void {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    }

    prevSlide(): void {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    }

   
    private animateStatistics(): void {
        this.animateCounter('customers', 15000, 2000, (val) => this.customersCount = Math.floor(val));
        this.animateCounter('cargos', 50000, 2000, (val) => this.cargosCount = Math.floor(val));
        this.animateCounter('countries', 85, 2000, (val) => this.countriesCount = Math.floor(val));
        this.animateCounter('success', 99.8, 2000, (val) => this.successRate = parseFloat(val.toFixed(1)));
    }

    private animateCounter(
        name: string,
        target: number,
        duration: number,
        callback: (value: number) => void
    ): void {
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            callback(current);
        }, stepDuration);
    }
}









