
import React from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-center text-4xl font-bold tracking-tight">About YumVenture</h1>
          <p className="mb-8 text-center text-xl text-muted-foreground">
            Bringing fresh, delicious food directly to your doorstep since 2024.
          </p>
          
          <div className="mb-12 aspect-video overflow-hidden rounded-lg">
            <img 
              src="/placeholder.svg" 
              alt="YumVenture Team" 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                YumVenture was born from a simple idea: make it easy for people to access high-quality, 
                fresh food without the hassle of grocery shopping. Our founders, passionate food enthusiasts 
                themselves, recognized that busy schedules often lead to compromised food choices.
              </p>
              <p className="mt-4 text-muted-foreground">
                What started as a small operation serving our local neighborhood has grown into a 
                service that delivers to homes across the city, while maintaining our commitment to 
                quality, freshness, and exceptional customer service.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                We believe that everyone deserves access to fresh, high-quality food. Our mission is 
                to make nutritious, delicious ingredients and meals accessible to all, supporting 
                healthy eating habits without sacrificing convenience.
              </p>
              <p className="mt-4 text-muted-foreground">
                We're committed to sourcing from local farms and producers whenever possible, 
                reducing food waste through careful inventory management, and using sustainable 
                packaging to minimize our environmental footprint.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="mb-4 text-2xl font-bold">What Makes Us Different</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-food-lightOrange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-food-orange">
                      <path d="M12 22v-5"></path><path d="M9 8h6"></path><path d="m15 8-3-6-3 6"></path><path d="M12 17v-4.5"></path><path d="M7 10v4.5C7 17 9 19 12 19"></path><path d="M14.5 14.5c1 2-1 4-3 6"></path><path d="M7 10c-1.5 2 0 5 3 3.5"></path><path d="M17 10v4.5c0 .3 0 .6-.1.8"></path><path d="M17 10c1.5 2 0 5-3 3.5"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Farm-Fresh Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    We source directly from local farms for maximum freshness.
                  </p>
                </div>
                
                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-food-lightGreen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-food-green">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="16" x2="16" y1="8" y2="16"></line><line x1="8" x2="8" y1="8" y2="16"></line><line x1="12" x2="12" y1="8" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Curated Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Every product is taste-tested and quality approved.
                  </p>
                </div>
                
                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-food-lightOrange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-food-orange">
                      <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"></path><path d="M12 12v.01"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Sustainable Practices</h3>
                  <p className="text-sm text-muted-foreground">
                    Eco-friendly packaging and responsible sourcing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
