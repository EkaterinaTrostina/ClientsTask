import { ClientTransaction } from './client-transaction';
import { ShortClient } from './short-client';

export interface Client extends ShortClient {
    phone: string;
    transactions: ClientTransaction[];
}
