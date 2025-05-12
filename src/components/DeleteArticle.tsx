import { TypeArticle } from '../types'
import { useAppDispatch } from '../hooks/redux/useAppDispatch'
import { deleteArticle, addArticlesAtIndex } from '../store/articleSlice'
import { fakeApiMethod, fakeApiFailure } from '../api'
import { findCurrentArticleAndIndexFromState } from '../utils'
import { toast } from 'react-toastify'

interface DeleteArticleProps {
  article: TypeArticle
  articles: TypeArticle[]
  isProcessing: boolean
  onProcessingStart: () => void
  onProcessingEnd: () => void
}

const DeleteArticle = ({
  article,
  articles,
  isProcessing,
  onProcessingStart,
  onProcessingEnd
}: DeleteArticleProps) => {
  const dispatch = useAppDispatch()

  const handleDeleteArticle = () => {
    onProcessingStart()
    toast.info('Deleting article...')

    fakeApiMethod().then(() => {
      dispatch(deleteArticle(article.id))
      toast.success('Article deleted successfully!')
    }).finally(() => {
      onProcessingEnd()
    })
  }

  const handleDeleteArticleOptimistically = () => {
    onProcessingStart()

    const { index, article: originalArticle } = findCurrentArticleAndIndexFromState(articles, article.id)
    dispatch(deleteArticle(article.id))
    toast.info('Deleting article...')

    fakeApiFailure().then(() => {
      toast.success('Article deleted successfully!')
    }).catch(() => {
      dispatch(addArticlesAtIndex({ index, articles: [originalArticle] }))
      toast.error('Failed to delete article.')
    }).finally(() => {
      onProcessingEnd()
    })
  }

  return (
    <div className="article-actions">
      <button
        onClick={handleDeleteArticle}
        disabled={isProcessing}
        className="btn btn-delete"
      >
        Delete
      </button>
      <button
        onClick={handleDeleteArticleOptimistically}
        disabled={isProcessing}
        className="btn btn-delete"
      >
        Delete (Optimistically)
      </button>
    </div>
  )
}

export default DeleteArticle 