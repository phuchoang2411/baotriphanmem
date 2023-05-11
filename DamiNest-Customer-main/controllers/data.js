const users = require('../data/customers.json')
const products = require('../data/products.json')

const { UserModel, ProductModel } = require('../models')

const ADMINS = [
  '619f7ec78a3dec0df2362c8f',
  '61e4cb67e31eb5b3e339b618'
]

const CATEGORY_IDS = [
  '619f7d7c07a967f6eda06293',
  '619f7d7c07a967f6eda06294',
  '619f7d7c07a967f6eda06295',
  '619f7d7c07a967f6eda06296',
  '619f7d7c07a967f6eda06297'
]

const DESCRIPTIONS = [
  'Đây là những tổ yến thô được chọn lọc theo tỷ lệ kim cương (100 tổ chọn 1 tổ). Tổ hình tròn, dày, rất ít lông, thường có khoảng 2-4 vị trí có lông, không có bụng, nhiều sợi. Thời gian làm sạch giảm đến 50% so với yến thô thông thường. Tỷ lệ thất thoát khoảng 20% đối với những người không chuyên.',
  'Tổ yến nguyên chất 100% được khai thác tại nhà yến chuyên nghiệp. Được chọn lọc theo tỉ lệ “vương miện” – điểm 10 cho chất lượng. Được các nghệ nhân nuôi chim yến lành nghề, giàu kinh nghiệm đảm nhận. Không sử dụng chất bảo quản, tẩm ướp, phụ gia. Đặc điểm: Màu trắng ngà, tổ yến to dày, nhiều sợi, trọng lượng mỗi tổ> 10g / tổ.',
  'Tổ yến đã qua chế biến của Hồng Gia Yến thích hợp với những người ít chế biến, sau khi mua về có thể sử dụng ngay. Để sử dụng tổ yến tinh chế này, bạn chỉ cần ngâm tổ yến từ 30 – 45 phút, sau đó rửa sạch lại.',
  'Tổ yến là một loại thực phẩm chứa nhiều chất dinh dưỡng cần thiết cho cơ thể con người. Với 18 loại axit amin và nhiều chất dinh dưỡng khác, tổ yến có giá trị cao và được bán với giá khá đắt ngoài thị trường.',
  'Tổ yến là một loại thực phẩm bổ dưỡng mà thiên nhiên ban tặng cho con người, nó có độ khô rất cao và chứa nhiều chất dinh dưỡng cần thiết cho cơ thể con người. Nhưng việc bảo quản loại thực phẩm này vô cùng khó khăn, nếu không biết cách bảo quản sẽ làm hỏng hoặc giảm chất lượng của sản phẩm.'
]

const FEATURED_IMAGES = [
  '/uploads/HH11.jpg',
  '/uploads/HH12.jpg',
  '/uploads/HH13.jpg',
  '/uploads/NT1.jpg',
  '/uploads/NT2.jpg',
  '/uploads/XT11.jpg',
  '/uploads/XT12.jpg',
  '/uploads/XT21.jpg',
  '/uploads/XT22.jpg',
  '/uploads/XT23.jpg'
]

const USESES = [
  'Nói đến yến thì chúng có rất nhiều công dụng cũng như có thể dùng để chế biến thành nhiều món ăn khác nhau như: yến sào chưng đường phèn, yến sào nấu gà, yến sào gà ác, cháo yến sào… và đó. là nhiều món ăn khác có thể dùng để chế biến yến mạch. Đặc biệt khi sử dụng yến mạch để chế biến các món ăn sẽ tỏa ra mùi hương rất thơm ngon, đồng thời chứa nhiều chất dinh dưỡng cần thiết cho con người, giúp cơ thể bạn trở nên trẻ đẹp, tràn đầy năng lượng. tuổi thọ, sức đề kháng cao để phòng tránh các bệnh nguy hiểm.',
  'Vì yến mạch có chứa nhiều thành phần dinh dưỡng quý giá cần thiết cho cơ thể con người nên việc sử dụng yến mạch trong các bữa ăn hàng ngày tại nhà sẽ mang lại một số công dụng như: Giúp trí não bé phát triển, cải thiện trí nhớ. Phụ nữ sau sinh dùng yến sào sẽ nhanh chóng phục hồi sức khỏe. Da bị tổn thương nhanh chóng được chữa lành và có làn da sáng mịn. Tăng cường sinh lực. Người cao tuổi khi sử dụng yến sào sức khỏe sẽ được cải thiện và khỏe mạnh hơn rất nhiều.',
  'Tổ yến chứa tới 18 loại acid amin mà cơ thể không tự tổng hợp được, cùng rất nhiều cacbonhydrat, muối khoáng, khoáng chất vi lượng.... giúp cơ thể khỏe mạnh, trẻ hóa tế bào, da trắng mịn, hồng hào và cải thiện trí nhớ.'
]

const initCustomers = async (req, res) => {
  const result = await Promise.all(users.map((user) => {
    const newUser = new UserModel(user)
    return newUser.save()
  }))

  res.json(result)
}

const initProducts = async (req, res) => {
  const result = await Promise.all(products.map((product, index) => {
    const newProduct = new ProductModel({
      ...product,
      categoryId: CATEGORY_IDS[index % CATEGORY_IDS.length],
      description: DESCRIPTIONS[index % CATEGORY_IDS.length],
      featuredImage: FEATURED_IMAGES[index % FEATURED_IMAGES.length],
      uses: USESES[index % USESES.length],
      ownerId: ADMINS[index % ADMINS.length]
    })
    return newProduct.save()
  }))

  res.json(result)
}

module.exports = {
  initCustomers,
  initProducts
}
