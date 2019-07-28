
export class Customer {
    id: number;
    code: string;
    status: number;
    phoneNumber: string;
    name: string;
    surname: string;
    email: string;
    reasons: any;
    city: string;
    interests: any;
    address: string;
    detail: any;
    source: string;
    JCustomer: JCustomer;

    toJCustomer(){
        this.JCustomer.PersonID = this.id;
        this.JCustomer.Code = this.code;
        this.JCustomer.Status = this.status;
    }

}

export class JCustomer{
    PersonID: number;
    Code: string;
    Status: number;
    Title: string;
    Name: string;
    Surname: string;
    Gender: number;
    IdentityNumber: string;
    BirthDate: string;
    Nationality: string;
    BirthPlace: string;
    RowCount: number;
    UserID: number;
    ULanguageID: number;
    customer: Customer;

    toCustomer(){
        this.customer.id = this.PersonID;
        this.customer.code = this.Code;
        this.customer.status = this.Status;
        //this.customer.phoneNumber = this.PhoneNumber;
        this.customer.name = this.Name;
        this.customer.surname = this.Surname;
    }
}