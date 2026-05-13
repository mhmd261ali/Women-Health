import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

// Query types
export interface BlogCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
}

export interface BlogAuthor {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      url: string;
    };
  };
  bio?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  body?: any[];
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author?: BlogAuthor;
  categories?: BlogCategory[];
  publishedAt: string;
  _createdAt: string;
}

// Fetch all categories
export async function getCategories(): Promise<BlogCategory[]> {
  const query = `*[_type == "category"] | order(title asc)`;
  return sanityClient.fetch(query);
}

// Fetch all posts (with optional category filter)
export async function getPosts(categorySlug?: string): Promise<BlogPost[]> {
  let query = `*[_type == "post"`;

  if (categorySlug) {
    query += ` && categories[]->.slug.current == "${categorySlug}"`;
  }

  query += `] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->,
    categories[]->,
    publishedAt,
    _createdAt
  }`;

  return sanityClient.fetch(query);
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    author->,
    categories[]->,
    publishedAt,
    _createdAt
  }`;

  return sanityClient.fetch(query);
}

// Fetch related posts
export async function getRelatedPosts(
  postId: string,
  categoryId: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const query = `*[
    _type == "post"
    && _id != "${postId}"
    && categories[]._ref == "${categoryId}"
  ] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->,
    categories[]->,
    publishedAt
  }`;

  return sanityClient.fetch(query);
}
