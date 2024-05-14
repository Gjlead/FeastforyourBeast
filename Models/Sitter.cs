namespace FeastforyourBeast.Models
{
    public class Sitter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Planet { get; set; }
        public bool IsMobile { get; set; }
        public ICollection<Availability> Availabilities { get; set; }
        public string Description { get; set; }
        public byte[] ProfilePicture { get; set; }
    }
}
