 'use client'                                                                 
                                                                                
   import { useEffect } from 'react'                                            
                                                                                
   export default function LettucePrintAnimations() {                           
     useEffect(() => {                                                          
       // Custom cursor setup                                                   
       const cursor = document.getElementById('cur')                            
       const ring = document.getElementById('cur-rin g')                        
                                                                                
       if (!cursor || !ring) return                                             
                                                                                
       let mouseX = 0, mouseY = 0                                               
       let ringX = 0, ringY = 0                                                 
       let isMoving = false                                                     
                                                                                
       const handleMouseMove = (e: MouseEvent) => {                             
         mouseX = e.clientX                                                     
         mouseY = e.clientY                                                     
         isMoving = true                                                        
                                                                                
         cursor.style.left = mouseX + 'px'                                      
         cursor.style.top = mouseY + 'px'                                       
                                                                                
         // Reset moving state                                                  
         clearTimeout(window.mouseMoveTim er)                                   
         window.mouseMoveTimer = setTimeout(() => {                             
           isMoving = false                                                     
         }, 100)                                                                
       }                                                                        
                                                                                
       const animateRing = () => {                                              
         ringX += (mouseX - ringX) * 0.15                                       
         ringY += (mouseY - ringY) * 0.15                                       
                                                                                
         ring.style.left = ringX + 'px'                                         
         ring.style.top = ringY + 'px'                                          
                                                                                
         requestAnimationFrame(animateRin g)                                    
       }                                                                        
                                                                                
       // Hover effects for interactive elements                                
       const handleMouseEnter = () => {                                         
         cursor.style.transform = 'scale(1.5)'                                  
         ring.style.transform = 'scale(1.8)'                                    
         ring.style.opacity = '0.8'                                             
       }                                                                        
                                                                                
       const handleMouseLeave = () => {                                         
         cursor.style.transform = 'scale(1)'                                    
         ring.style.transform = 'scale(1)'                                      
         ring.style.opacity = '0.4'                                             
       }                                                                        
                                                                                
       // Add event listeners                                                   
       document.addEventListener('mouse move', handleMouseMove)                 
                                                                                
       // Add hover effects to interactive elements                             
       const interactiveElements = document.querySelectorAll('a, button,        
 .hcard, .svc-item, .cf-input, .cf-textarea')                                   
       interactiveElements.forEach(el => {                                      
         el.addEventListener('mouseenter' , handleMouseEnter)                   
         el.addEventListener('mouseleave' , handleMouseLeave)                   
       })                                                                       
                                                                                
       // Start ring animation                                                  
       animateRing()                                                            
                                                                                
       // Scroll reveal animations                                              
       const observerOptions = {                                                
         threshold: 0.1,                                                        
         rootMargin: '0px 0px -50px 0px'                                        
       }                                                                        
                                                                                
       const observer = new IntersectionObserver((entries) => {                 
         entries.forEach(entry => {                                             
           if (entry.isIntersecting) {                                          
             entry.target.classList.add('in')                                   
           }                                                                    
         })                                                                     
       }, observerOptions)                                                      
                                                                                
       // Observe all elements with .rv class                                   
       const revealElements = document.querySelectorAll('.rv')                  
       revealElements.forEach(el => observer.observe(el))                       
                                                                                
       // Parallax effect for hero cards                                        
       const handleScroll = () => {                                             
         const scrolled = window.pageYOffset                                    
         const cards = document.querySelectorAll('.hcar d')                     
                                                                                
         cards.forEach((card, index) => {                                       
           const speed = 0.5 + (index * 0.1)                                    
           const yPos = -(scrolled * speed)                                     
           ;(card as HTMLElement).style.transform = `translateY(${yPos}px)`     
         })                                                                     
       }                                                                        
                                                                                
       window.addEventListener('scroll' , handleScroll)                         
                                                                                
       // Cleanup                                                               
       return () => {                                                           
         document.removeEventListener('mo usemove', handleMouseMove)            
         window.removeEventListener('scro ll', handleScroll)                    
         interactiveElements.forEach(el => {                                    
           el.removeEventListener('mouseent er', handleMouseEnter)              
           el.removeEventListener('mouselea ve', handleMouseLeave)              
         })                                                                     
         observer.disconnect()                                                  
       }                                                                        
     }, [])                                                                     
                                                                                
     return null                                                                
   }                                                                            
                                                                                
   // Extend Window interface for TypeScript                                    
   declare global {                                                             
     interface Window {                                                         
       mouseMoveTimer: NodeJS.Timeout                                           
     }                                                                          
   }
