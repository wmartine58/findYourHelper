export interface Client {
    uid: string,
    email: string,
    name: string,
    phone: string,
    photo: string,
    reference: string,
    ubication: {
        lat: number;
        lng: number;
    }
}