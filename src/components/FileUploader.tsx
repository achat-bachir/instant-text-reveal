
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FileUp, X, Loader, FileText } from 'lucide-react';

interface FileUploaderProps {
  isLoggedIn: boolean;
  userPlan: 'free' | 'premium';
  onExtractedText: (text: string) => void;
}

export function FileUploader({ isLoggedIn, userPlan, onExtractedText }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const MAX_FILE_SIZE_FREE = 1 * 1024 * 1024; // 1MB - updated to match API limit
  const MAX_FILE_SIZE_PREMIUM = 5 * 1024 * 1024; // 5MB
  
  const maxFileSize = userPlan === 'premium' ? MAX_FILE_SIZE_PREMIUM : MAX_FILE_SIZE_FREE;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a valid image (JPEG, PNG, GIF) or PDF file.',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate file size
      if (selectedFile.size > maxFileSize) {
        toast({
          title: 'File too large',
          description: `File size exceeds the ${userPlan === 'premium' ? '5MB' : '1MB'} limit. ${!isLoggedIn || userPlan === 'free' ? 'Upgrade to Premium for larger files.' : ''}`,
          variant: 'destructive',
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const fakeProgress = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(fakeProgress);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // API request to the N8N webhook
      const response = await fetch('https://louisetest.app.n8n.cloud/webhook/Image2Text', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(fakeProgress);
      setUploadProgress(100);
      
      const data = await response.json();
      console.log("API response:", data);
      
      // New handling for the nested JSON structure
      if (data && Array.isArray(data) && data[0] && data[0].ParsedText) {
        try {
          // The ParsedText field contains a JSON string that needs to be parsed
          const parsedJson = JSON.parse(data[0].ParsedText);
          
          // Extract the actual text from the parsed JSON
          if (parsedJson.ParsedResults && 
              parsedJson.ParsedResults[0] && 
              parsedJson.ParsedResults[0].ParsedText) {
            
            const extractedText = parsedJson.ParsedResults[0].ParsedText;
            onExtractedText(extractedText);
            
            toast({
              title: 'Text extracted successfully',
              description: 'Your file has been processed.',
            });
            return;
          }
        } catch (parseError) {
          console.error("Error parsing nested JSON:", parseError);
          // If it's not valid JSON, just use the ParsedText directly
          onExtractedText(data[0].ParsedText);
          return;
        }
      }
      
      // Fallback to previous handling methods if the new format isn't detected
      if (data[0] && data[0].OCRExitCode === 3) {
        // This is an error response from the API
        const errorMessages = data[0].ErrorMessage || ["Unknown error occurred"];
        const errorMessage = Array.isArray(errorMessages) ? errorMessages.join(". ") : errorMessages;
        
        toast({
          title: 'Extraction failed',
          description: errorMessage,
          variant: 'destructive',
        });
        
        // Still show the error message in the text area
        onExtractedText(`Error from OCR service: ${errorMessage}`);
        return;
      }
      
      // Check if we have extracted text in the older format
      if (data[0] && data[0].ParsedResults && data[0].ParsedResults[0] && data[0].ParsedResults[0].ParsedText) {
        const extractedText = data[0].ParsedResults[0].ParsedText;
        onExtractedText(extractedText);
        toast({
          title: 'Text extracted successfully',
          description: 'Your file has been processed.',
        });
      } else if (data.extractedText) {
        // Fallback to older response format if present
        onExtractedText(data.extractedText);
        toast({
          title: 'Text extracted successfully',
          description: 'Your file has been processed.',
        });
      } else {
        // If we can't find a recognized format, show a simplified version of the raw response
        onExtractedText(`Raw API Response: ${JSON.stringify(data, null, 2)}`);
        toast({
          title: 'Unable to extract formatted text',
          description: 'Showing raw API response data.',
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Extraction failed',
        description: 'Failed to extract text from the file. Please try again.',
        variant: 'destructive',
      });
      
      // For error case, show the actual error
      if (error instanceof Error) {
        onExtractedText(`Error: ${error.message}`);
      } else {
        onExtractedText("An unknown error occurred during text extraction.");
      }
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 glass-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold purple-gradient-text mb-2">
          Extract Text from Images & PDFs
        </h2>
        <p className="text-gray-600">
          Upload your file to instantly extract all text content
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {userPlan === 'premium' 
            ? 'Premium plan: Up to 5MB files, 1,000 extractions/month' 
            : 'Free plan: Up to 1MB files, 10 extractions/month'}
        </p>
      </div>
      
      <div className="space-y-4">
        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF or PDF up to {userPlan === 'premium' ? '5MB' : '1MB'}
            </p>
            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.gif,.pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-brand-primary" />
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearFile}
                disabled={isUploading}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {isUploading && (
              <div className="mt-3">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-center mt-1 text-gray-500">
                  Processing your file...
                </p>
              </div>
            )}
          </div>
        )}
        
        <Button 
          className="w-full"
          disabled={!file || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Extract Text'
          )}
        </Button>
      </div>
    </div>
  );
}
