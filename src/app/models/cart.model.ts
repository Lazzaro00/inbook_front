import { bookModelResponse } from "./book.model";

export interface CartBookModel{
    user:any,
    book : bookModelResponse | null,
    quantitySelected : number
}