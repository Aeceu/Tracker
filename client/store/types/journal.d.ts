export interface TJournal {
    id:number;
    title:string;
    content:string;
    created_at:Date;
}

export interface TNewJournal {
    title:string;
    content:string;
}