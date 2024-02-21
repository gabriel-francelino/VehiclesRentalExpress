import { NextFunction, Request, Response } from 'express'

class InfoRequestMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    // console.log(`Request: ${req.method} ${req.url}`);
    console.log('-----------------------------------------------------')
    console.log(`Method: ${req.method}`)
    console.log(`URL: ${req.url}`)
    console.log('Headers:', req.headers)
    next()
  }
}

const infoRequestMiddleware = new InfoRequestMiddleware()

export { infoRequestMiddleware }
