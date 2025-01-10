import type { Profile } from './user'

export interface Notification {
  id: number
  source_user: number
  content: number
  notification_type: 'like' | 'comment'
  created_at: Date
  is_read: boolean
}
