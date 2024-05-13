namespace FeastforyourBeast.Models
{
    public class Timeslot
    {
        public int Id { get; set; }
        public string StartTime { get; set; } // Not DateTime, because we are working with the imperial dating system xxxxxx.Mx
        public string EndTime { get; set; }
    }
}
