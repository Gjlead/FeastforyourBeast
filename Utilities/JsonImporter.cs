using FeastforyourBeast.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;

namespace FeastforyourBeast.Utilities
{
    public static class JsonImporter
    {
        public static void ImportData(string filePath, ApplicationDbContext dbContext)
        {
            string jsonData = File.ReadAllText(filePath);

            var sitterData = JsonConvert.DeserializeObject<Dictionary<string, List<Dictionary<string, string>>>>(jsonData);
            var sitters = sitterData["Sitter"];

            foreach (var sitter in sitters)
            {
                var newSitter = new Sitter
                {
                    Name = sitter["Name"],
                    IsMobile = bool.Parse(sitter["IsMobile"]),
                    Description = sitter["Description"]
                };

                switch (sitter["Gender"])
                {
                    case "male":
                        newSitter.ProfilePicture = GetProfilePicture("FeastforyourBeast\\Images\\male.png;");
                        break;
                    case "female":
                        newSitter.ProfilePicture = GetProfilePicture("FeastforyourBeast\\Images\\female.png;");
                        break;
                    case "robot":
                        newSitter.ProfilePicture = GetProfilePicture("FeastforyourBeast\\Images\\robot.png;");
                        break;
                    default:
                        newSitter.ProfilePicture = GetProfilePicture("FeastforyourBeast\\Images\\robot.png;");
                        break;
                }

                dbContext.Sitter.Add(newSitter);
            }

            dbContext.SaveChanges();
        }

        private static byte[] GetProfilePicture(string imagePath)
        {
            byte[] imageData;
            using (var fs = new FileStream(imagePath, FileMode.Open, FileAccess.Read))
            {
                using (var ms = new MemoryStream())
                {
                    fs.CopyTo(ms);
                    imageData = ms.ToArray();
                }
            }
            return imageData;
        }
    }
}
