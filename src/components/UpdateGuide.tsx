import { useState } from 'react'

const UpdateGuide = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="guide-container">
      <button
        className="guide-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Guide' : 'What is Optimistic Update?'}
      </button>

      {isOpen && (
        <div className="guide-content">
          <h2>Understanding Updates in this Demo</h2>

          <div className="guide-section">
            <h3>Classic Async Update</h3>
            <p>
              In a classic async update, the UI waits for the server response before updating:
            </p>
            <ol>
              <li>User initiates action (create/update/delete)</li>
              <li>UI shows loading state</li>
              <li>Wait for server response</li>
              <li>On success: Update UI with new data</li>
              <li>On failure: Show error message</li>
            </ol>
            <p className="guide-note">
              👉 More reliable but slower user experience
            </p>
          </div>

          <div className="guide-section">
            <h3>Optimistic Update</h3>
            <p>
              With optimistic updates, we update the UI immediately, assuming success:
            </p>
            <ol>
              <li>User initiates action</li>
              <li>Immediately update UI</li>
              <li>Send request to server in background</li>
              <li>On success: Update with server data if needed</li>
              <li>On failure: Revert UI to previous state</li>
            </ol>
            <p className="guide-note">
              👉 Faster perceived performance but needs fallback handling
            </p>
          </div>

          <div className="guide-section">
            <h3>Try it yourself!</h3>
            <p>
              Each action in this demo has two buttons - one for classic async updates
              and one for optimistic updates. Try them both to see the difference in user experience!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateGuide 