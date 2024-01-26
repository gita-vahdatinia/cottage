// jsonErrorHandler.ts

export const isJsonValid = (content: string): boolean => {
    try {
      JSON.parse(content);
      return false; // JSON is well-formed
    } catch (error) {
      return true; // JSON is malformed
    }
  };
  
  export const handleJsonError = (error: Error): string => {
    if (error instanceof SyntaxError) {
      return 'Malformed JSON file. Please check the file format.';
    } else {
      return 'Error reading or parsing JSON file. Please try again.';
    }
  };
  