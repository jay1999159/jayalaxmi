$(document).ready(function () {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let tbody = '';
  let subtotal = 0;

  if (cartItems.length === 0) {
    tbody = `<tr><td colspan="6" class="text-center">Your cart is empty 🛒</td></tr>`;
  } else {
    cartItems.forEach((item, index) => {
      let total = item.discountedPrice * item.quantity;
      subtotal += total;

      tbody += `
        <tr data-index="${index}">
          <td><img src="${item.image}" alt="${item.title}" class="cart-img" style="width: 70px;"></td>
          <td>${item.title}<br><small class="text-muted">${item.description || ''}</small></td>
          <td>₹${item.discountedPrice}</td>
          <td><input type="number" class="form-control w-50 mx-auto cart-qty" value="${item.quantity}" min="1"></td>
          <td class="item-total">₹${total}</td>
          <td><button class="btn btn-outline-danger btn-sm btn-remove">Remove</button></td>
        </tr>`;
    });
  }

  $('tbody').html(tbody);
  $('.cart-total strong:contains("₹")').text(`₹${subtotal}`);
  $('.cart-total span:contains("₹")').first().text(`₹${subtotal}`);

  // Remove product
  $('.btn-remove').on('click', function () {
    let row = $(this).closest('tr');
    let index = row.data('index');
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload(); // reload to update cart
  });

  // Update quantity
  $('.cart-qty').on('change', function () {
    let newQty = parseInt($(this).val());
    let row = $(this).closest('tr');
    let index = row.data('index');

    cartItems[index].quantity = newQty;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload(); // reload to update totals
  });
});
