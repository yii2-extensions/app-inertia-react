import Footer from "./Footer";
import FlashMessages from "./FlashMessages";
import Navbar from "./Navbar";

/**
 * Application layout: fixed navbar, flash region, page slot, and footer.
 */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex grow flex-col">
        <div className="mx-auto flex w-full max-w-7xl grow flex-col px-4 pb-3 pt-[68px] sm:px-6 lg:px-8">
          <FlashMessages />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
