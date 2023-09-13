export type UserDatabase = {
    id: number
    email: string
    name: string
    phone: string
    position_id: number
    photo: string
    position: {
      id: number
      name: string
    }
  }