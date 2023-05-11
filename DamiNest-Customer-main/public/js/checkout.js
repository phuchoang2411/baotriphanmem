var checkoutLS = {
  CHECKOUT_SHIPPING_STORAGE_KEY: '__checkout',
  saveShipping: function (shippingInfo) {
    localStorage.setItem(this.CHECKOUT_SHIPPING_STORAGE_KEY, JSON.stringify({
      fullName: shippingInfo.fullName,
      phoneNumber: shippingInfo.phoneNumber,
      shippingAddress: shippingInfo.shippingAddress
    }));
  },

  getShipping: function () {
    return JSON.parse(localStorage.getItem(this.CHECKOUT_SHIPPING_STORAGE_KEY)) || null;
  },

  clearShipping: function () {
    localStorage.clear(this.CHECKOUT_SHIPPING_STORAGE_KEY);
  }
};
