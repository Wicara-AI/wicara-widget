// hooks/useFilePreview.ts
import { useState, useCallback } from 'react';
import { FilePreview } from '../types/chat';
import { uploadFile, UploadFileRequest } from '../utilities/api';
import { ApiHeaders } from '../utilities/baseApi';

type UseFilePreviewProps = {
  apiHeaders: ApiHeaders;
}

// Modified hook implementation to work with the new upload function
export const useFilePreview = ({ apiHeaders }: UseFilePreviewProps) => {
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  const addFiles = useCallback(async (files: FileList) => {
    const newPreviews: FilePreview[] = [];
    const filesPayload = Array.from(files).map((file) => ({
      file,
      temporaryId: `${Date.now()}-${Math.random()}`
    }));

    const abortController = new AbortController();

    try {
      const uploadedFiles = await Promise.all(
        filesPayload.map(async ({ temporaryId, file }) => {
          try {
            const result = await uploadFile(
              { file }, // Now we can pass the File object directly
              apiHeaders,
              abortController.signal
            );
            return {
              ...result,
              temporaryId,
            };
          } catch (error) {
            return {
              temporaryId,
              error: error instanceof Error ? error.message : 'Upload failed',
            };
          }
        })
      );

      uploadedFiles.forEach((file) => {
        if ('error' in file) {
          newPreviews.push({
            id: file.temporaryId,
            previewUrl: '',
            name: 'Upload failed',
            type: 'error',
            isLoading: false,
            temporaryId: file.temporaryId,
            error: file.error as string,
          });
        } else {
          newPreviews.push({
            id: file.id,
            previewUrl: file.path,
            name: file.name,
            type: file.path,
            isLoading: false,
            temporaryId: file.temporaryId,
            error: null,
          });
        }
      });

      setPreviews(prev => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  }, [apiHeaders]);

  // Rest of the hook implementation remains the same
  const removeFile = useCallback((id: string) => {
    setPreviews(prev => {
      const preview = prev.find(p => p.id === id);
      if (preview?.previewUrl) {
        URL.revokeObjectURL(preview.previewUrl);
      }
      return prev.filter(p => p.id !== id);
    });
  }, []);

  return { previews, addFiles, removeFile };
};
