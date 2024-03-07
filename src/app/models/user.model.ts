
export interface userModelRequest{
    id:number;
    email:String;
    password:String;
    usertype:String;
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