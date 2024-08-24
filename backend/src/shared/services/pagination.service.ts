import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationService{
    getPaginationParams(page:number = 0,limit:number = 20){
        try {
            let offset = 0 
            
            if(page && limit){
                offset = (page - 1) * limit;
            }

            return {offset, page : +page, limit : +limit};
        } catch (err) {
            throw new Error(err);
        }
    }
}