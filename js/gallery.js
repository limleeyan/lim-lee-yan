/* ==========================================================================
   Design Gallery JavaScript - Lightbox Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
});

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // Check if lightbox exists
    if (!lightbox || !lightboxImg) {
        console.log('Lightbox elements not found');
        return;
    }
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        const overlayContent = item.querySelector('.overlay-content');
        const title = overlayContent?.querySelector('h3')?.textContent || item.querySelector('.gallery-item-overlay h3')?.textContent || '';
        const category = overlayContent?.querySelector('p')?.textContent || item.querySelector('.gallery-item-overlay p')?.textContent || '';
        
        return {
            src: video ? video.src : (img ? img.src : ''),
            alt: img ? img.alt : 'Video',
            title: title,
            category: category,
            isVideo: !!video
        };
    });

    // Video hover preview
    const videoItems = document.querySelectorAll('.gallery-video video');
    videoItems.forEach(video => {
        const container = video.closest('.gallery-item');
        
        container.addEventListener('mouseenter', () => {
            video.play();
        });
        
        container.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // Skip lightbox for external links
            if (item.classList.contains('gallery-item-link') || item.tagName === 'A') {
                return;
            }
            currentIndex = index;
            showLightbox();
        });
    });

    // Close lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });
    }

    // Next image
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        }
    });

    function showLightbox() {
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video if playing
        const lightboxMedia = document.getElementById('lightbox-img');
        if (lightboxMedia && lightboxMedia.tagName === 'VIDEO') {
            lightboxMedia.pause();
            lightboxMedia.currentTime = 0;
        }
    }

    function updateLightboxImage() {
        const media = images[currentIndex];
        
        if (media.isVideo) {
            // Replace image with video element
            if (lightboxImg.tagName === 'IMG') {
                const videoElement = document.createElement('video');
                videoElement.id = 'lightbox-img';
                videoElement.className = 'lightbox-content';
                videoElement.controls = true;
                videoElement.autoplay = true;
                lightboxImg.replaceWith(videoElement);
                // Update reference
                const newLightboxImg = document.getElementById('lightbox-img');
                newLightboxImg.src = media.src;
            } else {
                lightboxImg.src = media.src;
                lightboxImg.controls = true;
                lightboxImg.autoplay = true;
            }
        } else {
            // Replace video with image element if needed
            if (lightboxImg.tagName === 'VIDEO') {
                const imgElement = document.createElement('img');
                imgElement.id = 'lightbox-img';
                imgElement.className = 'lightbox-content';
                lightboxImg.replaceWith(imgElement);
                // Update reference
                const newLightboxImg = document.getElementById('lightbox-img');
                newLightboxImg.src = media.src;
                newLightboxImg.alt = media.alt;
            } else {
                lightboxImg.src = media.src;
                lightboxImg.alt = media.alt;
            }
        }
        
        if (media.title) {
            lightboxCaption.innerHTML = `<strong>${media.title}</strong> - ${media.category}`;
        } else {
            lightboxCaption.textContent = media.alt;
        }
    }
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Smooth scroll for back link
const backLink = document.querySelector('.back-link');
if (backLink && backLink.getAttribute('href').includes('#')) {
    backLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = this.getAttribute('href');
    });
}
