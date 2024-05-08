var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection(); // Redirects HTTP requests to HTTPS.
app.UseStaticFiles(); // Enables static files, such as HTML, CSS, images, and JavaScript to be served.

app.UseRouting();

app.MapRazorPages();

app.Run();
