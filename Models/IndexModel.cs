using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FeastforyourBeast.Models
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Sitter> Sitter { get; set; }

        public async Task OnGetAsync()
        {
            Sitter = await _context.Sitter.ToListAsync();
        }
    }
}
