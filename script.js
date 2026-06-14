// Theme Setup (Run immediately to prevent flash)
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 1. Cinematic Loading Sequence with GSAP ---
    const tl = gsap.timeline();

    tl.to("#loading-title", { opacity: 1, duration: 1.5, ease: "power2.inOut" })
        .to("#loading-subtitle", { opacity: 1, duration: 1, ease: "power2.inOut" }, "-=0.5")
        .to("#loading-screen", {
            opacity: 0, duration: 1.5, delay: 1.5, ease: "power2.inOut", onComplete: () => {
                document.getElementById('loading-screen').style.display = 'none';

                // Animate hero elements in
                gsap.fromTo(".gsap-hero > *",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
                );
                gsap.fromTo(".gsap-hero-right",
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.5"
                );
                initMemoryUniverse();
            }
        });


    // --- 1.5 Memory Universe Background ---
    const memoryOrbsData = [
        { url: './Memory/Me/z7927908345253_3ce74c972c558b9ace5d7777aec088e2.jpg', size: 120, x: 10, y: 10, z: 20 },
        { url: './Memory/Me/z7927908383716_f539f35eb2d0671d28924ca0f678704d.jpg', size: 90, x: 60, y: 20, z: -10 },
        { url: './Memory/Me/z7927924239397_6f994402f4a15a72d53cfbce7f7bb00c.jpg', size: 150, x: 30, y: 60, z: 30 },
        { url: './Memory/Me/z7927924254862_a4becef198b0b3dade53f6ca9c5a76ad.jpg', size: 100, x: 80, y: 70, z: 0 },
        { url: './Memory/Me/Screenshot%202026-06-13%20100621.png', size: 110, x: 50, y: 40, z: 10 }
    ];

    function initMemoryUniverse() {
        const container = document.getElementById('memory-universe-bg');
        if (!container) return;

        memoryOrbsData.forEach((orb, index) => {
            const el = document.createElement('div');
            el.className = 'memory-orb';
            el.style.width = `${orb.size}px`;
            el.style.height = `${orb.size}px`;
            el.style.left = `${orb.x}%`;
            el.style.top = `${orb.y}%`;
            el.style.backgroundImage = `url(${orb.url})`;
            el.style.animation = `orb-float ${15 + Math.random() * 10}s ease-in-out infinite`;
            el.style.animationDelay = `${Math.random() * 2}s`;

            // Make orb clickable
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => openOrbLightbox(orb.url));

            // Set initial z-index/depth for parallax
            el.setAttribute('data-z', orb.z);

            container.appendChild(el);
        });

        // Parallax effect on mouse move
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                document.querySelectorAll('.memory-orb').forEach(orb => {
                    const depth = parseFloat(orb.getAttribute('data-z')) || 10;
                    const moveX = x * depth;
                    const moveY = y * depth;
                    gsap.to(orb, {
                        x: moveX,
                        y: moveY,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
            });
        }
    }


    // --- 1.6 Memory Universe Photo Gallery ---
    const galleryData = [
        // Memory folder images
        { id: 1, url: './Memory/University/z7927908276350_af9f06b46749fddc31a9b499e96cab89.jpg', category: 'university', title: 'IT Camp', caption: 'Trying something new with a fire-breathing performance at the IT Camp.' },
        { id: 2, url: './Memory/University/z7927908400811_fcbe87a6382f0e95a768289f0bb2c7e0.jpg', category: 'university', title: 'Military Training', caption: 'Creating unforgettable memories with my teammates during military training.' },
        { id: 3, url: './Memory/University/z7927924223357_5eb9dfe3de329c725d87df9ff361d3da.jpg', category: 'university', title: 'International Exchange', caption: 'An opportunity to meet and connect with representatives from a Russian university.' },
        { id: 4, url: './Memory/Travel/z7927924224375_8b46acfeb847c229658785ca93930221.jpg', category: 'travel', title: 'Paddle Boarding', caption: 'Enjoying relaxing moments and new adventures with friends on the water.' },
        { id: 5, url: './Memory/Travel/z7927924254862_a4becef198b0b3dade53f6ca9c5a76ad.jpg', category: 'travel', title: 'Hoi An Ancient Town', caption: 'Exploring Hoi An Ancient Town in traditional ao dai and capturing memorable moments.' },
        { id: 6, url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', category: 'projects', title: 'The Art of Code', caption: 'Every line of code is a step towards building something meaningful.' },
        { id: 7, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop', category: 'projects', title: 'Creative Workspace', caption: 'A symbolic space where ideas are nurtured and brought to life.' },
        { id: 8, url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop', category: 'technology', title: 'Tech Exploration', caption: 'Continuously discovering and adapting to new technological advancements.' },
        { id: 9, url: './Memory/Sports/z7677052944830_c44b4a755f8386602e66d6c2192e2350.jpg', category: 'sports', title: 'IT League', caption: 'Giving my best on the field and embracing the spirit of teamwork.' },
        { id: 10, url: './Memory/Daily%20Life/z7927908341659_931af12673b133250e3cb3dc855a8944.jpg', category: 'dailylife', title: 'Study Corner', caption: 'A homemade lunch and a familiar place to study.' },
        { id: 11, url: './Memory/Daily%20Life/z7927908345253_3ce74c972c558b9ace5d7777aec088e2.jpg', category: 'dailylife', title: 'Cycling', caption: 'Enjoying peaceful moments along familiar roads.' },
        { id: 12, url: './Memory/Achieverments/z7927908304404_76f90b4b1bc298ea6f9c12de33094bbe.jpg', category: 'achievements', title: 'IT Camp Highlights', caption: 'Three awards, one journey of hard work and continuous learning.' },
        { id: 13, url: './Memory/Achieverments/z7931124079199_d501b8408a6035787c29c88147d2ba6a.jpg', category: 'achievements', title: 'Basketball Memories', caption: 'The tournament ends, but the memories remain.' },
        { id: 14, url: './Memory/Achieverments/z7933601502613_41114452f003684db0a00244a80f684e.jpg', category: 'achievements', title: 'IT Camp Award', caption: 'Representing the team in a memorable award moment.' },
        { id: 15, url: './Memory/Sports/z7933631098707_cf6a86af1393302fcc3861f0c8532519.jpg', category: 'sports', title: 'Volleyball Vibes', caption: 'Sweat, laughter, and a memorable match with teammates.' },
        { id: 16, url: './Memory/Travel/Screenshot%202026-06-14%20073751.png', category: 'travel', title: 'Minh Duc Pagoda', caption: 'A journey exploring Minh Duc Pagoda, one of the most impressive spiritual landmarks in Southeast Asia.' },
        { id: 17, url: './Memory/Projects/Screenshot%202026-06-14%20075047.png', category: 'projects', title: 'LifePilot', caption: 'Empowering productivity with a seamless goal-tracking and task management experience.' },
    ];

    let currentGalleryPhotos = galleryData.filter(item => item.category !== 'projects');
    let galleryIndex = 0;
    const photosPerLoad = 10;
    const masonryContainer = document.getElementById('masonry-gallery');
    const galleryLoader = document.getElementById('gallery-loader');

    let currentLightboxIndex = 0;

    function renderGalleryItems(items) {
        if (!masonryContainer) return;

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = `gallery-item category-${item.category}`;
            div.dataset.id = item.id;
            div.innerHTML = `
                <img src="${item.url}" alt="${item.title}" loading="lazy">
                <div class="gallery-category-badge uppercase">${item.category}</div>
                <div class="gallery-overlay">
                    <h4 class="text-white font-bold text-lg">${item.title}</h4>
                    <p class="text-white/80 text-sm mt-1">${item.caption}</p>
                </div>
            `;

            div.addEventListener('click', () => openLightbox(item.id));
            masonryContainer.appendChild(div);

            // simple reveal animation
            gsap.fromTo(div, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        });
    }

    function loadMorePhotos() {
        if (!masonryContainer) return;
        const nextPhotos = currentGalleryPhotos.slice(galleryIndex, galleryIndex + photosPerLoad);
        if (nextPhotos.length > 0) {
            if (galleryLoader) galleryLoader.classList.remove('hidden');
            // Simulate network delay
            setTimeout(() => {
                renderGalleryItems(nextPhotos);
                galleryIndex += photosPerLoad;
                if (galleryLoader) galleryLoader.classList.add('hidden');
            }, 500);
        }
    }

    // Initial load
    loadMorePhotos();

    // Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-gray-900/5', 'dark:bg-white/5', 'text-gray-900', 'dark:text-white');
                b.classList.add('bg-transparent', 'text-gray-600', 'dark:text-gray-400');
            });
            btn.classList.add('active', 'bg-gray-900/5', 'dark:bg-white/5', 'text-gray-900', 'dark:text-white');
            btn.classList.remove('bg-transparent', 'text-gray-600', 'dark:text-gray-400');

            const filter = btn.dataset.filter;

            // If we want a true re-render to handle masonry correctly without gaps:
            masonryContainer.innerHTML = '';
            galleryIndex = 0;

            if (filter === 'all') {
                currentGalleryPhotos = galleryData.filter(item => item.category !== 'projects');
            } else {
                currentGalleryPhotos = galleryData.filter(item => item.category === filter);
            }
            loadMorePhotos();
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let isOrbLightbox = false;
    let currentOrbLightboxIndex = 0;

    function openOrbLightbox(url) {
        if (!lightbox) return;

        isOrbLightbox = true;
        const index = memoryOrbsData.findIndex(item => item.url === url);
        if (index === -1) return;
        currentOrbLightboxIndex = index;

        updateOrbLightboxContent();

        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';

        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function updateOrbLightboxContent() {
        const item = memoryOrbsData[currentOrbLightboxIndex];
        if (!item) return;
        lightboxImg.src = item.url;
        lightboxCaption.textContent = "Memory";
    }

    function openLightbox(id) {
        if (!lightbox) return;
        isOrbLightbox = false;
        const index = currentGalleryPhotos.findIndex(item => item.id === id);
        if (index === -1) return;

        currentLightboxIndex = index;
        updateLightboxContent();

        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';

        lightbox.classList.remove('hidden');
        // small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    function updateLightboxContent() {
        const item = currentGalleryPhotos[currentLightboxIndex];
        if (!item) return;
        lightboxImg.src = item.url;
        lightboxCaption.textContent = item.title;
    }

    if (lightbox) {
        document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

        document.getElementById('lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            if (isOrbLightbox) {
                currentOrbLightboxIndex = (currentOrbLightboxIndex - 1 + memoryOrbsData.length) % memoryOrbsData.length;
                updateOrbLightboxContent();
            } else {
                currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryPhotos.length) % currentGalleryPhotos.length;
                updateLightboxContent();
            }
        });

        document.getElementById('lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            if (isOrbLightbox) {
                currentOrbLightboxIndex = (currentOrbLightboxIndex + 1) % memoryOrbsData.length;
                updateOrbLightboxContent();
            } else {
                currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryPhotos.length;
                updateLightboxContent();
            }
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Escape key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // Infinite Scroll observer for gallery
    if (galleryLoader) {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMorePhotos();
            }
        }, { rootMargin: '100px' });

        // Since the loader is hidden when done, we observe a dummy element at bottom, 
        // or just rely on scrolling. An easier way for infinite scroll:
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                // If we have more photos to load, load them
                if (galleryIndex < currentGalleryPhotos.length && galleryLoader.classList.contains('hidden')) {
                    loadMorePhotos();
                }
            }
        });
    }


    // --- 2. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            let zoom = 1;
            const bodyZoom = document.body.style.zoom;
            if (bodyZoom) {
                zoom = bodyZoom.endsWith('%') ? parseFloat(bodyZoom) / 100 : parseFloat(bodyZoom);
            }
            const posX = e.clientX / zoom;
            const posY = e.clientY / zoom;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- 3. Scroll Progress ---
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });

    // --- 4. Copy Email Logic ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            const icon = document.getElementById('email-icon');
            const actionText = document.getElementById('email-action-text');

            navigator.clipboard.writeText(email).then(() => {
                // Success visual feedback
                icon.className = 'ph ph-check-circle text-2xl text-green-500';
                actionText.textContent = 'Copied!';
                actionText.classList.add('text-green-500');

                setTimeout(() => {
                    icon.className = 'ph ph-envelope-simple text-2xl';
                    actionText.textContent = 'Copy Email';
                    actionText.classList.remove('text-green-500');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // --- 5. Intersection Observer for Reveals ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                );
                entry.target.classList.remove('reveal'); // Prevent repeating
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        reveal.style.opacity = 0; // hide initially
        revealObserver.observe(reveal);
    });

    // --- 5. Command Palette ---
    const cmdPalette = document.getElementById('cmd-palette');
    const cmdInput = cmdPalette.querySelector('input');

    document.addEventListener('keydown', (e) => {
        // Press "/" to open
        if (e.key === '/' && cmdPalette.classList.contains('hidden')) {
            e.preventDefault();
            cmdPalette.classList.remove('hidden');
            setTimeout(() => {
                cmdPalette.classList.remove('opacity-0');
                cmdInput.focus();
            }, 10);
        }
        // Press ESC to close
        if (e.key === 'Escape' && !cmdPalette.classList.contains('hidden')) {
            cmdPalette.classList.add('opacity-0');
            setTimeout(() => cmdPalette.classList.add('hidden'), 300);
        }
    });

    // Close when clicking outside
    cmdPalette.addEventListener('click', (e) => {
        if (e.target === cmdPalette) {
            cmdPalette.classList.add('opacity-0');
            setTimeout(() => cmdPalette.classList.add('hidden'), 300);
        }
    });

    // Close when clicking a link inside palette
    cmdPalette.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            cmdPalette.classList.add('opacity-0');
            setTimeout(() => cmdPalette.classList.add('hidden'), 300);
        });
    });


    // --- 6. Easter Egg: "hello jerry" ---
    let typed = "";
    document.addEventListener('keydown', (e) => {
        // Ignore single keys if input is focused
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

        typed += e.key.toLowerCase();
        if (typed.length > 11) {
            typed = typed.slice(-11);
        }

        if (typed === "hello jerry") {
            triggerGalaxyEasterEgg();
            typed = ""; // reset
        }
    });

    function triggerGalaxyEasterEgg() {
        const canvas = document.getElementById('galaxy-canvas');
        canvas.classList.remove('opacity-0');

        // Simple particle effect for galaxy
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        for (let i = 0; i < 300; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                color: Math.random() > 0.5 ? '#60a5fa' : '#c084fc',
                speedX: (Math.random() - 0.5) * 5,
                speedY: (Math.random() - 0.5) * 5
            });
        }

        function animate() {
            ctx.fillStyle = 'rgba(6, 8, 22, 0.2)'; // trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Fade out after 10 seconds
        setTimeout(() => {
            canvas.classList.add('opacity-0');
        }, 10000);
    }
});
