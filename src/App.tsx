import './App.css'
import { useAppSelector } from './hooks/redux/useAppSelector'
import GitHubLink from './components/GitHubLink'
import ArticleList from './components/ArticleList'
import AddArticle from './components/AddArticle'

function App() {
  const { articles } = useAppSelector(state => state.articleSlice)

  return (
    <>
      <GitHubLink />
      <h1>Articles</h1>
      <div className="card">
        <div className="column-headers">
          <span className="column-header">Article Title</span>
          <span className="column-header">Article ID</span>
          <span className="column-header">Action Buttons</span>
        </div>
        <ArticleList articles={articles} />
        <AddArticle />
      </div>
    </>
  )
}

export default App
