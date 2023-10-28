export { }

export interface TokenDecored{
    id:number,
    role: string,

}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecored
            //token: { id:number, role: string} lo declaramos fuera para que se pueda utilizar fuera de ella. 
        }
    }
}

// Tras este documento, ya podemos modificar todos los any por Request que hay dentro de usersController