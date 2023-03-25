import { TransactionType } from "./transaction-type";

export interface ClientTransaction {
    id: number,
    paymentDate: string,
    counterparty: string,
    amount: number,
    type: TransactionType,
}