import type {Pagination} from "./extensions.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {TreasureService} from "./treasure.service.ts";

export const useGetTreasureHook = (pagination: Pagination) => {
    return useQuery({
        queryKey: ["treasure", pagination],
        queryFn: () => {
            return TreasureService.getTreasures(pagination)
        }
    })
}
export const useCreateTreasureHook = () => {
    return useMutation({
        mutationKey: ["createTreasure"],
        mutationFn: TreasureService.createTreasureMap,
    });
}