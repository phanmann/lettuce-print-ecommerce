import type { Metadata } from 'next'                                         
   import './globals.css'                                                       
                                                                                
   export const metadata: Metadata = {                                          
     title: {                                                                   
       default: 'Lettuce Print | Print Shop & Graphic Design — Brooklyn, NYC',  
       template: '%s | Lettuce Print Brooklyn'                                  
     },                                                                         
     description: 'Lettuce Print is a full-service print shop and graphic       
 design studio in Brooklyn, NY. Business cards, banners, flyers, stickers, roll 
 labels, packaging, and logo design. Fast turnaround, price match guarantee,    
 and Uber delivery across all five NYC boroughs.',                              
     keywords: 'print shop Brooklyn, printing services NYC, graphic design      
 Brooklyn, business cards NYC, banner printing Brooklyn, stickers NYC, roll     
 labels Brooklyn, packaging design NYC, logo design Brooklyn, flyer printing    
 NYC, poster printing Brooklyn, vinyl printing NYC',                            
     authors: [{ name: 'Lettuce Print' }],                                      
     creator: 'Lettuce Print',                                                  
     publisher: 'Lettuce Print',                                                
     formatDetection: {                                                         
       email: false,                                                            
       address: false,                                                          
       telephone: false,                                                        
     },                                                                         
     metadataBase: new URL('https://lettuce-print-ecommerce.vercel.app'),       
     alternates: {                                                              
       canonical: '/',                                                          
     },                                                                         
     openGraph: {                                                               
       title: 'Lettuce Print | Brooklyn Print Shop & Graphic Design',           
       description: 'Full-service print shop and graphic design studio in       
 Brooklyn, NY. Fast turnaround, competitive pricing, Uber delivery across all   
 NYC boroughs.',                                                                
       url: 'https://lettuce-print-ecommerce.vercel.app',                       
       siteName: 'Lettuce Print',                                               
       images: [                                                                
         {                                                                      
           url:                                                                 
 'https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b268~mv 
 2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_1200,h_630,al_c,q_80,usm_0.66_1.0 
 0_0.01,enc_avif,quality_auto/Vinyl.jpg',                                       
           width: 1200,                                                         
           height: 630,                                                         
           alt: 'Lettuce Print Brooklyn studio workspace',                      
         },                                                                     
       ],                                                                       
       locale: 'en_US',                                                         
       type: 'website',                                                         
     },                                                                         
     twitter: {                                                                 
       card: 'summary_large_image',                                             
       title: 'Lettuce Print | Brooklyn Print Shop & Graphic Design',           
       description: 'Full-service print shop and graphic design studio in       
 Brooklyn, NY. Fast turnaround, competitive pricing, Uber delivery across all   
 NYC boroughs.',                                                                
       images:                                                                  
 ['https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b268~m 
 v2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_1200,h_630,al_c,q_80,usm_0.66_1. 
 00_0.01,enc_avif,quality_auto/Vinyl.jpg'],                                     
     },                                                                         
     robots: {                                                                  
       index: true,                                                             
       follow: true,                                                            
       googleBot: {                                                             
         index: true,                                                           
         follow: true,                                                          
         'max-video-preview': -1,                                               
         'max-image-preview': 'large',                                          
         'max-snippet': -1,                                                     
       },                                                                       
     },                                                                         
   }                                                                            
                                                                                
   export default function RootLayout({                                         
     children,                                                                  
   }: {                                                                         
     children: React.ReactNode                                                  
   }) {                                                                         
     return (                                                                   
       <html lang="en">                                                         
         <head>                                                                 
           <link rel="icon" href="/favicon.ico" />                              
           <link rel="apple-touch-icon" sizes="180x180"                         
 href="/apple-touch-icon.png" />                                                
           <link rel="icon" type="image/png" sizes="32x32"                      
 href="/favicon-32x32.png" />                                                   
           <link rel="icon" type="image/png" sizes="16x16"                      
 href="/favicon-16x16.png" />                                                   
           <meta name="theme-color" content="#2e6b38" />                        
           <meta name="viewport" content="width=device-width, initial-scale=1"  
 />                                                                             
           <script                                                              
             type="application/ld+json"                                         
             dangerouslySetInnerHTML={{                                         
               __html: JSON.stringify({                                         
                 "@context": "https://schema.org",                              
                 "@type": "LocalBusiness",                                      
                 "name": "Lettuce Print",                                       
                 "image":                                                       
 "https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b268~mv 
 2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_1200,h_630,al_c,q_80,usm_0.66_1.0 
 0_0.01,enc_avif,quality_auto/Vinyl.jpg",                                       
                 "@id": "https://lettuce-print-ecommerce.vercel.app",           
                 "url": "https://lettuce-print-ecommerce.vercel.app",           
                 "telephone": "(347) 603-0557",                                 
                 "address": {                                                   
                   "@type": "PostalAddress",                                    
                   "streetAddress": "361 Stagg St",                             
                   "addressLocality": "Brooklyn",                               
                   "addressRegion": "NY",                                       
                   "postalCode": "11206",                                       
                   "addressCountry": "US"                                       
                 },                                                             
                 "geo": {                                                       
                   "@type": "GeoCoordinates",                                   
                   "latitude": 40.7069,                                         
                   "longitude": -73.9378                                        
                 },                                                             
                 "openingHours": ["Mo-Fr 09:00-18:00"],                         
                 "sameAs": [],                                                  
                 "description": "Full-service print shop and graphic design     
 studio in Brooklyn, NY. Business cards, banners, flyers, stickers, roll        
 labels, packaging, and logo design.",                                          
                 "servesCuisine": [],                                           
                 "priceRange": "$$",                                            
                 "areaServed": ["Brooklyn", "Manhattan", "Queens", "Bronx",     
 "Staten Island"]                                                               
               })                                                               
             }}                                                                 
           />                                                                   
         </head>                                                                
         <body>                                                                 
           {children}                                                           
           <script dangerouslySetInnerHTML={{                                   
             __html: `                                                          
               // Custom cursor                                                 
               const cursor = document.getElementById('cur');                   
               const ring = document.getElementById('cur-rin g');               
                                                                                
               let mouseX = 0, mouseY = 0;                                      
               let ringX = 0, ringY = 0;                                        
                                                                                
               document.addEventListener('mouse move', (e) => {                 
                 mouseX = e.clientX;                                            
                 mouseY = e.clientY;                                            
                                                                                
                 if (cursor) {                                                  
                   cursor.style.left = mouseX + 'px';                           
                   cursor.style.top = mouseY + 'px';                            
                 }                                                              
               });                                                              
                                                                                
               function animateRing() {                                         
                 ringX += (mouseX - ringX) * 0.15;                              
                 ringY += (mouseY - ringY) * 0.15;                              
                                                                                
                 if (ring) {                                                    
                   ring.style.left = ringX + 'px';                              
                   ring.style.top = ringY + 'px';                               
                 }                                                              
                                                                                
                 requestAnimationFrame(animateRin g);                           
               }                                                                
               animateRing();                                                   
                                                                                
               // Scroll reveal animation                                       
               const observerOptions = {                                        
                 threshold: 0.1,                                                
                 rootMargin: '0px 0px -50px 0px'                                
               };                                                               
                                                                                
               const observer = new IntersectionObserver((entries) => {         
                 entries.forEach(entry => {                                     
                   if (entry.isIntersecting) {                                  
                     entry.target.classList.add('in') ;                         
                   }                                                            
                 });                                                            
               }, observerOptions);                                             
                                                                                
               document.addEventListener('DOMCo ntentLoaded', () => {           
                 document.querySelectorAll('.rv') .forEach(el =>                
 observer.observe(el));                                                         
               });                                                              
             `                                                                  
           }} />                                                                
         </body>                                                                
       </html>                                                                  
     )                                                                          
   }    
