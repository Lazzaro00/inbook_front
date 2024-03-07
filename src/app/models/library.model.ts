import { userModelRequest, userModelResponse } from "./user.model";

export interface libraryModelRequest{
    id:number;
    name:String;
    address:String;
    nation:String;
    province:String;
    city:String;
    description:String;
    admins:userModelRequest[];
}

export interface libraryModelResponse{
    id:number;
    name:String;
    address:String;
    nation:String;
    province:String;
    city:String;
    description:String;
    admins:userModelResponse[];
}