module.exports = {
  order: {
    info: 'Thông tin đơn hàng',
    createdAt: 'Ngày đặt hàng',
    status: 'Trạng thái',
    shippingAddress: 'Địa chỉ giao hàng',
    productList: 'Sản phẩm',
    total: 'Thành tiền',
    includedVAT: 'Đã bao gồm VAT nếu có',
    statusMessage: {
      PENDING: 'Đang chờ xác nhận',
      PROCESSING: 'Đang xử lí',
      TRANSFERRING: 'Đang vận chuyển',
      DONE: 'Giao hàng và thanh toán thành công',
      REJECTED: 'Đã hủy do {{reasons}}'
    },

    pending: {
      title: '[#{{orderId}}] Xác nhận đơn hàng của đến quý khách',
      description: 'Tổng giá trị đơn hàng là : {{total}}'
    },
    processing: {
      title: '[#{{orderId}}] Đang xử lí đơn hàng của đến quý khách',
      description: 'Kummo Chan đang chuẩn bị sản phẩm để giao cho quý khách. Kummo Chan sẽ cố gắng giao hàng cho quý khách trong thời gian sớm nhất.'
    },
    transferring: {
      title: '[#{{orderId}}] Đơn hàng đã sẵn sàng để giao đến quý khách',
      description: 'Chúng tôi vừa bàn giao đơn hàng của quý khách đến đối tác vận chuyển'
    },
    done: {
      title: '[#{{orderId}}] Quý khách có hài lòng với sản phẩm ?',
      description: 'Kummo Chan rất mong quý khách có thể dành ít phút để nhận xét những sản phẩm bạn đã mua gần đây.'
    },
    reject: {
      title: '[#{{orderId}}] Đơn hàng của quý khách bị từ chối',
      description: 'Kummo Chan rất tiếc khi thông báo đơn hàng #{{orderId}} của quý khách bị từ chối do {{reasons}}'
    }
  }
}
