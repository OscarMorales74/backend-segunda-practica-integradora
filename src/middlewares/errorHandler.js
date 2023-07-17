import { createResponse } from "../utils.js"

export const errorHandler = (error, req, res, next) => {
    console.log( `Error: ${error.message}` )
    const status = error.status || 400
    createResponse(res, status, error.message)
}