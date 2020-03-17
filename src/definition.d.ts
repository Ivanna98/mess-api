
declare namespace Express {
  export interface Request {
    user?: {
      _id: string,
      picture: string,
      name: string,
      googleId: string,
      email: string,
      onlineStatus: boolean,
    }
  }
}
