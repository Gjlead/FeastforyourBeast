using FeastforyourBeast.Models;
using FeastforyourBeast.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace FeastforyourBeast.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataImportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DataImportController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult ImportData()
        {
            try
            {
                JsonImporter.ImportData("Data.json", _context);
                return Ok("Data imported successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occured: {ex.Message}");
            }
        }
    }
}
