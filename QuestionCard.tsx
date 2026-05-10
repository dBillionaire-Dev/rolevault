import styles from './QuestionCard.module.css'

const LABELS = ['Question 1', 'Question 2', 'Question 3'] as const

interface QuestionCardProps {
  text: string
  index: number
}

export default function QuestionCard({ text, index }: QuestionCardProps) {
  const label = LABELS[index] ?? `Question ${index + 1}`

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className={styles.label}>{label}</span>
      <p className={styles.text}>{text}</p>
    </div>
  )
}
