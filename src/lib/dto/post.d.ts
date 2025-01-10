import type { MediaFile } from './file'
import type { Profile } from './user'

export interface Post {
  id: number
  profile: Profile
  content: string
  created_at: Date
  updated_at: Date
  media_files: MediaFile[]
  parent: number | null
  like_count: number
  comment_count: number
  is_liked: boolean
}

export interface PostCreationRequest {
  content: string
  media_files: string[]
  parent: number | null
}
