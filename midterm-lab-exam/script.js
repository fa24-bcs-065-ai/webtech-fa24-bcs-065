const cart = [];
const LIMIT = 3;

function updateBadge() {
  document.getElementById('badge').textContent = cart.length;
}

function updatePanel() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('cart-total');

  list.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center py-2 border-b text-sm gap-2';
    li.innerHTML =
      '<span class="flex-1">' + item.name + '</span>' +
      '<span>PKR ' + item.price.toLocaleString() + '</span>' +
      '<button class="remove-btn text-red-500 text-xs ml-2" data-index="' + index + '">Remove</button>';
    list.appendChild(li);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  total.textContent = 'Total: PKR ' + totalPrice.toLocaleString();

  document.querySelectorAll('.remove-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const idx = parseInt(btn.dataset.index);
      const removedName = cart[idx].name;
      cart.splice(idx, 1);

      document.querySelectorAll('.add-btn').forEach(function(addBtn) {
        const card = addBtn.closest('.product-card');
        const name = card.querySelector('.product-name').textContent;
        if (name === removedName) {
          const count = cart.filter(function(i) { return i.name === removedName; }).length;
          if (count < LIMIT) {
            addBtn.textContent = 'Add to Cart';
            addBtn.disabled = false;
          }
        }
      });

      updateBadge();
      updatePanel();
    });
  });
}

document.getElementById('cart-btn').addEventListener('click', function() {
  document.getElementById('mini-cart').classList.toggle('hidden');
});

document.querySelectorAll('.add-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent;
    const priceText = card.querySelector('.product-price').textContent;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));

    const count = cart.filter(function(item) { return item.name === name; }).length;
    if (count >= LIMIT) return;

    cart.push({ name: name, price: price });
    updateBadge();
    updatePanel();

    const newCount = cart.filter(function(item) { return item.name === name; }).length;
    if (newCount >= LIMIT) {
      btn.textContent = 'Limit reached';
      btn.disabled = true;
    }
  });
});
