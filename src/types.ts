/** The shape of a single part in a Gemini response */
export interface GeminiPart {
  text: string
}

/** A single content block in a Gemini response */
export interface GeminiContent {
  parts: GeminiPart[]
  role: string
}

/** A single candidate in a Gemini response */
export interface GeminiCandidate {
  content: GeminiContent
  finishReason: string
}

/** The top-level shape of a Gemini generateContent response */
export interface GeminiResponse {
  candidates: GeminiCandidate[]
}

/** All possible UI states the app can be in */
export type AppStatus = 'idle' | 'loading' | 'success' | 'error'
