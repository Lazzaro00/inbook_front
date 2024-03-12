import { bookModelResponse } from "./book.model";

export interface CartBookModel{
    book : bookModelResponse | null,
    quantitySelected : number
}