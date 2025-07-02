import { apiClient } from './client'
import { v4 as uuidv4 } from 'uuid'

export interface PresignedUrlResponse {
    url: string
    fields?: Record<string, string>
}

// Presigned URL 발급 (ADMIN)
export async function getPresignedUrl(
    fileName: string,
    directory: string,
    fileType: string
): Promise<PresignedUrlResponse> {
    const res = await apiClient.post<PresignedUrlResponse>(
        '/presigned-upload',
        {
            fileKey: `${directory}/${uuidv4()}/${fileName}`,
            mimeType: fileType
        }
    )
    return res.data
}
