(function($) {
  $.fn.bootstrapBtn = function (action) {
    if (action === 'loading' && this.data('loading-text')) {
      this.data('original-text', this.html());
      this.html(this.data('loading-text'));
      this.prop('disabled', true);
    }

    if (action === 'reset' && this.data('original-text')) {
      this.html(this.data('original-text'));
      this.prop('disabled', false);
    }
  };
}(jQuery));