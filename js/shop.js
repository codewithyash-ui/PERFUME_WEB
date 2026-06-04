// Shop page functionality
let allProducts = [...window.products];

function renderShopProducts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || 'all';
    const maxPrice = parseInt(document.getElementById('price-filter')?.value || 15000);
    const sortBy = document.getElementById('sort-filter')?.value || 'default';
    
    let filtered = allProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || p.category === category;
        const matchesPrice = p.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort
    if (sortBy === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    else if (sortBy === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
    
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="window.location.href='product-details.html?id=${p.id}'">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">₹${p.price.toLocaleString()}</div>
            <button class="btn-gold" onclick="event.stopPropagation(); window.addToCartFromAnywhere(${p.id}, '${p.name}', ${p.price}, '${p.image}')">Add to Cart</button>
            <i class="far fa-heart" style="display: block; margin-top: 10px; cursor: pointer; color: var(--gold);" onclick="event.stopPropagation(); window.toggleWishlist(${p.id})"></i>
        </div>
    `).join('');
}

// Update price display
function updatePriceValue() {
    const priceInput = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    if (priceInput && priceValue) {
        priceValue.innerText = priceInput.value;
    }
}

// Event listeners
if (document.getElementById('search-input')) {
    document.getElementById('search-input').addEventListener('input', renderShopProducts);
    document.getElementById('category-filter').addEventListener('change', renderShopProducts);
    document.getElementById('price-filter').addEventListener('input', (e) => {
        updatePriceValue();
        renderShopProducts();
    });
    document.getElementById('sort-filter').addEventListener('change', renderShopProducts);
    updatePriceValue();
    renderShopProducts();
}