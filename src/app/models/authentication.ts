export interface IAuth {

    AccessToken: string;
    PersonID: number;
    Username: string;
    Name: string;
    Surname: string;
    UserFunctions: any;
    Image128: string;
    ResponseCode: number;
    ResponseDescription: string;
    Roles?:any; 
}

export interface IToken {
    AccessTokenIsValid: boolean;
    AccessTokenValidUntil: string;
    ResponseCode: number;
    ResponseDescription: string;
}
