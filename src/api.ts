import type { GeminiResponse } from './types'

const GEMINI_MODEL = 'gemini-3.1-flash-lite'
const QUESTION_COUNT = 3

// Vite exposes env variables via import.meta.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`

/**
 * Builds the prompt for the given job title.
 * Keeping it in its own function makes it easy to test and iterate on.
 */
function buildPrompt(jobTitle: string): string {
  return `You are an expert interviewer and talent acquisition specialist.

Generate exactly ${QUESTION_COUNT} thoughtful, specific interview questions for the role: "${jobTitle}".

Requirements:
- Each question must be directly relevant to the specific responsibilities and challenges of this role
- Questions should assess different dimensions: one behavioral, one situational or competency-based, one role-specific or technical
- Questions should be open-ended and encourage detailed responses
- Avoid generic questions that could apply to any job

Respond ONLY with a JSON array of exactly ${QUESTION_COUNT} strings, each being one interview question. No preamble, no markdown, no explanation. Example format:
["Question 1 here?","Question 2 here?","Question 3 here?"]`
}

/**
 * Calls the Gemini API and returns an array of interview questions
 * for the given job title.
 *
 * @throws {Error} if the API call fails or the response cannot be parsed
 */
export async function generateInterviewQuestions(jobTitle: string): Promise<string[]> {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: buildPrompt(jobTitle) }],
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})) as { error?: { message?: string } }
    throw new Error(errorBody?.error?.message ?? `API error ${response.status}`)
  }

  const data = (await response.json()) as GeminiResponse

  // Gemini returns candidates array — we want the first one's text
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  // Strip markdown code fences in case the model wraps its JSON output
  const cleaned = rawText.replace(/```json|```/g, '').trim()

  const parsed: unknown = JSON.parse(cleaned)

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Unexpected response format from API.')
  }

  // Ensure every element is a string before returning
  const questions = parsed.filter((item): item is string => typeof item === 'string')

  return questions.slice(0, QUESTION_COUNT)
}
