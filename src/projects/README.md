# Project JSON System

This directory contains individual project folders for each case study. Each project is defined by its own folder containing a `project.json` file with a comprehensive structure that allows for flexible content management.

## File Structure

Each project should have its own folder named `{slug}` containing a `project.json` file. The corresponding images should be placed in `public/projects/{slug}/`.

```
src/projects/
├── luxury-hotel-brand-identity/
│   └── project.json
├── fintech-mobile-app/
│   └── project.json
└── ...

public/projects/
├── luxury-hotel-brand-identity/
│   ├── intro.jpg
│   ├── image1.jpg
│   ├── image2.jpg
│   └── image3.jpg
├── fintech-mobile-app/
│   ├── intro.jpg
│   ├── image1.jpg
│   ├── image2.jpg
│   └── image3.jpg
└── ...
```

## JSON Schema

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "year": "2024",
  "category": "Brand Identity",
  "client": "Client Name",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "featured": true,
  "intro": {
    "photo": "https://image-url.com/image.jpg",
    "text": "Brief project description for the intro section"
  },
  "content": [
    {
      "type": "text",
      "content": "Text content for this section"
    },
    {
      "type": "image",
      "url": "https://image-url.com/image.jpg",
      "alt": "Image alt text",
      "caption": "Optional image caption"
    }
  ],
  "testimonial": {
    "quote": "Client testimonial quote",
    "author": "Client Name",
    "position": "Client Position"
  }
}
```

## Field Descriptions

### Required Fields
- **slug**: URL-friendly identifier (e.g., "luxury-hotel-brand-identity")
- **title**: Project title displayed in headers
- **year**: Year the project was completed
- **category**: Project category (Brand Identity, UI/UX Design, Full-Stack Development, etc.)
- **client**: Client name
- **tags**: Array of relevant tags
- **featured**: Boolean indicating if project should appear in featured sections
- **intro**: Object containing intro photo and text
- **content**: Array of content blocks (text and images)

### Content Blocks
Each content block can be either:
- **Text block**: `{ "type": "text", "content": "Your text here" }`
- **Image block**: `{ "type": "image", "url": "image-url", "alt": "alt-text", "caption": "optional-caption" }`

### Optional Fields
- **testimonial**: Client testimonial object with quote, author, and position

## Adding New Projects

1. Create a new folder in this directory with the naming pattern `{slug}`
2. Create a `project.json` file inside the folder following the schema structure above
3. Create a corresponding folder in `public/projects/{slug}/` for images
4. Add the slug to the `projectSlugs` array in `src/utils/projectLoader.ts`
5. The project will automatically be available at `/project/{slug}`

### Image Organization

- **Intro Image**: Place the hero image as `intro.jpg` in the public folder
- **Content Images**: Name them sequentially as `image1.jpg`, `image2.jpg`, etc.
- **Path References**: Use `/projects/{slug}/filename.jpg` in your JSON

## Content Guidelines

### Images
- Use high-quality images (minimum 1200px width)
- Provide descriptive alt text for accessibility
- Optional captions can add context to images

### Text Content
- Keep text blocks concise and engaging
- Use proper grammar and punctuation
- Consider the reading flow between text and images

### Tags
- Use consistent, relevant tags
- Consider categories like: Branding, Mobile, Development, Strategy, etc.

## Example Projects

- `luxury-hotel-brand-identity/` - Brand identity project
- `fintech-mobile-app/` - Mobile app design project  
- `ecommerce-platform/` - Full-stack development project
- `restaurant-chain-rebrand/` - Restaurant rebrand project

## Technical Notes

- Projects are loaded dynamically using the `projectLoader.ts` utility
- Images are served from the public folder structure for optimal performance
- The system automatically converts JSON structure to the internal Project type
- All projects are cached for performance

## Future Enhancements

- Add support for video content blocks
- Implement image optimization
- Add project metadata (completion date, team members, etc.)
- Support for multiple languages
- Dynamic project discovery (scan directory instead of hardcoded list)