function updateCartBadge () {
  const total = cartLS.list().length;
  if (total > 0) {
    $('#cart-badge').html(total);
    $('#cart-badge').removeClass('hide');
  }
}

function handleLogoutClick (event) {
  event.preventDefault();
  cartLS.destroy();
  window.location = '/auth/logout';
}

function currencyFormatter (value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}

function getMediaUrl (path = '') {
  if (path.includes('https://') || path.includes('http://')) {
    return path
  }

  return window.__env__.MEDIA_URL + path
}

function getRatingStarsHTML ({ totalRatings, ratingAvg, hideAvgAndTotal }) {
  const totalStar = 5;
  const starPercent = (ratingAvg / totalStar) * 100;
  const starPercentRounded = (Math.round(starPercent / 10) * 10);

  const r = starPercentRounded % 20;

  const totalStarActive = (starPercentRounded - r) / 20;
  const totalStarHalf = r / 20;

  const _hideAvgAndTotal = typeof hideAvgAndTotal !== "undefined" && hideAvgAndTotal;

  return `
    <div class="rating">
      <div class="rating-stars">
        ${_.range(1, totalStarActive + 1).map(function (item) {
          return `
            <i class="fas fa-star active"></i>
          `
        }).join('')}

        ${totalStarHalf != 0 ? `<i class="fas fa-star-half-alt active"></i>` : ''}

        ${_.range(totalStarActive + 1 + Math.round(totalStarHalf), 5 + 1).map(function (item) {
          return `<i class="fas fa-star"></i>`
        }).join('')}
      </div>

      ${!_hideAvgAndTotal
        ? (totalRatings > 0
          ? `
            <span class="rating-avg">${ratingAvg}</span>
            <span class="rating-total">(${totalRatings} đánh giá)</span>
          `
          : `<span class="rating-total">Chưa có đánh giá</span>`
        )
        : ''}
    </div>
  `;
}

$(document).ready(function () {
  $('#dropdown-item-logout').on('click', handleLogoutClick);
  $('#sidebar-profile [itemid="logout"]').on('click', handleLogoutClick);

  // Add smooth scrolling to all links
  $("a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      const hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });

  updateCartBadge();

  const searchModal = $('#searchModal');
  const searchInput = $('#global-input-search');

  searchModal.on('shown.bs.modal', function () {
    searchInput.focus();
    searchInput.select();
  });
});
