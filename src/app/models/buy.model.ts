import { bookModelRequest, bookModelResponse } from "./book.model";
import { userModelRequest, userModelResponse } from "./user.model";

export interface buyModelRequest{
    id:number;
    user:userModelRequest;
    book:bookModelRequest;
    quantity:number;
    date:Date;
    orderNum:number;
}

export interface buyModelResponse{
    id:number;
    user:userModelResponse;
    book:bookModelResponse;
    quantity:number;
    date:Date;
    orderNum:number;
}