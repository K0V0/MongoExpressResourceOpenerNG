import { QueryService } from './query.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class QueryServiceImpl implements QueryService {

    open(resourceId : string | undefined) : Promise<boolean> {
        if (resourceId === undefined || resourceId.trim().length < 1) {
            
        }
        return new Promise((resolve, reject) => {
            
        });
    }

}