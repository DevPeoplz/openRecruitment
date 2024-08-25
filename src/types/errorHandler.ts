class ErrorHandler {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    } else if (typeof error === 'object' && error !== null) {
      return JSON.stringify(error)
    }
    return 'An unknown error occurred'
  }

  static catch<T>(fn: () => T): T | string {
    try {
      return fn()
    } catch (error) {
      return this.getErrorMessage(error)
    }
  }

  static async catchAsync<T>(fn: () => Promise<T>): Promise<T | string> {
    try {
      return await fn()
    } catch (error) {
      return this.getErrorMessage(error)
    }
  }
}

export default ErrorHandler
