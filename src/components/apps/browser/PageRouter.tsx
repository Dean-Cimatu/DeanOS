import { HomePage } from './HomePage'
import { AboutPage } from './AboutPage'
import { ProjectsPage } from './ProjectsPage'
import { CVPage } from './CVPage'
import { ContactPage } from './ContactPage'
import { NotFoundPage } from './NotFoundPage'

interface PageRouterProps {
  currentPage: string
  onNavigate: (path: string) => void
}

export const PageRouter = ({ currentPage, onNavigate }: PageRouterProps) => {
  switch (currentPage) {
    case '/':
      return <HomePage onNavigate={onNavigate} />
    case '/about':
      return <AboutPage />
    case '/projects':
      return <ProjectsPage />
    case '/cv':
      return <CVPage />
    case '/contact':
      return <ContactPage />
    default:
      return <NotFoundPage path={currentPage} />
  }
}
