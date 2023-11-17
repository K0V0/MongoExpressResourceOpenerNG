// how component data should look like on presentation layer
export interface DataSetsNgModelRecordFormat {
    id : number;
    name : string;
    datasets : string;
    useLogin : boolean;
    username : string;
    pass : string;
}

export type DataSetsNgModelType = DataSetsNgModelRecordFormat[] | undefined;

// how component data should look like on data layer
export interface DataSetsStoreRecordFormat {
    id : number;
    name : string;
    datasets : string[];
    useLogin : boolean;
    usernameHash : string;
    passHash : string;
}

export type DataSetsStoreType = DataSetsStoreRecordFormat[] | undefined;
