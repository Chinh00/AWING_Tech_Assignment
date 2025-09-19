namespace AWING_Tech_Assignment.Controllers;

/// <summary>
/// Represents a data transfer object for a treasure map including dimensions, types of chests,
/// and the matrix representation of the map.
/// </summary>
public class TreasureMapCreateModel
{
    /// <summary>
    /// Gets or sets the number of rows in the treasure map.
    /// </summary>
    /// <remarks>
    /// This property defines the vertical dimension of the map.
    /// It must be a positive integer value greater than or equal to 1.
    /// Each row represents a horizontal slice of the map's matrix structure.
    /// </remarks>
    public int Rows { get; set; }

    /// <summary>
    /// Gets or sets the number of columns in the treasure map.
    /// </summary>
    /// <remarks>
    /// This property defines the horizontal dimension of the map.
    /// It must be a positive integer value greater than or equal to 1.
    /// Each column represents a vertical slice of the map's matrix structure.
    /// </remarks>
    public int Columns { get; set; }

    /// <summary>
    /// Gets or sets the number of distinct treasure chest types present on the map.
    /// </summary>
    /// <remarks>
    /// This property defines the variety of treasure chests that can be encountered on the map.
    /// It must be a positive integer value greater than or equal to 1.
    /// The value influences how the map is generated and solved for minimum fuel consumption.
    /// </remarks>
    public int ChestTypes { get; set; }

    /// <summary>
    /// Gets or sets the matrix representation of the treasure map.
    /// </summary>
    /// <remarks>
    /// This property represents the layout of the map as a two-dimensional array of integers.
    /// Each element in the matrix corresponds to a specific cell in the map, where the value denotes
    /// the type or presence of a treasure chest. The dimensions of the matrix must match the `Rows`
    /// and `Columns` properties for the map to be valid.
    /// </remarks>
    public int[][] Matrix { get; set; }
}