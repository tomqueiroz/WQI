import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Rola a página para o topo sempre que a rota mudar.
 * Use no componente raiz (App.tsx) ou em páginas individuais.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Se houver hash (âncora), não faz nada — deixa o browser rolar até o elemento
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
}
