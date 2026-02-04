
export interface Review {
    id: number;
    user: string;
    rating: number;
    content: string;
    date: string;
}

export interface Location {
    id: number;
    name: string;
    type: 'charging' | 'garage' | 'meetup' | 'other';
    lat: number;
    lng: number;
    address: string;
    phone?: string;
    rating?: number;
    distance?: string;
    status?: 'available' | 'busy';
    image?: string;
    chargingPorts?: string[];
    price?: string;
    amenities?: string[];
    reviews?: Review[];
}
