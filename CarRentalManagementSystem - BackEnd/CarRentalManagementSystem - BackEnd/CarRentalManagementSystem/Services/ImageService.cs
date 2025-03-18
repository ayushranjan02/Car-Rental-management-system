// Services/ImageService.cs
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

public class ImageService : IImageService
{
	private readonly string _storagePath;

	public ImageService(IConfiguration configuration)
	{
		_storagePath = configuration["Storage:ImagePath"]; // Get storage path from configuration
	}

	public async Task<string> SaveImage(IFormFile imageFile)
	{
		if (imageFile == null || imageFile.Length == 0)
		{
			return null;
		}

		// Generate a unique filename
		var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
		var filePath = Path.Combine(_storagePath, fileName);

		// Save the image to the specified file path
		using (var stream = new FileStream(filePath, FileMode.Create))
		{
			await imageFile.CopyToAsync(stream);
		}

		// Return the URL of the saved image
		// You might need to adjust this based on your storage location and how you serve static files
		return $"/images/{fileName}";
	}
}

// Services/IImageService.cs (interface)
public interface IImageService
{
	Task<string> SaveImage(IFormFile imageFile);
}