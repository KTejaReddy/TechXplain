import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Categories from './pages/Categories.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ConceptPage from './pages/ConceptPage.jsx'
import NotFound from './pages/NotFound.jsx'

/** Scroll back to the top whenever the route changes (but not on filter changes). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/concept/:conceptId" element={<ConceptPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
