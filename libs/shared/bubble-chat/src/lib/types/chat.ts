// types/index.ts
export interface FilePreview {
  id: string
  temporaryId: string | undefined
  name: string
  type: string
  previewUrl: string
  isLoading: boolean
  error: string | null
}
