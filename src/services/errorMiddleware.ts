const errorMiddleware = (err: { statusCode: number; message: any; stack?: any; }, req: any, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { error: any; message: any; stack: any; }): void; new(): any; }; }; }, next: any) => {
    err.statusCode = err.statusCode || 500;
    const error = { ...err, message: err.message };
    res.status(err.statusCode).json({
      error,
      message: error.message,
      stack:  error.stack, // Hides stack in production
    });
  };
  
  export default errorMiddleware;
