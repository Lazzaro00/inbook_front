import { loggedModelResponse, userModelRequest } from "./user.model";

export interface registrationModelRequest{
    id:number;
    user:userModelRequest;
    images:number[];
    name:String;
    surname:String;
    date:String;
    gender:String;
    nationality:String;
    province:String;
    city:String;
    address:String;

}

export interface registrationModelResponse{

    id:number;
    user:loggedModelResponse;
    images:number[];
    name:String;
    surname:String;
    date:String;
    gender:String;
    nationality:String;
    province:String;
    city:String;
    address:String;
}