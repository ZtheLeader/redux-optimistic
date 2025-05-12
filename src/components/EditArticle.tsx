import { TypeArticle } from '../types'
import { useAppDispatch } from '../hooks/redux/useAppDispatch'
import { fakeApiMethod } from '../api'
import { updateArticle, addArticlesAtIndex } from '../store/articleSlice'
import { toast } from 'react-toastify'

interface EditArticleProps {
  article: TypeArticle
  editingArticleTitle: string
  setEditingArticleTitle: (title: string) => void
  onCancelEdit: () => void
  isProcessing: boolean
  articles: TypeArticle[]
}

const EditArticle = ({
  article,
  editingArticleTitle,
  setEditingArticleTitle,
  onCancelEdit,
  isProcessing,
  articles
}: EditArticleProps) => {
  const dispatch = useAppDispatch()

  const handleUpdateArticle = () => {
    toast.info('Updating article...')

    fakeApiMethod().then(() => {
      const fakeArticleFromResponse = { title: editingArticleTitle, id: `server-generated-id-${article.id}` }
      dispatch(updateArticle({ id: article.id, article: fakeArticleFromResponse }))

      onCancelEdit()
      toast.success('Article updated successfully!')
    })
  }

  const handleUpdateArticleOptimistically = () => {
    const index = articles.findIndex(a => a.id === article.id)
    const originalArticle = articles[index]

    dispatch(updateArticle({ id: article.id, article: { title: editingArticleTitle, id: article.id } }))
    onCancelEdit()
    toast.success('Article updated successfully!')

    fakeApiMethod().then(() => {
      // Server updates the article
    }).catch(() => {
      dispatch(addArticlesAtIndex({ index, articles: [originalArticle] }))
      toast.error('Failed to update article.')
    })
  }

  return (
    <>
      <input
        type="text"
        value={editingArticleTitle}
        onChange={(e) => setEditingArticleTitle(e.target.value)}
        className="input"
        autoFocus
      />
      <button
        onClick={handleUpdateArticle}
        disabled={isProcessing}
        className="btn btn-update"
      >
        Update
      </button>
      <button
        onClick={handleUpdateArticleOptimistically}
        disabled={isProcessing}
        className="btn btn-update"
      >
        Update (Optimistically)
      </button>
      <button
        onClick={onCancelEdit}
        disabled={isProcessing}
        className="btn btn-cancel"
      >
        Cancel
      </button>
    </>
  )
}

export default EditArticle 