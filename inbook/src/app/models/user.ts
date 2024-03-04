
export interface LoginModelRequest{
    email:string;
    password:string;
    rememberme:boolean;
}

export interface LoggedModelResponse{
    email:string;
    jwt:string
    usertype:string;
}

export interface sessionUserMode{
    eamil:string;
    usertype:string;
}

export interface registrationModelRequest{
    email:string;
    password:string;
    usertype:string;
}