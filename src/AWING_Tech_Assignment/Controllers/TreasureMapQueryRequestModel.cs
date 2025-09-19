namespace AWING_Tech_Assignment.Controllers;


public class TreasureMapQueryRequestModel
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    
}

public record TreasureMapQueryResponseModel<TResult>(List<TResult> Items, int TotalCount, int Page, int PageSize)
{
    public static TreasureMapQueryResponseModel<TResult> Create(List<TResult> items, int totalCount, int page, int pageSize) =>
        new TreasureMapQueryResponseModel<TResult>(items, totalCount, page, pageSize);
}