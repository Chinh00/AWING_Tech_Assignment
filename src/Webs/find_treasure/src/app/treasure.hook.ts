import type {Pagination} from "./extensions.ts";
import {useQuery} from "@tanstack/react-query";
import {TreasureService} from "./treasure.service.ts";

export const useGetTreasureHook = (pagination: Pagination) => {
    return useQuery({
        queryKey: ["treasure", pagination],
        queryFn: () => {
            return TreasureService.getTreasures(pagination)
        }
    })
}