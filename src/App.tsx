import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useAppDispatch } from './hooks/redux/useAppDispatch'
import { useAppSelector } from './hooks/redux/useAppSelector'
import { addArticle, deleteArticle, updateArticle, addArticlesAtIndex } from './store/articleSlice'
import { TypeArticle } from './types'
import { fakeApiFailure, fakeApiMethod } from './api'
import { findCurrentArticleAndIndexFromState } from './utils'
import { toast } from 'react-toastify'

function App() {
  const { articles } = useAppSelector(state => state.articleSlice)
  const dispatch = useAppDispatch()

  const [newArticleTitle, setNewArticleTitle] = useState('Article Title')
  const [isLoading, setIsLoading] = useState(false)
  const [editingArticleId, setEditingArticleId] = useState<number | string | null>(null)
  const [editingArticleTitle, setEditingArticleTitle] = useState('')
  const [processingArticleIds, setProcessingArticleIds] = useState<(number | string)[]>([])

  const handleAddArticle = () => {
    setIsLoading(true)
    toast.info('Adding article...')

    fakeApiMethod().then(() => {
      const article: TypeArticle = { title: newArticleTitle, id: `server-generated-id-${uuidv4()}` }
      dispatch(addArticle(article))

      setNewArticleTitle('')
      toast.success('Article added successfully!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleDeleteArticle = (articleId: number | string) => {
    setIsLoading(true)
    setProcessingArticleIds(prev => [...prev, articleId])
    toast.info('Deleting article...')

    fakeApiMethod().then(() => {
      dispatch(deleteArticle(articleId))
      toast.success('Article deleted successfully!')
    }).finally(() => {
      setIsLoading(false)
      setProcessingArticleIds(prev => prev.filter(id => id !== articleId))
    })
  }

  const handleUpdateArticle = (articleId: number | string, newTitle: string) => {
    setIsLoading(true)
    setProcessingArticleIds(prev => [...prev, articleId])
    toast.info('Updating article...')

    fakeApiMethod().then(() => {
      const fakeArticleFromResponse: TypeArticle = { title: newTitle, id: `server-generated-id-${articleId}` }
      dispatch(updateArticle({ id: articleId, article: fakeArticleFromResponse }))

      setEditingArticleId(null)
      setEditingArticleTitle('')
      toast.success('Article updated successfully!')
    }).finally(() => {
      setIsLoading(false)
      setProcessingArticleIds(prev => prev.filter(id => id !== articleId))
    })
  }

  const handleAddArticleOptimistically = () => {
    setIsLoading(true)

    // Optimistic Update:
    const dummyId = uuidv4();
    const article: TypeArticle = { title: newArticleTitle, id: dummyId }
    dispatch(addArticle(article))

    setNewArticleTitle('')
    toast.success('Article added successfully!')

    fakeApiMethod().then(() => {
      // Update with server based response
      const responseArticle: TypeArticle = { title: newArticleTitle, id: `server-generated-id-${dummyId}` }
      dispatch(updateArticle({ id: dummyId, article: responseArticle }))
    }).catch(() => {
      // Revert on failure
      dispatch(deleteArticle(dummyId))
      toast.error('Failed to add article.')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleDeleteArticleOptimistically = (articleId: number | string) => {
    setIsLoading(true)
    setProcessingArticleIds(prev => [...prev, articleId])

    const { index, article } = findCurrentArticleAndIndexFromState(articles, articleId);
    dispatch(deleteArticle(articleId))
    toast.info('Deleting article...')

    fakeApiFailure().then(() => {
      toast.success('Article deleted successfully!')
      // API call succeeded
    }).catch(() => {
      dispatch(addArticlesAtIndex({ index, articles: [article] }))
      toast.error('Failed to delete article.')
    }).finally(() => {
      setIsLoading(false)
      setProcessingArticleIds(prev => prev.filter(id => id !== articleId))
    })
  }

  const handleUpdateArticleOptimistically = (articleId: number | string, newTitle: string) => {
    setIsLoading(true)
    setProcessingArticleIds(prev => [...prev, articleId])

    const { index, article } = findCurrentArticleAndIndexFromState(articles, articleId!);
    dispatch(updateArticle({ id: articleId!, article: { title: newTitle, id: articleId! } }))

    setEditingArticleId(null)
    setEditingArticleTitle('')

    toast.success('Article updated successfully!')

    fakeApiMethod().then(() => {
      // Server updates the article
    }).catch(() => {
      dispatch(addArticlesAtIndex({ index, articles: [article] }))
      toast.error('Failed to update article.')
    }).finally(() => {
      setIsLoading(false)
      setProcessingArticleIds(prev => prev.filter(id => id !== articleId))
    })
  }

  const handleCancelUpdate = () => {
    setEditingArticleId(null)
    setEditingArticleTitle('')
  }

  const handleEditArticle = (articleId: number | string, currentTitle: string) => {
    setEditingArticleId(articleId)
    setEditingArticleTitle(currentTitle)
  }

  return (
    <>
      <div className="github-link">
        <a href="https://github.com/ZtheLeader/redux-optimistic"
          target="_blank"
          rel="noopener noreferrer"
          title="View source on GitHub">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </div>
      <h1>Articles {isLoading ? '(API call being made...)' : ''}</h1>
      <div className="card">
        <div className="column-headers">
          <span className="column-header">Article Title</span>
          <span className="column-header">Article ID</span>
          <span className="column-header">Action Buttons</span>
        </div>
        <div className="article-list">
          {articles.map((article) => (
            <div key={article.id} className="article-item">
              {editingArticleId === article.id ? (
                <>
                  <input
                    type="text"
                    value={editingArticleTitle}
                    onChange={(e) => setEditingArticleTitle(e.target.value)}
                    className="input"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdateArticle(article.id, editingArticleTitle)}
                    disabled={processingArticleIds.includes(article.id)}
                    className="btn btn-update"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleUpdateArticleOptimistically(article.id, editingArticleTitle)}
                    disabled={processingArticleIds.includes(article.id)}
                    className="btn btn-update"
                  >
                    Update (Optimistically)
                  </button>
                  <button
                    onClick={handleCancelUpdate}
                    disabled={processingArticleIds.includes(article.id)}
                    className="btn btn-cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="article-title">{article.title}</span>
                  <code>{article.id}</code>
                  <div className="article-actions">
                    <button
                      onClick={() => handleEditArticle(article.id, article.title)}
                      disabled={processingArticleIds.includes(article.id)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      disabled={processingArticleIds.includes(article.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDeleteArticleOptimistically(article.id)}
                      disabled={processingArticleIds.includes(article.id)}
                      className="btn btn-delete"
                    >
                      Delete (Optimistically)
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>


        <div className="row">
          <input
            type="text"
            value={newArticleTitle}
            onChange={(e) => setNewArticleTitle(e.target.value)}
            placeholder="Enter article title"
            className="input"
            autoFocus
          />
          <button onClick={handleAddArticle} disabled={!newArticleTitle} className="btn btn-add">Add Article</button>
          <button onClick={handleAddArticleOptimistically} disabled={!newArticleTitle} className="btn btn-add">Add Article (Optimistically)</button>
        </div>

      </div>
    </>
  )
}

export default App
