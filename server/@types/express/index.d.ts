declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
}
export {};