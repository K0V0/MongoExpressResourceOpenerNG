import { DataSetsStoreType } from './../data-sets/data-sets.interfaces';

export interface EnviromentSelectNgModelRecordFormat {
    id : number;
    name : string;
}

export type EnviromentSelectNgModelType = EnviromentSelectNgModelRecordFormat[] | undefined;
export type EnviromentSelectStoreType = DataSetsStoreType;

