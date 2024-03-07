export interface registrationModelRequest{
    id:number;
    user:User;
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
    user:Logged;
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


export interface User{
    id:number;
    email:String;
    password:String;
    usertype:String;
}

export interface Logged{
    email:String;
    usertype:String;
}