/**
 * Image Generation Service
 * Supports multiple providers: Replicate, Stability AI, or placeholder images for demo
 */

const DEBOUNCE_DELAY = 1000; // 1 second delay after user stops typing

export interface ImageGenerationResponse {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

/**
 * Generate image using Replicate API (Stable Diffusion)
 * Get your API key from: https://replicate.com/account/api-tokens
 */
export const generateImageWithReplicate = async (
  prompt: string,
  apiKey?: string
): Promise<ImageGenerationResponse> => {
  const REPLICATE_API_KEY = apiKey || import.meta.env.VITE_REPLICATE_API_KEY;
  
  if (!REPLICATE_API_KEY) {
    throw new Error('Replicate API key not found. Add VITE_REPLICATE_API_KEY to .env file');
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
        input: {
          prompt: prompt,
          num_outputs: 1,
          aspect_ratio: '16:9',
          output_format: 'url',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Poll for completion
    let result = data;
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_KEY}`,
        },
      });
      result = await statusResponse.json();
    }

    if (result.status === 'succeeded' && result.output && result.output.length > 0) {
      return {
        imageUrl: result.output[0],
        prompt: prompt,
        timestamp: Date.now(),
      };
    } else {
      throw new Error('Image generation failed');
    }
  } catch (error) {
    console.error('Replicate API error:', error);
    throw error;
  }
};

/**
 * Generate image using Stability AI
 * Get your API key from: https://platform.stability.ai/account/keys
 */
export const generateImageWithStability = async (
  prompt: string,
  apiKey?: string
): Promise<ImageGenerationResponse> => {
  const STABILITY_API_KEY = apiKey || import.meta.env.VITE_STABILITY_API_KEY;
  
  if (!STABILITY_API_KEY) {
    throw new Error('Stability AI API key not found. Add VITE_STABILITY_API_KEY to .env file');
  }

  try {
    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: '16:9',
          output_format: 'png',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Stability AI API error: ${error.message || response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      imageUrl,
      prompt: prompt,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Stability AI API error:', error);
    throw error;
  }
};

/**
 * Generate image using Hugging Face Inference API (Free tier, no API key required for some models)
 * Uses Stable Diffusion models that accept text prompts
 */
export const generateImageWithHuggingFace = async (
  prompt: string
): Promise<ImageGenerationResponse> => {
  try {
    // Using a public Stable Diffusion model from Hugging Face
    // Note: For free tier, you may need a token with "Read" permission for Inference API
    // Get token from: https://huggingface.co/settings/tokens (create token with Read access)
    const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    
    // Try a more accessible model that works better with free tier
    const modelUrl = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization if token is provided
    if (HF_API_KEY) {
      headers['Authorization'] = `Bearer ${HF_API_KEY}`;
    }
    
    console.log('Calling Hugging Face API with model:', modelUrl);
    console.log('Has API key:', !!HF_API_KEY);
    
    const response = await fetch(
      modelUrl,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error response:', response.status, errorText);
      
      // Handle 403 - Permission error
      if (response.status === 403) {
        console.log('403 Permission error, trying without auth or alternative model...');
        // Try alternative model without auth (public access)
        return generateImageWithHuggingFaceAlt(prompt);
      }
      
      // If model is loading (503), try an alternative model
      if (response.status === 503) {
        console.log('Model loading, trying alternative model...');
        return generateImageWithHuggingFaceAlt(prompt);
      }
      
      // Try to parse error message
      let errorMessage = response.statusText;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || response.statusText;
      } catch {
        // Not JSON, use status text
      }
      
      throw new Error(`Hugging Face API error (${response.status}): ${errorMessage}`);
    }

    // Check if response is actually an image
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);
    
    if (!contentType || !contentType.startsWith('image/')) {
      const text = await response.text();
      console.error('Unexpected response type:', text);
      throw new Error('API returned non-image response. Model may be loading or unavailable.');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    console.log('Image blob created successfully');

    return {
      imageUrl,
      prompt: prompt,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Hugging Face API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // If it's a rate limit or model loading error, try alternative
    if (errorMessage.includes('503') || errorMessage.includes('loading')) {
      return generateImageWithHuggingFaceAlt(prompt);
    }
    
    // For other errors, throw to show user feedback
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }
};

/**
 * Alternative Hugging Face model (fallback)
 * Tries without authentication first (public access), then with auth
 */
const generateImageWithHuggingFaceAlt = async (
  prompt: string
): Promise<ImageGenerationResponse> => {
  // List of models to try (most accessible first)
  const modelsToTry = [
    'CompVis/stable-diffusion-v1-4',
    'runwayml/stable-diffusion-v1-5',
    'stabilityai/stable-diffusion-2-1',
  ];
  
  const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model}`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Try without auth first (some models allow public access)
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            inputs: prompt,
          }),
        }
      );

      // If 401/403, try with auth if we have a key
      if ((response.status === 401 || response.status === 403) && HF_API_KEY) {
        console.log(`Retrying ${model} with authentication...`);
        const authResponse = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HF_API_KEY}`,
            },
            body: JSON.stringify({
              inputs: prompt,
            }),
          }
        );
        
        if (authResponse.ok) {
          const contentType = authResponse.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            const blob = await authResponse.blob();
            const imageUrl = URL.createObjectURL(blob);
            console.log(`Success with ${model} (authenticated)`);
            return {
              imageUrl,
              prompt: prompt,
              timestamp: Date.now(),
            };
          }
        }
      }
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          console.log(`Success with ${model} (public access)`);
          return {
            imageUrl,
            prompt: prompt,
            timestamp: Date.now(),
          };
        } else {
          // Model might be loading (503)
          const text = await response.text();
          console.log(`${model} response (not image):`, text);
          if (response.status === 503) {
            continue; // Try next model
          }
        }
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error);
      continue; // Try next model
    }
  }
  
  // If all models fail, use placeholder
  console.log('All Hugging Face models failed, using placeholder');
  return generatePlaceholderImage(prompt);
};

/**
 * Generate placeholder image that acknowledges the prompt
 * This is used as a final fallback when APIs are unavailable
 */
export const generatePlaceholderImage = async (
  prompt: string
): Promise<ImageGenerationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a text-to-image placeholder that shows the prompt is being used
  // Using a service that can generate images from text descriptions
  const encodedPrompt = encodeURIComponent(prompt.substring(0, 50));
  
  // Use Unsplash Source API which can search by keyword
  // This at least uses your prompt as a search term
  const imageUrl = `https://source.unsplash.com/800x450/?${encodedPrompt}`;
  
  return {
    imageUrl,
    prompt: prompt,
    timestamp: Date.now(),
  };
};

/**
 * Main function to generate images with automatic provider selection
 */
export const generateImage = async (
  prompt: string,
  provider: 'replicate' | 'stability' | 'huggingface' | 'placeholder' = 'huggingface'
): Promise<ImageGenerationResponse> => {
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Prompt cannot be empty');
  }

  // Auto-select provider based on available API keys
  let selectedProvider = provider;
  if (provider === 'huggingface' || provider === 'placeholder') {
    // Auto-select best available provider
    if (import.meta.env.VITE_REPLICATE_API_KEY) {
      selectedProvider = 'replicate';
    } else if (import.meta.env.VITE_STABILITY_API_KEY) {
      selectedProvider = 'stability';
    } else {
      // Try Hugging Face (free tier, may have rate limits)
      selectedProvider = 'huggingface';
    }
  }

  switch (selectedProvider) {
    case 'replicate':
      return generateImageWithReplicate(prompt);
    case 'stability':
      return generateImageWithStability(prompt);
    case 'huggingface':
      return generateImageWithHuggingFace(prompt);
    case 'placeholder':
    default:
      return generatePlaceholderImage(prompt);
  }
};

/**
 * Debounce helper for search input
 * Creates a debounced version of the function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

