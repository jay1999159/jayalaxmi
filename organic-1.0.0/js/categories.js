$(document).ready(function () {
  getrecentblogs();
  getrecentblogsss();
    getBestSellingProducts();
    getBfeaturedProducts();
    getcategories();

});





  function getrecentblogs() {
    $.ajax({
      url: '../cards.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        let html = '';

        $.each(data, function (index, card) {
          html += `
            <div class="col-md-4">
              <div class="card shadow-sm">
                <div class="card_img">
                  <img src="${card.image}" alt="image_${index + 1}" class="w-100">
                </div>
                <div class="cardbody">
                  <h4>${card.title}</h4>
                  <p>${card.description}</p>
                </div>
              </div>
            </div>
          `;
        });

        // Append into the .row inside #dynamic_sec
        $('#dynamic_sec .row').html(html);
      },
      error: function () {
        $('#dynamic_sec .row').html('<div class="col-12 text-center">Failed to load cards.</div>');
      }
    });
  };

function getrecentblogsss() {
  $.ajax({
    url: '../blogs.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      let html = '';

      $.each(data, function (index, card) {
        html += `
          <div class="col-md-4">
            <article class="post-item card border-0 shadow-sm p-3">
              <div class="image-holder zoom-effect">
                <a href="#">
                  <img src="${card.image}" alt="post" class="card-img-top">
                </a>
              </div>
              <div class="card-body">
                <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                  <div class="meta-date">
                    <svg width="16" height="16"><use xlink:href="#calendar"></use></svg>${card.date}
                  </div>
                  <div class="meta-categories">
                    <svg width="16" height="16"><use xlink:href="#category"></use></svg>${card.category}
                  </div>
                </div>
                <div class="post-header">
                  <h3 class="post-title">
                    <a href="#" class="text-decoration-none">${card.title}</a>
                  </h3>
                  <p>${card.description}</p>
                </div>
              </div>
            </article>
          </div>
        `;
      });

      // Append to the blog wrapper inside #latest-blog
      $('#latest-blog .container-lg .row:last').html(html);
    },
    error: function () {
      $('#latest-blog .container-lg .row:last').html('<div class="col-12 text-center">Failed to load blog posts.</div>');
    }
  });
}
function getBestSellingProducts() {
  $.ajax({
    url: '../products.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      let html = '';

    data.forEach(function (product, index) {
  if (!product || !product.title) return;

  // Generate star rating HTML
  let starHTML = '<i class="fa fa-star text-warning"></i>'.repeat(Math.round(product.rating || 0));

  // Check cart
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let inCart = cartItems.some(item => item.title === product.title);

  let quantityValue = inCart ? 0 : 1;

  let actionBtn = inCart
    ? `<a href="#" class="btn btn-outline-danger rounded-1 p-2 fs-7 btn-remove-cart" data-id="${index}">
         <svg width="18" height="18"><use xlink:href="#trash"></use></svg> Remove from Cart
       </a>`
    : `<a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart" data-id="${index}">
         <svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart
       </a>`;

  html += `
    <div class="col">
      <div class="product-item">
        <figure>
          <a href="#" title="${product.title}">
            <img src="${product.image}" alt="${product.title}" class="tab-image">
          </a>
        </figure>
        <div class="d-flex flex-column text-center">
          <h3 class="fs-6 fw-normal">${product.title}</h3>
          <div>
            <span class="rating">${starHTML}</span>
            <span>(${product.reviews || 0})</span>
          </div>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <del>$${(product.originalPrice || 0).toFixed(2)}</del>
            <span class="text-dark fw-semibold">$${(product.discountedPrice || 0).toFixed(2)}</span>
            <span class="badge px-1 fs-7">${product.discount || "0%"} OFF</span>
          </div>
          <div class="button-area p-3 pt-0">
            <div class="row g-1 mt-2">
              <div class="col-3">
  <input type="number" class="form-control border-dark-subtle quantity" value="${quantityValue}">
</div>

              <div class="col-7">
                ${actionBtn}
              </div>
              <div class="col-2">
                <a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6">
                  <svg width="18" height="18"><use xlink:href="#heart"></use></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
});


      $('.product-grid').html(html);
    // Add to Cart
$('.btn-cart').on('click', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const qty = $(this).closest('.row').find('.quantity').val();
  const product = data[index];
  if (!product) return;

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const existing = cartItems.find(p => p.title === product.title);
  if (existing) {
    existing.quantity += parseInt(qty);
  } else {
    product.quantity = parseInt(qty);
    cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  window.location.href = "cart.html";
});

// Remove from Cart
$('.btn-remove-cart').on('click', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const product = data[index];
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItems = cartItems.filter(p => p.title !== product.title);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert(`${product.title} removed from cart.`);
  location.reload(); // refresh to re-render button as "Add to Cart"
});




    
    },
    
    error: function () {
      $('.product-grid').html('<div class="col-12 text-center">Failed to load products.</div>');
    }
  });
}

function getBfeaturedProducts() { 
  $.ajax({
    url: '../feauredproducts.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      let html = '';

      data.forEach(function (product) {
        // Create stars from rating
        let fullStars = Math.floor(product.rating);
        let halfStar = product.rating % 1 >= 0.5;
        let starHTML = '';

        for (let i = 0; i < fullStars; i++) {
          starHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>`;
        }
        if (halfStar) {
          starHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-half"></use></svg>`;
        }

        html += `
          <div class="product-item swiper-slide">
            <figure>
              <a href="index.html" title="${product.title}">
                <img src="${product.image}" alt="${product.title}" class="tab-image">
              </a>
            </figure>
            <div class="d-flex flex-column text-center">
              <h3 class="fs-6 fw-normal">${product.title}</h3>
              <div>
                <span class="rating">${starHTML}</span>
                <span>(${product.reviews})</span>
              </div>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <del>$${product.originalPrice.toFixed(2)}</del>
                <span class="text-dark fw-semibold">$${product.discountedPrice.toFixed(2)}</span>
                <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                  ${product.discount} OFF
                </span>
              </div>
              <div class="button-area p-3 pt-0">
                <div class="row g-1 mt-2">
                  <div class="col-3">
                    <input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="1">
                  </div>
                  <div class="col-7">
                    <a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                      <svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart
                    </a>
                  </div>
                  <div class="col-2">
                    <a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6">
                      <svg width="18" height="18"><use xlink:href="#heart"></use></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      });

      $('#feautured-section').html(html);
    },
    error: function () {
      $('#feautured-section').html('<div class="col-12 text-center">Failed to load products.</div>');
    }
  });
}

function getcategories() {
  $.ajax({
    url: '../categories.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      let html = '';

      $.each(data, function (index, card) {
        html += `
          <a href="${card.link}" class="nav-link swiper-slide text-center">
            <img src="${card.image}" class="rounded-circle" alt="Category Thumbnail">
            <h4 class="fs-6 mt-3 fw-normal category-title">${card.title}</h4>
          </a>
        `;
      });

      $('#categories-sec').html(html);
    },
    error: function () {
      $('#categories-sec').html('<div class="col-12 text-center">Failed to load blog posts.</div>');
    }
  });
}
