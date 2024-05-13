namespace FeastforyourBeast.Models
{
    public class Availability
    {
        public int SitterId { get; set; }
        public Sitter Sitter { get; set; }
        public int TimeslotId { get; set; }
        public Timeslot Timeslot { get; set; }
        public bool Available { get; set; }
    }
}
