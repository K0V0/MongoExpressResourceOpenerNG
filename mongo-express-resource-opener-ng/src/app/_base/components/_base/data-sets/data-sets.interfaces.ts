// how component data should look like on presentation layer
export interface DataSetsNgModelRecordFormat {
    id : number;
    name : string;
    datasets : string;
    useLogin : boolean;
    useLoginDefault : boolean;
    username : string | null;
    pass : string | null;
}

export type DataSetsNgModelType = DataSetsNgModelRecordFormat[] | undefined;

// how component data should look like on data layer
export interface DataSetsStoreRecordFormat {
    id : number;
    name : string;
    datasets : string[];
    useLogin : boolean;
    useLoginDefault : boolean;
    usernameHash : string | null;
    passHash : string | null;
}

export type DataSetsStoreType = DataSetsStoreRecordFormat[] | undefined;
