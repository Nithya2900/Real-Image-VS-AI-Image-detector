export interface ClassificationResult {
  label: string;
  score: number;
  isAI: boolean;
}

export interface UploadedImage {
  file: File;
  preview: string;
}

export interface ApiResponse {
  predictions: Array<{
    label: string;
    score: number;
  }>;
}