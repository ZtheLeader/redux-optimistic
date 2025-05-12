import { useState } from 'react'
import { useAppDispatch } from '../hooks/redux/useAppDispatch'
import { addArticle, updateArticle, deleteArticle } from '../store/articleSlice'
import { v4 as uuidv4 } from 'uuid'
import { fakeApiMethod } from '../api'
import { toast } from 'react-toastify'

const AddArticle = () => {
  const dispatch = useAppDispatch()
  const [newArticleTitle, setNewArticleTitle] = useState('Article Title')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddArticle = () => {
    setIsLoading(true)
    toast.info('Adding article...')

    fakeApiMethod().then(() => {
      const article = { title: newArticleTitle, id: `server-generated-id-${uuidv4()}` }
      dispatch(addArticle(article))

      setNewArticleTitle('')
      toast.success('Article added successfully!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleAddArticleOptimistically = () => {
    setIsLoading(true)
    const dummyId = uuidv4();
    const article = { title: newArticleTitle, id: dummyId }
    dispatch(addArticle(article))

    setNewArticleTitle('')
    toast.success('Article added successfully!')

    fakeApiMethod().then(() => {
      const responseArticle = { title: newArticleTitle, id: `server-generated-id-${dummyId}` }
      dispatch(updateArticle({ id: dummyId, article: responseArticle }))
    }).catch(() => {
      dispatch(deleteArticle(dummyId))
      toast.error('Failed to add article.')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="row">
      <input
        type="text"
        value={newArticleTitle}
        onChange={(e) => setNewArticleTitle(e.target.value)}
        placeholder="Enter article title"
        className="input"
        autoFocus
        disabled={isLoading}
      />
      <button
        onClick={handleAddArticle}
        disabled={!newArticleTitle || isLoading}
        className="btn btn-add"
      >
        Add Article
      </button>
      <button
        onClick={handleAddArticleOptimistically}
        disabled={!newArticleTitle || isLoading}
        className="btn btn-add"
      >
        Add Article (Optimistically)
      </button>
    </div>
  )
}

export default AddArticle 