import ky from 'ky'

export const apiKy = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token')
        if (token)
          request.headers.set('Authorization', `Token ${token}`)
      },
    ],
  },
})
