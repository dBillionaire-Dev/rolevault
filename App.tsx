import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import QuestionCard from './QuestionCard'
import { generateInterviewQuestions } from './api'
import type { AppStatus } from './types'
import styles from './App.module.css'

const DEFAULT_JOB_TITLE = 'Customer Success Manager'

const LOADING_MESSAGES = [
  'Thinking about this role...',
  'Crafting thoughtful questions...',
  'Tailoring to the position...',
] as const

export default function App() {
  const [jobTitle, setJobTitle] = useState<string>(DEFAULT_JOB_TITLE)
  const [submittedTitle, setSubmittedTitle] = useState<string>('')
  const [questions, setQuestions] = useState<string[]>([])
  const [status, setStatus] = useState<AppStatus>('idle')
  const [loadingMsg, setLoadingMsg] = useState<string>(LOADING_MESSAGES[0])
  const [error, setError] = useState<string>('')

  // useRef so updating it doesn't trigger a re-render
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function generate(): Promise<void> {
    const title = jobTitle.trim()
    if (!title || status === 'loading') return

    setStatus('loading')
    setError('')
    setQuestions([])
    setSubmittedTitle(title)

    // Cycle through loading messages while waiting for the API
    let msgIndex = 0
    setLoadingMsg(LOADING_MESSAGES[0])
    intervalRef.current = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIndex])
    }, 1800)

    try {
      const result = await generateInterviewQuestions(title)
      setQuestions(result)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.'
      setError(message)
      setStatus('error')
    } finally {
      // Always clean up the interval, whether the call succeeded or failed
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }

  // Run on first mount with the default job title
  useEffect(() => {
    generate()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') generate()
  }

  const isLoading = status === 'loading'

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Interview Question Generator</h1>
          <p className={styles.subtitle}>
            Enter any job title to generate three thoughtful, role-specific interview questions.
          </p>
        </header>

        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.input}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Customer Success Manager"
            maxLength={100}
            disabled={isLoading}
            aria-label="Job title"
          />
          <button
            className={styles.button}
            onClick={generate}
            disabled={isLoading || !jobTitle.trim()}
          >
            {isLoading ? 'Generating…' : 'Generate →'}
          </button>
        </div>

        {isLoading && (
          <div className={styles.loadingBox} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span className={styles.loadingText}>{loadingMsg}</span>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        {status === 'success' && questions.length > 0 && (
          <section className={styles.results} aria-label="Generated interview questions">
            <span className={styles.roleChip}>{submittedTitle}</span>
            <div className={styles.questionList}>
              {questions.map((question, index) => (
                <QuestionCard key={index} text={question} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
