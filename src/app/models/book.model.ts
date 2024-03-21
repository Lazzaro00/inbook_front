import { libraryModelRequest, libraryModelResponse } from "./library.model";

export interface bookModelRequest{
    id:number;
    images:number[];
    name:string;
    category:string;
    price:number;
    serialcode:string;
    quantity:number;
    description:string;
    library:libraryModelRequest;
}

export interface bookModelResponse{
    id:number;
    images:number[];
    name?:string;
    category?:string;
    price?:number;
    serialcode?:string;
    quantity:number;
    description?:string;
    library:libraryModelResponse;
}