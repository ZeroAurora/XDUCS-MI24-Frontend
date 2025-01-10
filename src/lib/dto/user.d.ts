import type { MediaFile } from './file'

interface User {
  id: number
  username: string
}

export interface Profile {
  id: number
  user: User
  bio: string
  profile_picture?: MediaFile
  background_image?: MediaFile
  date_of_birth: Date
  location: string
  following_count: number
  follower_count: number
}
