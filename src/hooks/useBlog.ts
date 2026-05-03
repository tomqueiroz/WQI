import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/lib/index';

// Mapeia os campos do Supabase para o formato usado nos componentes
function mapPost(raw: Record<string, unknown>): BlogPost {
  return {
    id: String(raw.id || ''),
    slug: String(raw.slug || ''),
    title: String(raw.title || ''),
    excerpt: String(raw.excerpt || raw.summary || ''),
    content: String(raw.content || ''),
    cover_image_url: String(raw.cover_image_url || raw.image_url || ''),
    image_url: String(raw.image_url || raw.cover_image_url || ''),
    image: String(raw.cover_image_url || raw.image_url || ''),
    category: String(raw.category || 'Insights'),
    category_color: String(raw.category_color || '#0ea5e9'),
    categoryColor: String(raw.category_color || raw.categoryColor || '#0ea5e9'),
    tags: Array.isArray(raw.tags) ? raw.tags as string[] : [],
    author_name: String(raw.author_name || raw.author || 'Tom Queiroz'),
    author_bio: String(raw.author_bio || ''),
    read_time_minutes: Number(raw.read_time_minutes || raw.read_time || raw.readTime || 7),
    read_time: Number(raw.read_time_minutes || raw.read_time || raw.readTime || 7),
    readTime: Number(raw.read_time_minutes || raw.read_time || raw.readTime || 7),
    is_published: raw.is_published !== false,
    is_featured: Boolean(raw.is_featured),
    isFeatured: Boolean(raw.is_featured),
    views_count: Number(raw.views_count || raw.views || 0),
    views: Number(raw.views_count || raw.views || 0),
    published_at: String(raw.published_at || raw.created_at || ''),
    date: raw.published_at
      ? new Date(String(raw.published_at)).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
      : '',
    created_at: String(raw.created_at || ''),
    key_insight: String(raw.key_insight || ''),
    keyInsight: String(raw.key_insight || ''),
    sources: Array.isArray(raw.sources) ? raw.sources as string[] : [],
    author: String(raw.author_name || raw.author || 'Tom Queiroz'),
  } as BlogPost;
}

interface UseBlogResult {
  data: BlogPost[] | null;
  loading: boolean;
  error: Error | null;
}

interface UseBlogPostResult {
  data: BlogPost | null;
  loading: boolean;
  error: Error | null;
}

export function useBlogPosts(category?: string): UseBlogResult {
  const [data, setData] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (category && category !== 'todos' && category !== 'Todos') {
          query = query.eq('category', category);
        }

        const { data: posts, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setData((posts || []).map(p => mapPost(p as Record<string, unknown>)));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar posts'));
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  return { data, loading, error };
}

export function useFeaturedPosts(): UseBlogResult {
  const [data, setData] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        setError(null);

        const { data: posts, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .eq('is_featured', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (fetchError) throw fetchError;

        setData((posts || []).map(p => mapPost(p as Record<string, unknown>)));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar posts em destaque'));
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return { data, loading, error };
}

export function useBlogPost(slug: string): UseBlogPostResult {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const { data: post, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (post) {
          // Increment view count (fire-and-forget)
          void supabase
            .from('blog_posts')
            .update({ views_count: (Number(post.views_count) || 0) + 1 })
            .eq('id', post.id);

          setData(mapPost({ ...post as Record<string, unknown>, views_count: (Number(post.views_count) || 0) + 1 }));
        } else {
          // Post not found in Supabase
          setData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar post'));
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { data, loading, error };
}

// Hook para carregar todos os posts (usado na sanfona do blog)
export function useAllBlogPosts(): UseBlogResult {
  const [data, setData] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const { data: posts, error: fetchError } = await supabase
          .from('blog_posts')
          .select('id, slug, title, excerpt, category, category_color, tags, read_time_minutes, published_at, is_featured, views_count, cover_image_url')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (fetchError) throw fetchError;
        setData((posts || []).map(p => mapPost(p as Record<string, unknown>)));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar todos os posts'));
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { data, loading, error };
}
