import { useState } from 'react'
import { TypeArticle } from '../types'
import EditArticle from './EditArticle'
import DeleteArticle from './DeleteArticle'

interface ArticleListProps {
  articles: TypeArticle[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  const [editingArticleId, setEditingArticleId] = useState<number | string | null>(null)
  const [editingArticleTitle, setEditingArticleTitle] = useState('')
  const [processingArticleIds, setProcessingArticleIds] = useState<(number | string)[]>([])

  const handleEditArticle = (articleId: number | string, currentTitle: string) => {
    setEditingArticleId(articleId)
    setEditingArticleTitle(currentTitle)
  }

  const handleCancelEdit = () => {
    setEditingArticleId(null)
    setEditingArticleTitle('')
  }

  const handleProcessingStart = (articleId: number | string) => {
    setProcessingArticleIds(prev => [...prev, articleId])
  }

  const handleProcessingEnd = (articleId: number | string) => {
    setProcessingArticleIds(prev => prev.filter(id => id !== articleId))
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <div key={article.id} className="article-item">
          {editingArticleId === article.id ? (
            <EditArticle
              article={article}
              editingArticleTitle={editingArticleTitle}
              setEditingArticleTitle={setEditingArticleTitle}
              onCancelEdit={handleCancelEdit}
              isProcessing={processingArticleIds.includes(article.id)}
              articles={articles}
            />
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
                <DeleteArticle
                  article={article}
                  articles={articles}
                  isProcessing={processingArticleIds.includes(article.id)}
                  onProcessingStart={() => handleProcessingStart(article.id)}
                  onProcessingEnd={() => handleProcessingEnd(article.id)}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ArticleList 