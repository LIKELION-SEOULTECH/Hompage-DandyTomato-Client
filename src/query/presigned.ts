import { useMutation } from '@tanstack/react-query'
import { getPresignedUrl } from '@/api/presigned'

// Presigned URL 요청
export function usePresignedUrl() {
    return useMutation({
        mutationFn: ({ fileName, directory, fileType }: { 
            fileName: string; 
            directory: string; 
            fileType: string 
        }) => getPresignedUrl(fileName, directory, fileType),
        onError: (error) => {
            console.error('Presigned URL 요청 실패:', error)
        }
    })
} 