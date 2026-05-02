import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/lib/index';

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

        if (category && category !== 'todos') {
          query = query.eq('category', category);
        }

        const { data: posts, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setData(posts || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar posts'));
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

        setData(posts || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar posts em destaque'));
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
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const { data: post, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (fetchError) throw fetchError;

        if (post) {
          await supabase
            .from('blog_posts')
            .update({ views_count: (post.views_count || 0) + 1 })
            .eq('id', post.id);

          setData({ ...post, views_count: (post.views_count || 0) + 1 });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar post'));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { data, loading, error };
}
