export const generateStoryIdea = async (genre: string, theme: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ genre, theme }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to connect to the creative muse.');
    }

    const data = await response.json();
    return data.text || "Could not generate story idea. Please try again.";
  } catch (error: any) {
    console.error("Error generating story:", error);
    return error.message || "An error occurred while connecting to the creative muse. Please check your connection.";
  }
};
