const CUSTOMERS = [
  {
    fullName: 'Uyên Trần',
    email: 'lillypark@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Bùi',
    email: 'yolandawhitehead@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khoa Cao',
    email: 'sophiamorgan@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Võ',
    email: 'geraldineknapp@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Linh Nguyên',
    email: 'williamstaylor@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khởi Hoàng',
    email: 'hartsims@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Uyên Ốc',
    email: 'diannaguilar@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Võ',
    email: 'johnstonguzman@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Uyên Trần',
    email: 'justicerosales@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Huỳnh Cao',
    email: 'bentonfrank@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Trần',
    email: 'blakewoodward@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Nguyễn',
    email: 'abbottadams@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Linh Trần',
    email: 'ellisonshannon@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Minh Cao',
    email: 'diannadillard@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Linh Nguyên',
    email: 'erikamatthews@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khoa Hồ',
    email: 'forbeswolf@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Uyên Cao',
    email: 'castrolynch@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Đại Trần',
    email: 'gordonstein@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Trần',
    email: 'loriethompson@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Bùi',
    email: 'priscillapoole@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khởi Nguyên',
    email: 'karenlamb@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Uyên Đỗ',
    email: 'petersarmstrong@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Trần',
    email: 'daniellewilkerson@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Hồ',
    email: 'brandicarson@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Nguyễn',
    email: 'schmidtpickett@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Minh Hoàng',
    email: 'elsaalford@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Ngân Bùi',
    email: 'phoebewallace@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khoa Võ',
    email: 'charlesromero@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Nguyên',
    email: 'caitlinvasquez@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Cao',
    email: 'sheltonorr@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Khoa Cao',
    email: 'craigcannon@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Đỗ',
    email: 'tamekareilly@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Trần',
    email: 'jillharper@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Huỳnh Cao',
    email: 'maritzamayo@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Hồ',
    email: 'bessiejarvis@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Minh Cao',
    email: 'sharperiggs@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Minh Hồ',
    email: 'doreenkelly@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Thuý Trần',
    email: 'franklinward@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Hồ',
    email: 'cecilewall@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Đại Hoàng',
    email: 'yatescummings@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  },
  {
    fullName: 'Bảo Đỗ',
    email: 'harrisonfowler@applica.com',
    password: 'happy2code',
    isVerified: true,
    isBlocked: false,
    role: 'CUSTOMER'
  }
]

module.exports = {
  CUSTOMERS
}
