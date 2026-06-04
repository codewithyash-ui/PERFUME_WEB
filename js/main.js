// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 800);
});

// ==================== BACK TO TOP ====================
window.onscroll = () => {
    const btn = document.getElementById('back-to-top');
    if (btn) {
        btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    }
};

document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== MOBILE MENU ====================
document.querySelector('.mobile-menu-btn')?.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.toggle('active');
});

// ==================== TOAST NOTIFICATION ====================
function showToast(message, isError = false) {
    const toast = document.getElementById('toast-msg');
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isError ? '#b91c1c' : '#d4af37';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==================== NEWSLETTER ====================
window.subscribeNewsletter = function() {
    const email = document.getElementById('newsEmail')?.value;
    if (!email) {
        showToast('Please enter your email', true);
        return;
    }
    showToast('Thank you! Your 15% off code: LUXE15');
    if (document.getElementById('newsEmail')) {
        document.getElementById('newsEmail').value = '';
    }
};

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card, .glass-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== PRODUCTS DATA ====================
window.products = [
    { 
        id: 1, 
        name: "Oud Royal", 
        price: 12500, 
        category: "oud", 
        image: "assets/images/oud-royal.jpg",
        isFeatured: true, 
        isBest: true, 
        isNew: false, 
        description: "A majestic blend of rare oud, saffron, and amberwood. The epitome of royal elegance.", 
        notes: "Top: Saffron, Bergamot | Heart: Oud, Rose | Base: Amber, Patchouli", 
        rating: 4.8, 
        reviews: 127 
    },
    { 
        id: 2, 
        name: "Midnight Bloom", 
        price: 8900, 
        category: "floral", 
        image: "assets/images/midnight-bloom.jpg",
        isFeatured: true, 
        isBest: true, 
        isNew: false, 
        description: "Intoxicating night-blooming jasmine with dark berries and vanilla.", 
        notes: "Top: Blackcurrant, Pear | Heart: Jasmine, Tuberose | Base: Vanilla, Musk", 
        rating: 4.6, 
        reviews: 89 
    },
    { 
        id: 3, 
        name: "Golden Amber", 
        price: 14500, 
        category: "amber", 
        image: "assets/images/golden-amber.jpg",
        isFeatured: true, 
        isBest: false, 
        isNew: true, 
        description: "Warm golden amber infused with vanilla, tonka bean, and incense.", 
        notes: "Top: Cinnamon, Orange | Heart: Amber, Labdanum | Base: Vanilla, Benzoin", 
        rating: 4.9, 
        reviews: 56 
    },
    { 
        id: 4, 
        name: "Santal Noir", 
        price: 11200, 
        category: "woody", 
        image: "assets/images/santal-noir.jpg",
        isFeatured: false, 
        isBest: true, 
        isNew: false, 
        description: "Creamy sandalwood wrapped in smoky papyrus and cashmeran.", 
        notes: "Top: Cardamom, Fig | Heart: Sandalwood, Cypriol | Base: Cashmeran, Musk", 
        rating: 4.7, 
        reviews: 94 
    },
    { 
        id: 5, 
        name: "Rose Royale", 
        price: 9900, 
        category: "floral", 
        image: "assets/images/rose-royale.jpg",
        isFeatured: false, 
        isBest: false, 
        isNew: true, 
        description: "Damascus rose with raspberry and leather. For the bold romantic.", 
        notes: "Top: Raspberry, Lychee | Heart: Rose, Peony | Base: Leather, Patchouli", 
        rating: 4.5, 
        reviews: 43 
    },
    { 
        id: 6, 
        name: "Velvet Oud", 
        price: 13800, 
        category: "oud", 
        image: "assets/images/velvet-oud.jpg",
        isFeatured: true, 
        isBest: true, 
        isNew: false, 
        description: "Silky smooth oud with violet and praline.", 
        notes: "Top: Violet, Bergamot | Heart: Oud, Rose | Base: Praline, Amber", 
        rating: 4.8, 
        reviews: 112 
    }
];

// ==================== RENDER PRODUCT GRIDS ====================
function renderProductGrid(containerId, filterFn) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    
    grid.innerHTML = window.products.filter(filterFn).map(p => `
        <div class="product-card" onclick="window.location.href='product-details.html?id=${p.id}'">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">₹${p.price.toLocaleString()}</div>
            <button class="btn-gold" onclick="event.stopPropagation(); window.addToCartFromAnywhere(${p.id}, '${p.name}', ${p.price}, '${p.image}')">Add to Cart</button>
            <i class="far fa-heart" style="display: block; margin-top: 10px; cursor: pointer; color: var(--gold);" onclick="event.stopPropagation(); window.toggleWishlist(${p.id})"></i>
        </div>
    `).join('');
}

// Helper for cart functions
window.addToCartFromAnywhere = function(id, name, price, image) {
    if (typeof addToCart === 'function') {
        addToCart({ id, name, price, image });
    } else {
        window.location.href = 'cart.html';
    }
};

window.toggleWishlist = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist ✨');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

// Initialize grids if on home page
if (document.getElementById('featured-grid')) {
    renderProductGrid('featured-grid', p => p.isFeatured);
    renderProductGrid('bestseller-grid', p => p.isBest);
    renderProductGrid('new-grid', p => p.isNew);
}