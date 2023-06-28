export interface Driver {
    driving: boolean;
    name: string;
    phone: string;
    notes: string;
    _id?: any;
    account?: {
        email: string,
        password: string,
        moderator: boolean;
    }
}
