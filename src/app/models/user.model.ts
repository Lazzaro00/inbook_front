
export interface userModelRequest{
    id?:number;
    email:String | string | undefined;
    password:String | string | undefined;
    usertype:String | string | undefined;
}

export interface userModelResponse{
    id:number;
    email:String;
    password:String;
    usertype:String;
}

export interface loggedModelRequest{
    email:String;
    usertype:String;
}

export interface loggedModelResponse{
    email:String;
    usertype:String;
}