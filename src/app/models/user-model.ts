    export interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        weight: number;
        height: number;
        role: 'USER' | 'ADMIN';
        subscription: 'FREE' | 'PREMIUM';
    }