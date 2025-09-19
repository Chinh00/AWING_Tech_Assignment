using System.ComponentModel.DataAnnotations;

namespace AWING_Tech_Assignment.Domain;

public class TreasureMap
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int Rows { get; set; }
    [Required]
    public int Columns { get; set; }
    [Required]
    public int ChestTypes { get; set; }
    [Required]
    public string MatrixJson { get; set; } 
    public double? MinFuel { get; set; } 
    public DateTime CreatedAt { get; set; }
    
}