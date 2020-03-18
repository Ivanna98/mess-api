declare namespace Express {
  export interface User {
      _id: string,
      picture: string,
      name: string,
      googleId: string,
      email: string,
      onlineStatus: boolean,
    }
  }
