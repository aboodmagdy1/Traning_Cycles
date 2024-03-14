import * as crypto from 'crypto'


export const generateResetCode= ()=>{
    const code = Math.floor(10000+Math.random()*90000).toString()
    const expireIn = Date.now() + 5* 60*1000

    const hashedResetCode = crypto.createHash('sha256').update(code).digest('hex')

    return {code,hashedResetCode,expireIn}
}