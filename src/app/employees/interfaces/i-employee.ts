export interface IEmployee {
    Id: string;
    EmployeeName: string;
    StarTimeUtc: string;
    EndTimeUtc: string;
    EntryNotes: string;
    DeletedOn: string | null;
}

export interface IEmployeeForStats {
    Name:string,
    TotalTimeWorked : number
}
