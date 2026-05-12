# Sanity CMS Setup Guide

This blog system uses Sanity as the backend for content management. Follow these steps to get started:

## 1. Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up for a free account
2. Create a new project via the Sanity dashboard
3. Choose "Blank" as the starter template
4. Note your **Project ID** and **Dataset** name (usually "production")

## 2. Update Environment Variables

Add your Sanity credentials to `.env`:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

## 3. Set Up Sanity Studio (Content Management Interface)

In your Sanity project, set up the studio with the schemas defined in `sanity-schema-reference.js`:

### Option A: Using Sanity CLI (Recommended)

```bash
npm install -g @sanity/cli
sanity init
# Follow the prompts and select your project
```

### Option B: Manual Setup in Sanity Dashboard

1. Go to your Sanity project dashboard
2. Click "Manage" → "Dataset management"
3. Import the schema files from `sanity-schema-reference.js`

## 4. Create the Schemas

You need to create four documents in Sanity Studio:

### blockContent (Portable Text)
The rich text editor for blog posts. See `sanity-schema-reference.js`.

### category
Categories for blog posts. Create entries like:
- **Breastfeeding** (slug: breastfeeding, color: #D4756A)
- **Sports & Fitness** (slug: sports, color: #8A9E84)
- **Health & Wellness** (slug: health, color: #E8776F)
- **Physiotherapy** (slug: physiotherapy, color: #748D6E)
- **Nutrition** (slug: nutrition, color: #D4756A)
- **Postpartum Recovery** (slug: recovery, color: #C4605A)

### author
Author profiles. Create entries with:
- Name
- Slug (auto-generated)
- Profile image
- Biography

### post
Blog posts. Create entries with:
- Title
- Slug (auto-generated)
- Excerpt (short preview)
- Main image
- Author (reference)
- Categories (multi-select)
- Published date
- Body (rich text using blockContent)

## 5. API Access

The blog uses public API access (viewer role). If you need to restrict access:

1. Go to Settings → API Credentials
2. Adjust CORS and API token permissions as needed
3. Ensure the dataset is accessible via the public API

## 6. Testing

1. Create at least one blog post in Sanity Studio
2. Start the dev server: `npm run dev`
3. Navigate to `/blog` to see your posts

## Category Colors

Use these hex colors for categories (automatically used in the blog):

```
Breastfeeding: #D4756A (coral)
Sports: #8A9E84 (sage)
Health: #E8776F (peach coral)
Physiotherapy: #748D6E (deep sage)
Nutrition: #D4756A (coral)
Recovery: #C4605A (deep rose)
Wellness: #9DAE97 (soft sage)
Fitness: #8A9E84 (sage)
```

## Troubleshooting

**Posts not appearing?**
- Check that posts have `publishedAt` date set
- Verify the Project ID and Dataset in `.env`
- Check CORS settings in Sanity dashboard

**Images not loading?**
- Ensure images are properly uploaded to Sanity
- Check that `mainImage` field is filled out

**Build errors?**
- Make sure all required fields (title, slug, categories, body) are filled
- Verify @sanity/client and @portabletext/react are installed

## Customization

To add or modify categories, edit the category color mapping in `src/components/BlogListing.tsx` in the `getCategoryColor` function.
