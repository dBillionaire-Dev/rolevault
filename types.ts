/** The shape of a single content block returned by the Anthropic API */
export interface AnthropicContentBlock {
  type: 'text' | 'tool_use' | 'tool_result' | 'image' | 'document'
  text?: string
}

/** The top-level shape of an Anthropic /v1/messages response */
export interface AnthropicResponse {
  content: AnthropicContentBlock[]
}

/** All possible UI states the app can be in */
export type AppStatus = 'idle' | 'loading' | 'success' | 'error'
