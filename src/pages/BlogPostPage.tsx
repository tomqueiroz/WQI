import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlog';
import { BLOG_CATEGORIES, LMS_ROUTES } from '@/lib/index';
import { Button } from '@/components/ui/button';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, error } = useBlogPost(slug || '');
  const { data: relatedPosts } = useBlogPosts(post?.category);

  const categoryInfo = BLOG_CATEGORIES.find((c) => c.key === post?.category);

  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const parseContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, idx) => {
      if (para.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-primary">
            {para.replace('## ', '')}
          </h2>
        );
      }
      return (
        <p key={idx} className="text-muted-foreground leading-relaxed mb-5">
          {para}
        </p>
      );
    });
  };

  const filteredRelatedPosts = relatedPosts
    ?.filter((p) => p.slug !== slug)
    .slice(0, 3);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold text-primary mb-4">Post não encontrado</h1>
          <Link to={LMS_ROUTES.BLOG}>
            <Button variant="outline">Voltar ao Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative h-[45vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          style={{
            backgroundImage: post.cover_image_url
              ? `url(${post.cover_image_url})`
              : 'linear-gradient(135deg, #001123 0%, #0d2040 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />

        <Link
          to={LMS_ROUTES.BLOG}
          className="absolute top-8 left-4 text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors z-30"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Blog
        </Link>

        <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 z-20">
          <div className="max-w-3xl mx-auto">
            {categoryInfo && (
              <span
                className="inline-block bg-accent/20 text-accent text-xs rounded-full px-3 py-1 font-semibold mb-3"
                style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
              >
                {categoryInfo.label}
              </span>
            )}
            <h1 className="text-white font-black text-2xl md:text-4xl leading-tight mt-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.read_time_minutes} min de leitura
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-muted/30 rounded-xl p-4 flex gap-4 items-start mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-accent text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
            {getAuthorInitials(post.author_name)}
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground">{post.author_name}</div>
            {post.author_bio && (
              <div className="text-sm text-muted-foreground mt-1">{post.author_bio}</div>
            )}
            <div className="text-xs text-muted-foreground mt-2">
              Publicado em {formatDate(post.published_at)}
            </div>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {parseContent(post.content)}
        </motion.article>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-primary rounded-2xl p-8 text-center mt-12"
        >
          <h3 className="text-white font-black text-2xl mb-3">Pronto para o Próximo Nível?</h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Transforme sua carreira com nossos programas de mentoria executiva em Marketing Digital e IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={LMS_ROUTES.PROGRAMAS}>
              <Button className="bg-accent text-white hover:bg-accent/90 rounded-full px-6 py-3">
                Explorar Programas
              </Button>
            </Link>
            <a
              href="https://wa.me/5511915513210?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-3"
              >
                Falar com Especialista
              </Button>
            </a>
          </div>
        </motion.div>

        {filteredRelatedPosts && filteredRelatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-primary mb-6">Artigos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelatedPosts.map((relatedPost) => {
                const relatedCategory = BLOG_CATEGORIES.find(
                  (c) => c.key === relatedPost.category
                );
                return (
                  <Link
                    key={relatedPost.id}
                    to={`${LMS_ROUTES.BLOG}/${relatedPost.slug}`}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all"
                    >
                      {relatedPost.cover_image_url && (
                        <div
                          className="aspect-[16/9] bg-cover bg-center"
                          style={{ backgroundImage: `url(${relatedPost.cover_image_url})` }}
                        />
                      )}
                      <div className="p-4">
                        {relatedCategory && (
                          <span
                            className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2"
                            style={{
                              backgroundColor: `${relatedCategory.color}20`,
                              color: relatedCategory.color,
                            }}
                          >
                            {relatedCategory.label}
                          </span>
                        )}
                        <h4 className="font-bold text-base text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{relatedPost.author_name}</span>
                          <span>{relatedPost.read_time_minutes} min</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
