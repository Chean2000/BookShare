export type book = {
    bookid:number;
    title:string; 
    author:string;
    publisher:string;
    location:string;
    types:string;
    bookimg:string;
    id:number;

}

//export type bookwithoutimg = Omit<book, 'bookimg'>

export type user = {
    id:number;
    email:string;
    password:string;
    name:string;
    phone:string;
    img:string;
    address:string;
}