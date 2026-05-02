import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useBlogPosts } from '@/hooks/useBlog';
import { BLOG_CATEGORIES, LMS_ROUTES } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const { data: posts, loading, error } = useBlogPosts(activeCategory);

  const featuredPosts = posts?.filter(p => p.is_featured) || [];
  const regularPosts = posts?.filter(p => !p.is_featured) || [];

  const getCategoryColor = (categoryKey: string) => {
    const cat = BLOG_CATEGORIES.find(c => c.key === categoryKey);
    return cat?.color || '#001123';
  };

  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden" style={{ minHeight: '50vh' }}>
        <div
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.PARALLAX_AI_MARKETING})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/80" />
        <div className="relative z-20 flex flex-col justify-end pb-12 px-4 max-w-7xl mx-auto" style={{ minHeight: '50vh' }}>
          <p className="text-white/40 text-xs mb-3">Início / Blog</p>
          <h1 className="text-white font-black text-4xl md:text-5xl">Insights & Perspectivas</h1>
          <p className="text-white/65 max-w-2xl mt-4">
            Reflexões sobre AI First Era, liderança digital e o futuro do marketing executivo.
          </p>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="rounded-2xl border overflow-hidden">
                    <Skeleton className="w-full aspect-[16/9]" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive text-sm">Erro ao carregar posts: {error.message}</p>
            </div>
          )}

          {!loading && !error && posts && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum post encontrado nesta categoria.</p>
            </div>
          )}

          {!loading && !error && posts && posts.length > 0 && (
            <div className="space-y-12">
              {featuredPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Em Destaque</h2>
                  <div className="space-y-6">
                    <Link
                      to={`${LMS_ROUTES.BLOG}/${featuredPosts[0].slug}`}
                      className="block relative overflow-hidden rounded-2xl aspect-[21/9] group"
                      style={{
                        backgroundImage: featuredPosts[0].cover_image_url
                          ? `url(${featuredPosts[0].cover_image_url})`
                          : 'linear-gradient(135deg, #001123 0%, #0d2040 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                      <span
                        className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${getCategoryColor(featuredPosts[0].category)}1A`,
                          color: getCategoryColor(featuredPosts[0].category),
                        }}
                      >
                        {BLOG_CATEGORIES.find(c => c.key === featuredPosts[0].category)?.label || featuredPosts[0].category}
                      </span>
                      <h2 className="absolute bottom-8 left-6 text-white font-black text-2xl max-w-xl">
                        {featuredPosts[0].title}
                      </h2>
                      <span className="absolute bottom-8 right-6 text-accent text-sm font-semibold group-hover:underline">
                        Ler artigo →
                      </span>
                    </Link>

                    {featuredPosts.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredPosts.slice(1).map(post => (
                          <Link
                            key={post.id}
                            to={`${LMS_ROUTES.BLOG}/${post.slug}`}
                            className="block relative overflow-hidden rounded-2xl aspect-[16/9] group"
                            style={{
                              backgroundImage: post.cover_image_url
                                ? `url(${post.cover_image_url})`
                                : 'linear-gradient(135deg, #001123 0%, #0d2040 100%)',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                            <span
                              className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: `${getCategoryColor(post.category)}1A`,
                                color: getCategoryColor(post.category),
                              }}
                            >
                              {BLOG_CATEGORIES.find(c => c.key === post.category)?.label || post.category}
                            </span>
                            <h3 className="absolute bottom-6 left-4 text-white font-bold text-lg max-w-sm">
                              {post.title}
                            </h3>
                            <span className="absolute bottom-6 right-4 text-accent text-xs font-semibold group-hover:underline">
                              Ler artigo →
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {regularPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Mais Artigos</h2>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {regularPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ y: -4 }}
                          className="rounded-2xl border overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                        >
                          <Link to={`${LMS_ROUTES.BLOG}/${post.slug}`}>
                            <div
                              className="w-full aspect-[16/9] object-cover"
                              style={{
                                backgroundImage: post.cover_image_url
                                  ? `url(${post.cover_image_url})`
                                  : 'linear-gradient(135deg, #001123 0%, #0d2040 100%)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            />
                            <div className="p-4">
                              <span
                                className="text-xs font-semibold px-2 py-1 rounded-full inline-block"
                                style={{
                                  backgroundColor: `${getCategoryColor(post.category)}1A`,
                                  color: getCategoryColor(post.category),
                                }}
                              >
                                {BLOG_CATEGORIES.find(c => c.key === post.category)?.label || post.category}
                              </span>
                              <h3 className="font-bold text-base mt-2 line-clamp-2">{post.title}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-3 mt-1">{post.excerpt}</p>
                              <div className="flex justify-between items-center mt-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center">
                                    {getAuthorInitials(post.author_name)}
                                  </div>
                                  <span className="text-xs text-foreground">{post.author_name}</span>
                                </div>
                                <span className="text-muted-foreground text-xs">{post.read_time_minutes} min</span>
                              </div>
                              <div className="mt-3">
                                <span className="text-accent text-xs font-semibold hover:underline">Ler artigo →</span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
