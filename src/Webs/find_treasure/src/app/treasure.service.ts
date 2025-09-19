import type {AxiosResponse} from "axios";
import type {ListSuccessResponse, Pagination} from "./extensions.ts";
import type {Treasure} from "./treasure.model.ts";
import http from "./http.ts";
export interface TreasureMapCreateModel {
    rows: number;
    columns: number;
    chestTypes: number;
    // matrix: number[][];
}


export class TreasureService {
    static async getTreasures(query: Pagination): Promise<AxiosResponse<ListSuccessResponse<Treasure>>> {
        return await http.get<ListSuccessResponse<Treasure>>(
            `${import.meta.env.VITE_API_URL}/api/TreasureMap?page=${query.page}&pageSize=${query.pageSize}`, 
        );
    }
   
    static async createTreasureMap(data: TreasureMapCreateModel): Promise<AxiosResponse<Treasure>> {
        return await http.post<Treasure>(
            `${import.meta.env.VITE_API_URL}/api/TreasureMap`,
            data
        );
    }
    
}