const multer = require('multer')

const diskStorage = multer.diskStorage({
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  destination: (req, file, callback) => {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, 'public/uploads')
  },
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    const math = ['image/png', 'image/jpeg']
    if (math.indexOf(file.mimetype) === -1) {
      const errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`
      return callback(errorMess, null)
    }

    // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
    const filename = `${Date.now()}-${file.originalname}`
    callback(null, filename)
  }
})

// Khởi tạo middleware uploadFile với cấu hình như ở trên,
// Bên trong hàm .single() truyền vào name của thẻ input, ở đây là 'image'
const upload = multer({ storage: diskStorage }).single('image')

module.exports = upload
