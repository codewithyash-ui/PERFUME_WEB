// ==================== CART FUNCTIONALITY ====================
let cart = JSON.parse(localStorage.getItem('luxury_cart')) || [];

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showToast(`${product.name} added to cart ✨`);
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showToast('Item removed from cart');
    updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('luxury_cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSpans = document.querySelectorAll('#cart-count');
    cartSpans.forEach(span => {
        if (span) span.innerText = total;
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const subtotalElement = document.getElementById('subtotal');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><button class="btn-gold" onclick="location.href=\'shop.html\'">Shop Now</button></div>';
        if (cartTotalElement) cartTotalElement.innerText = '₹0';
        if (subtotalElement) subtotalElement.innerText = '₹0';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="cart-item-total">₹${(item.price * item.quantity).toLocaleString()}</div>
        </div>
    `).join('');
    
    const total = getCartTotal();
    if (cartTotalElement) cartTotalElement.innerText = `₹${total.toLocaleString()}`;
    if (subtotalElement) subtotalElement.innerText = `₹${total.toLocaleString()}`;
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    if (!couponInput) return;
    
    if (couponInput.value.toUpperCase() === 'LUXE15') {
        showToast('Coupon applied! 15% discount');
        const total = getCartTotal();
        const discounted = total * 0.85;
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) cartTotalElement.innerText = `₹${discounted.toLocaleString()}`;
        localStorage.setItem('cart_discount', 15);
    } else {
        showToast('Invalid coupon code', true);
    }
}

// Make functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.applyCoupon = applyCoupon;
window.getCartTotal = getCartTotal;

// Initialize cart display on page load
if (document.getElementById('cart-items')) {
    updateCartDisplay();
    updateCartCounter();
}