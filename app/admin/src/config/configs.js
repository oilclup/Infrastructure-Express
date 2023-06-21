const imageURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.iyarinmuaythai.com'
    : 'http://localhost:3000'

export const BASE_IMAGE_URL = `${imageURL}/api/uploads`
