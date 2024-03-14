import { bookModelResponse } from "./book.model";

export interface CartBookModel{
    id:number,
    user:any,
    book : bookModelResponse | null,
    quantitySelected : number
}