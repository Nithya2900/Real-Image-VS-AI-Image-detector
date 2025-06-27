const HUGGING_FACE_API_URL ="https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector";

// Replace this with your actual Hugging Face API token
const HUGGING_FACE_API_TOKEN = "Bearer ";

export async function classifyImage(imageFile: File): Promise<{
  isAI: boolean;
  confidence: number;
  label: string;
}> {
  try {
    // Send the image as binary data (raw blob)
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: HUGGING_FACE_API_TOKEN,
        // ❗ Do not manually set Content-Type; the browser will set it automatically
      },
      body: imageFile,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();

    // Hugging Face typically returns an array of predictions
    const predictions = Array.isArray(result) ? result : [result];
    const topPrediction = predictions[0];

    if (!topPrediction || !topPrediction.label || topPrediction.score === undefined) {
      throw new Error("Invalid prediction received from the model");
    }

    const label = topPrediction.label;
    const confidence = Math.round(topPrediction.score * 100);

    const isAI =
      label.toLowerCase().includes("ai") ||
      label.toLowerCase().includes("artificial") ||
      label.toLowerCase().includes("generated") ||
      label.toLowerCase().includes("fake");

    return {
      isAI,
      confidence,
      label,
    };
  } catch (error) {
    console.error("Classification error:", error);
    throw new Error("Failed to classify image. Please try again.");
  }
}
