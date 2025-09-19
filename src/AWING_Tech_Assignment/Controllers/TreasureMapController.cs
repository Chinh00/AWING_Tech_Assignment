using System.Text.Json;
using AWING_Tech_Assignment.Data;
using AWING_Tech_Assignment.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AWING_Tech_Assignment.Controllers;

/// <summary>
/// Provides API endpoints for managing and solving treasure maps.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TreasureMapController(AppDbContext context) : ControllerBase
{
    /// <summary>
    /// Creates a new treasure map based on the provided data, calculates the minimum fuel required to collect all treasures,
    /// and saves the map data to the database.
    /// </summary>
    /// <param name="createModel">The treasure map data transfer object containing rows, columns, chest types, and the matrix representation of the map.</param>
    /// <returns>An IActionResult containing the created treasure map with the calculated minimum fuel or a validation error response if the input is invalid.</returns>
    [HttpPost]
    public async Task<IActionResult> CreateAndSolve([FromBody] TreasureMapCreateModel createModel)
    {
        if (createModel.Rows < 1 || createModel.Columns < 1 || createModel.ChestTypes < 1 ||
            createModel.Matrix.Length != createModel.Rows ||
            createModel.Matrix.Any(r => r.Length != createModel.Columns))
            return BadRequest("Invalid input.");

        var map = new TreasureMap
        {
            Rows = createModel.Rows,
            Columns = createModel.Columns,
            ChestTypes = createModel.ChestTypes,
            MatrixJson = JsonSerializer.Serialize(createModel.Matrix),
            CreatedAt = DateTime.UtcNow
        };

        map.MinFuel = Solve(map);

        context.TreasureMaps.Add(map);
        await context.SaveChangesAsync();
        return Ok(map);
    }

    /// <summary>
    /// Retrieves a paginated list of treasures based on the provided query parameters.
    /// </summary>
    /// <param name="requestModel">The query parameters for pagination, including page number and page size.</param>
    /// <returns>An IActionResult containing the paginated list of treasures matching the query parameters,
    /// or an error response if the query is invalid.</returns>
    [HttpGet]
    public async Task<IActionResult> GetTreasuresAsync([FromQuery] TreasureMapQueryRequestModel requestModel)
    {
        var query = context.TreasureMaps.AsQueryable();
        query = query.OrderBy(e => e.Id).Skip((requestModel.Page - 1) * requestModel.PageSize).Take(requestModel.PageSize);
        var totalCount = await context.TreasureMaps.CountAsync();
        var maps = await query.ToListAsync();
        var mapsWithPagination =
            TreasureMapQueryResponseModel<TreasureMap>.Create(maps, totalCount, requestModel.Page,
                requestModel.PageSize);
        return Ok(mapsWithPagination);
    }

    /// <summary>
    /// Retrieves a treasure map by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the treasure map to retrieve.</param>
    /// <returns>An IActionResult containing the retrieved treasure map if it exists,
    /// or a NotFound result if the map with the specified ID is not found.</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var map = await context.TreasureMaps.FindAsync(id);
        if (map == null) return NotFound();
        return Ok(map);
    }

    private double Solve(TreasureMap map)
    {
        int n = map.Rows, m = map.Columns, p = map.ChestTypes;
        var a = JsonSerializer.Deserialize<int[][]>(map.MatrixJson)!;

        var chestPos = new List<(int, int)>[p + 1];
        for (var i = 0; i <= p; ++i) chestPos[i] = new List<(int, int)>();
        for (var i = 0; i < n; ++i)
            for (var j = 0; j < m; ++j)
                chestPos[a[i][j]].Add((i, j));
        var prevPositions = new List<(int, int)> { (0, 0) };
        var prevCosts = new Dictionary<(int, int), double> { [(0, 0)] = 0 };
        for (var k = 1; k <= p; ++k)
        {
            var currCosts = new Dictionary<(int, int), double>();
            foreach (var pos in chestPos[k])
            {
                var minCost = double.MaxValue;
                foreach (var prev in prevPositions)
                {
                    var cost = prevCosts[prev] + Dist(prev, pos);
                    if (cost < minCost) minCost = cost;
                }
                currCosts[pos] = minCost;
            }
            prevPositions = chestPos[k];
            prevCosts = currCosts;
        }
        return prevCosts[prevPositions[0]];
    }

    private double Dist((int x, int y) a, (int x, int y) b)
    {
        int dx = a.x - b.x, dy = a.y - b.y;
        return Math.Sqrt(dx * dx + dy * dy);
    }
}

