
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Check, Download } from 'lucide-react';

interface ResultDisplayProps {
  text: string;
}

export function ResultDisplay({ text }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'Copied to clipboard',
      description: 'The extracted text has been copied to your clipboard.',
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Downloaded',
      description: 'The extracted text has been downloaded as a text file.',
    });
  };
  
  if (!text) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6 glass-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-brand-dark">Extracted Text</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div 
        ref={textRef}
        className="bg-brand-accent bg-opacity-30 rounded-md p-4 max-h-96 overflow-y-auto whitespace-pre-wrap text-brand-dark"
      >
        {text}
      </div>
    </div>
  );
}
