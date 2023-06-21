const imageURL =
  process.env.NODE_ENV === 'production'
    ? 'https://iyarinmuaythai.com'
    : 'http://localhost:8080'

export const BASE_IMAGE_URL = `${imageURL}`
