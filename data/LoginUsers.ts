export type LoginUser = {
    userName: string;
    password: string;
}


export const loginUser: Record<string, LoginUser>    = {
    standard:{
        userName: 'standard_user',
        password: 'standard123',
    },
    locked:{
        userName: 'locked_user',
        password: 'locked123',
    },
    admin:{
        userName: 'admin_user',
        password: 'admin123',
    },
}