import { Header } from './header';
import { Footer } from './footer';
import './styles.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="main-page">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
