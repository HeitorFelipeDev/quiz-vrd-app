// components/Layout.tsx
import { ReactNode, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const enterFullscreen = async () => {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        await elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Erro ao entrar em tela cheia:", error);
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      enterFullscreen();
      document.removeEventListener('click', handleUserInteraction); // Remove o listener após a primeira interação
    };

    // Adiciona um listener de evento para a primeira interação do usuário
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction); // Limpeza do listener
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
