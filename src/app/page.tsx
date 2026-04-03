 // app/page.tsx - Complete Lettuce Print Homepage                            
   import type { Metadata } from 'next'                                         
                                                                                
   export const metadata: Metadata = {                                          
     title: 'Lettuce Print | Print Shop & Graphic Design — Brooklyn, NYC',      
     description: 'Lettuce Print is a full-service print shop and graphic       
 design studio in Brooklyn, NY. Business cards, banners, flyers, stickers, roll 
 labels, packaging, and logo design. Fast turnaround, price match guarantee,    
 and Uber delivery across all five NYC boroughs.',                              
     keywords: 'print shop Brooklyn, printing services NYC, graphic design      
 Brooklyn, business cards NYC, banner printing Brooklyn',                       
   }                                                                            
                                                                                
   export default function HomePage() {                                         
     return (                                                                   
       <>                                                                       
         {/* Custom cursor elements */}                                         
         <div id="cur"></div>                                                   
         <div id="cur-ring"></div>                                              
                                                                                
         {/* Navigation */}                                                     
         <nav>                                                                  
           <a href="/" className="nav-logo">🥬 Lettuce Print</a>                
           <ul className="nav-links">                                           
             <li><a href="#services">Services</a></li>                          
             <li><a href="#work">Work</a></li>                                  
             <li><a href="#about">About</a></li>                                
             <li><a href="/blog">Blog</a></li>                                  
             <li><a href="#contact">Contact</a></li>                            
           </ul>                                                                
           <a href="#contact" className="nav-cta">Get a Free Quote →</a>        
         </nav>                                                                 
                                                                                
         {/* Hero Section */}                                                   
         <section className="hero" id="home">                                   
           <div className="hero-top-row">                                       
             <div className="hero-left-col">                                    
               <p className="hero-desc rv">Brooklyn's neighborhood print shop   
 and graphic design studio. Business cards, banners, stickers, labels, and more 
 — with same-day Uber delivery to anywhere in NYC.</p>                          
               <h1 className="big-head rv">Brooklyn's <em>best</em><br/>print   
 shop &<br/><em>design studio.</em></h1>                                        
             </div>                                                             
             <div className="hero-photo rv">                                    
               <img                                                             
 src="https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b26 
 8~mv2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_302,h_238,al_c,q_80,usm_0.66_ 
 1.00_0.01,enc_avif,quality_auto/Vinyl.jpg" alt="Lettuce Print Brooklyn studio" 
  />                                                                            
               <span className="hero-photo-badge">📍 361 Stagg St,              
 Brooklyn</span>                                                                
             </div>                                                             
           </div>                                                               
                                                                                
           <div className="hero-cards-row rv">                                  
             <div className="hcard pink">                                       
               <img                                                             
 src="https://static.wixstatic.com/media/8523d8_c2b844fe8e72457faba4ed5feff8902 
 e~mv2.jpg/v1/crop/x_604,y_386,w_1092,h_860/fill/w_302,h_238,al_c,q_80,usm_0.66 
 _1.00_0.01,enc_avif,quality_auto/dabPal_posterMock.jpg" alt="Graphic design    
 work" />                                                                       
               <span className="hcard-label">Graphic Design</span>              
             </div>                                                             
             <div className="hcard green" style={{position: 'relative'}}>       
               <img                                                             
 src="https://static.wixstatic.com/media/8523d8_7e2af34100b34fa6b7888e7e766d25c 
 a~mv2.jpg/v1/fill/w_600,h_482,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_au 
 to/Full-Service-Lettuce-Print-Banner-Mockup.jpg" alt="Custom vinyl banner      
 printing" />                                                                   
               <div className="talk-bubble">Let's Print! 🖨️</div>               
               <span className="hcard-label">Banners</span>                     
             </div>                                                             
             <div className="hcard yellow">                                     
               <img                                                             
 src="https://static.wixstatic.com/media/8523d8_39ab6ee0e5924ac59265eccee623696 
 7~mv2.jpg/v1/crop/x_0,y_740,w_3024,h_2552/fill/w_302,h_238,al_c,q_80,usm_0.66_ 
 1.00_0.01,enc_avif,quality_auto/Flyers_JPG.jpg" alt="Flyer printing" />        
               <span className="hcard-label">Flyers</span>                      
             </div>                                                             
             <div className="hcard brown">                                      
               <img                                                             
 src="https://static.wixstatic.com/media/8523d8_2cf0196a4b64446cad7340d21166666 
 2~mv2.jpg/v1/fill/w_587,h_587,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_au 
 to/8523d8_2cf0196a4b64446cad7340d211666662~mv2.jpg" alt="Custom roll labels"   
 />                                                                             
               <span className="hcard-label">Roll Labels</span>                 
             </div>                                                             
             <div className="hcard blue">                                       
               <span className="hcard-emoji">📦</span>                          
               <span className="hcard-label">Packaging</span>                   
             </div>                                                             
           </div>                                                               
                                                                                
           <div className="hero-bottom rv">                                     
             <div className="hero-actions">                                     
               <a href="#services" className="btn-pill-dark">See What We Print  
 →</a>                                                                          
               <a href="#work" className="btn-pill-outline">Vie w Our Work</a>  
             </div>                                                             
             <div className="hero-stats">                                       
               <div className="hs"><div className="hs-n">500+</div><div         
 className="hs-l">Projects Delivered</div></div>                                
               <div className="hs"><div className="hs-n">200+</div><div         
 className="hs-l">NYC Clients Served</div></div>                                
               <div className="hs"><div className="hs-n">3–5</div><div          
 className="hs-l">Day Turnaround</div></div>                                    
             </div>                                                             
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Ticker */}                                                         
         <div className="ticker" aria-hidden="true">                            
           <div className="ticker-track">                                       
             <span className="ti">Business Cards</span><span                    
 className="ti">Flyers</span><span className="ti">Banners</span>                
             <span className="ti">Stickers</span><span className="ti">Roll      
 Labels</span><span className="ti">Packaging</span>                             
             <span className="ti">Logo Design</span><span                       
 className="ti">Menus</span><span className="ti">Posters</span>                 
             <span className="ti">Uber Delivery NYC 🚗</span><span              
 className="ti">Vinyl Wraps</span>                                              
             <span className="ti">Business Cards</span><span                    
 className="ti">Flyers</span><span className="ti">Banners</span>                
             <span className="ti">Stickers</span><span className="ti">Roll      
 Labels</span><span className="ti">Packaging</span>                             
             <span className="ti">Logo Design</span><span                       
 className="ti">Menus</span><span className="ti">Posters</span>                 
             <span className="ti">Uber Delivery NYC 🚗</span><span              
 className="ti">Vinyl Wraps</span>                                              
           </div>                                                               
         </div>                                                                 
                                                                                
         {/* Uber Bar */}                                                       
         <div className="uber-bar">                                             
           <div className="uber-bar-inner">                                     
             <span className="uber-icon">🚗</span>                              
             <div>                                                              
               <div className="uber-title">Uber Delivery Available Across All   
 Five NYC Boroughs</div>                                                        
               <div className="uber-sub">Need your order fast? We deliver       
 prints directly to your door in Brooklyn, Manhattan, Queens, the Bronx, and    
 Staten Island — same day when you order before noon.</div>                     
             </div>                                                             
           </div>                                                               
           <a href="#contact" className="uber-cta">Order & Get It Delivered     
 →</a>                                                                          
         </div>                                                                 
                                                                                
         {/* About Section */}                                                  
         <section className="about-section" id="about">                         
           <div className="about-left">                                         
             <div className="section-tag rv">/// Who We Are</div>               
             <h2 className="section-head rv">Brooklyn's print                   
 shop,<br/><em>built for NYC.</em></h2>                                         
             <p className="about-body rv">Lettuce Print is a full-service print 
 shop and graphic design studio located at 361 Stagg St in Bushwick, Brooklyn.  
 We help restaurants, retailers, startups, event planners, and brands of every  
 size across all five boroughs look their best — on paper, on walls, and        
 everywhere in between.</p>                                                     
             <div className="tag-list rv">                                      
               <span className="pill-tag">🚗 Uber Delivery to All NYC           
 Boroughs</span>                                                                
               <span className="pill-tag">Rush & Same-Day Orders</span>         
               <span className="pill-tag">Price Match Guarantee</span>          
               <span className="pill-tag">Eco-Friendl y Inks</span>             
               <span className="pill-tag">Walk-ins Welcome</span>               
             </div>                                                             
           </div>                                                               
           <div className="about-right">                                        
             <div className="about-map-wrap rv">                                
               <iframe                                                          
                                                                                
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.3!2d-73.9378!3 
 d40.7069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c04d4b87e5b% 
 3A0x1a2b3c4d5e6f7a8b!2s361+Stagg+St%2C+Brooklyn%2C+NY+11206!5e0!3m2!1sen!2sus! 
 4v1680000000000!5m2!1sen!2sus"                                                 
                 loading="lazy"                                                 
                 referrerPolicy="no-referrer-when -downgrade"                   
                 title="Lettuce Print location"                                 
               />                                                               
             </div>                                                             
             <div className="about-map-info rv">                                
               <div className="map-info-cell">                                  
                 <div className="map-info-label">Address</div>                  
                 <div className="map-info-val"><a                               
 href="https://maps.google.com/?q=361+Stagg+St+Brooklyn+NY+11206"               
 target="_blank" rel="noopener">361 Stagg St<br/>Brooklyn, NY 11206</a></div>   
               </div>                                                           
               <div className="map-info-cell">                                  
                 <div className="map-info-label">Hours</div>                    
                 <div className="map-info-val">Mon–Fri<br/>9am – 6pm</div>      
               </div>                                                           
               <div className="map-info-cell">                                  
                 <div className="map-info-label">Phone</div>                    
                 <div className="map-info-val"><a href="tel:3476030557">(347)   
 603-0557</a></div>                                                             
               </div>                                                           
               <div className="map-info-cell">                                  
                 <div className="map-info-label">Delivery</div>                 
                 <div className="map-info-val">🚗 Uber delivery<br/>all NYC     
 boroughs</div>                                                                 
               </div>                                                           
             </div>                                                             
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Services Section */}                                               
         <section className="services-section" id="services">                   
           <div className="services-top rv">                                    
             <h2 className="svc-head">Printing & design<br/><em>for all of      
 NYC.</em></h2>                                                                 
             <p className="svc-desc">From a single business card to a full      
 brand system — if it can be printed or designed, we do it. Walk in, call, or   
 order online and we'll Uber it to your door.</p>                               
           </div>                                                               
           <div className="svc-list rv">                                        
             <div className="svc-item">                                         
               <span className="svc-num">01</span>                              
               <div className="svc-icon-bubble" style={{background:             
 '#fff0f5'}}>🖨️</div>                                                           
               <div className="svc-name">Commercial Printing</div>              
               <div className="svc-detail">Business cards, flyers, posters,     
 postcards, brochures, and large-format banners for NYC businesses of every     
 size. Fast turnaround, competitive pricing, Uber delivery available.</div>     
               <div className="svc-arrow">↗</div>                               
             </div>                                                             
             <div className="svc-item">                                         
               <span className="svc-num">02</span>                              
               <div className="svc-icon-bubble" style={{background:             
 '#fff8e0'}}>🎨</div>                                                           
               <div className="svc-name">Graphic Design</div>                   
               <div className="svc-detail">Logo design, menus, packaging,       
 social graphics, and full brand identity — built by our in-house Brooklyn team 
 trained at Parsons School of Design.</div>                                     
               <div className="svc-arrow">↗</div>                               
             </div>                                                             
             <div className="svc-item">                                         
               <span className="svc-num">03</span>                              
               <div className="svc-icon-bubble" style={{background:             
 '#e8f3e9'}}>📦</div>                                                           
               <div className="svc-name">Labels & Packaging</div>               
               <div className="svc-detail">Custom roll labels, hang tags, and   
 retail-ready product packaging for Brooklyn and NYC consumer brands. Fine      
 detail, production-spec printing, fast delivery.</div>                         
               <div className="svc-arrow">↗</div>                               
             </div>                                                             
             <div className="svc-item">                                         
               <span className="svc-num">04</span>                              
               <div className="svc-icon-bubble" style={{background:             
 '#e8f0ff'}}>🌱</div>                                                           
               <div className="svc-name">Brand Identity & Strategy</div>        
               <div className="svc-detail">Complete brand makeovers for         
 restaurants, startups, and NYC businesses ready to grow. Logo, print           
 collateral, visual guidelines — everything you need to look the part.</div>    
               <div className="svc-arrow">↗</div>                               
             </div>                                                             
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Work Section - THIS WAS MISSING! */}                               
         <section className="work-section" id="work">                           
           <div className="work-header">                                        
             <h2 className="work-head rv">Recent <em>NYC work.</em></h2>        
             <a href="#contact" className="btn-pill-outline rv">See All Work    
 →</a>                                                                          
           </div>                                                               
           <div className="work-strip">                                         
             <div className="wcard c1"><div className="wcard-bg">🏷️</div><div   
 className="wcard-tag">Roll Labels · Brooklyn</div><div                         
 className="wcard-name">Claudine Farms</div></div>                              
             <div className="wcard c2"><div className="wcard-bg">🎉</div><div   
 className="wcard-tag">Event Flyers · NYC</div><div className="wcard-name">On   
 The Revel</div></div>                                                          
             <div className="wcard c3"><div className="wcard-bg">🖼️</div><div   
 className="wcard-tag">Poster Design</div><div className="wcard-name">Dab       
 Pals</div></div>                                                               
             <div className="wcard c4"><div className="wcard-bg">🏳️</div><div   
 className="wcard-tag">Vinyl Banners</div><div className="wcard-name">Event     
 Wall Graphics</div></div>                                                      
             <div className="wcard c5"><div className="wcard-bg">💼</div><div   
 className="wcard-tag">Brand Identity</div><div className="wcard-name">Brooklyn 
 Startup</div></div>                                                            
             <div className="wcard c6"><div className="wcard-bg">📮</div><div   
 className="wcard-tag">Postcards · Manhattan</div><div                          
 className="wcard-name">Hospitali ty Brand</div></div>                          
             <div className="wcard c7"><div className="wcard-bg">📦</div><div   
 className="wcard-tag">Product Packaging</div><div className="wcard-name">CPG   
 Brand NYC</div></div>                                                          
             <div className="wcard c1"><div className="wcard-bg">🏷️</div><div   
 className="wcard-tag">Roll Labels · Brooklyn</div><div                         
 className="wcard-name">Claudine Farms</div></div>                              
             <div className="wcard c2"><div className="wcard-bg">🎉</div><div   
 className="wcard-tag">Event Flyers · NYC</div><div className="wcard-name">On   
 The Revel</div></div>                                                          
             <div className="wcard c3"><div className="wcard-bg">🖼️</div><div   
 className="wcard-tag">Poster Design</div><div className="wcard-name">Dab       
 Pals</div></div>                                                               
             <div className="wcard c4"><div className="wcard-bg">🏳️</div><div   
 className="wcard-tag">Vinyl Banners</div><div className="wcard-name">Event     
 Wall Graphics</div></div>                                                      
             <div className="wcard c5"><div className="wcard-bg">💼</div><div   
 className="wcard-tag">Brand Identity</div><div className="wcard-name">Brooklyn 
 Startup</div></div>                                                            
             <div className="wcard c6"><div className="wcard-bg">📮</div><div   
 className="wcard-tag">Postcards · Manhattan</div><div                          
 className="wcard-name">Hospitali ty Brand</div></div>                          
             <div className="wcard c7"><div className="wcard-bg">📦</div><div   
 className="wcard-tag">Product Packaging</div><div className="wcard-name">CPG   
 Brand NYC</div></div>                                                          
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Testimonials Section - THIS WAS MISSING TOO! */}                   
         <section className="testi-section">                                    
           <div className="testi-label rv">What our NYC clients are             
 saying</div>                                                                   
           <div className="testi-scroll">                                       
             <div className="tcard tc1">                                        
               <div className="tcard-quote">"Lettuce Print nailed our product   
 packaging. The roll labels came out exactly right for retail — clean,          
 detailed, and on time. Best print shop in Brooklyn."</div>                     
               <div className="tcard-person"><div                               
 className="tcard-avatar">👩</div><div><div className="tcard-name">Maya         
 C.</div><div className="tcard-role">Founder, Brooklyn CPG                      
 Brand</div></div></div>                                                        
             </div>                                                             
             <div className="tcard tc2">                                        
               <div className="tcard-quote">"Ordered event banners last minute  
 and they delivered — literally, via Uber — same day. Quality was incredible.   
 Lettuce Print is the real deal."</div>                                         
               <div className="tcard-person"><div                               
 className="tcard-avatar">🧑</div><div><div className="tcard-name">Marcus       
 T.</div><div className="tcard-role">Event Producer, NYC</div></div></div>      
             </div>                                                             
             <div className="tcard tc3">                                        
               <div className="tcard-quote">"Their graphic design team          
 completely transformed our brand. New logo, new menus, new packaging. Parsons  
 trained — and it absolutely shows in the work."</div>                          
               <div className="tcard-person"><div                               
 className="tcard-avatar">👩‍💼</div><div><div className="tcard-name">Jasmine      
 R.</div><div className="tcard-role">Restauran t Owner,                         
 Brooklyn</div></div></div>                                                     
             </div>                                                             
             <div className="tcard tc4">                                        
               <div className="tcard-quote">"Walked in off the street with no   
 appointment and left same day with beautiful flyers. Friendly team, fast       
 service, and the quality is unmatched anywhere in NYC."</div>                  
               <div className="tcard-person"><div                               
 className="tcard-avatar">🧑‍🎤</div><div><div className="tcard-name">Devon        
 A.</div><div className="tcard-role">Creative Director, NYC</div></div></div>   
             </div>                                                             
             <div className="tcard tc5">                                        
               <div className="tcard-quote">"They matched our old printer's     
 quote AND delivered better quality. No contest. Lettuce Print is our go-to for 
 everything — printing, design, the works."</div>                               
               <div className="tcard-person"><div                               
 className="tcard-avatar">👨‍💻</div><div><div className="tcard-name">Alex         
 K.</div><div className="tcard-role">Startup Founder,                           
 Manhattan</div></div></div>                                                    
             </div>                                                             
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Contact Section */}                                                
         <section className="contact-section" id="contact">                     
           <div className="contact-left rv">                                    
             <h2>Start your<br/><em>project today.</em></h2>                    
             <div className="contact-method">                                   
               <div className="contact-method-label">Email</div>                
               <a href="mailto:info@lettuceprint.c om"                          
 className="contact-method-link">                                               
                 <span className="contact-arrow">→</span>info@lettuceprint.com  
               </a>                                                             
             </div>                                                             
             <div className="contact-method">                                   
               <div className="contact-method-label" >Call or Text</div>        
               <a href="tel:3476030557" className="contact-method-link">        
                 <span className="contact-arrow">→</span>(347) 603-0557         
               </a>                                                             
             </div>                                                             
             <div className="contact-method">                                   
               <div className="contact-method-label" >Visit Our Brooklyn        
 Studio</div>                                                                   
               <a                                                               
 href="https://maps.google.com/?q=361+Stagg+St+Brooklyn+NY+11206"               
 target="_blank" rel="noopener" className="contact-method-link">                
                 <span className="contact-arrow">→</span>361 Stagg St, Brooklyn 
 NY 11206                                                                       
               </a>                                                             
             </div>                                                             
           </div>                                                               
           <div className="contact-right rv">                                   
             <span className="big-emoji">🥬</span>                              
             <h3>We'll get back to you<br/><em>within the hour.</em></h3>       
             <p>Drop us a message and our Brooklyn team will follow up fast —   
 usually within the hour. Rush printing, same-day turnaround, and Uber delivery 
 across NYC all available.</p>                                                  
             <div className="contact-form">                                     
               <input className="cf-input" type="text" placeholder="Your Name"  
 />                                                                             
               <input className="cf-input" type="email" placeholder="Email      
 Address" />                                                                    
               <input className="cf-input" type="tel" placeholder="Phone Number 
 (optional)" />                                                                 
               <input className="cf-input" type="text" placeholder="Company or  
 Brand (optional)" />                                                           
               <textarea className="cf-textarea" placeholder="What do you need? 
 Printing, graphic design, rush order, Uber delivery — tell us everything and   
 we'll get you a quote."></textarea>                                            
               <button className="cf-submit">Send Message →</button>            
             </div>                                                             
           </div>                                                               
         </section>                                                             
                                                                                
         {/* Footer */}                                                         
         <footer>                                                               
           <div className="footer-top">                                         
             <div className="footer-brand">                                     
               <a href="/" className="footer-logo">🥬 Lettuce Print</a>         
               <p>Brooklyn's print shop and graphic design studio. Serving      
 businesses, restaurants, and brands across all five NYC boroughs. Uber         
 delivery available.</p>                                                        
             </div>                                                             
           </div>                                                               
         </footer>                                                              
       </>                                                                      
     )                                                                          
   }     
