import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';

interface PengabdianFileUploadFormProps {
  closeModal: () => void;
}

export function PengabdianFileUploadForm({ closeModal }: PengabdianFileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a .csv file');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: async function(results) {
        console.log("Parsed Results:", results.data);

        try {
          const response = await fetch('/api/upload-pengabdian', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(results.data),
          });

          if (response.ok) {
            const responseData = await response.json();
            alert(`File processed successfully.\nSuccessful: ${responseData.results.success}\nSkipped: ${responseData.results.skipped}\nErrors: ${responseData.results.errors.length}`);
            closeModal();
          } else {
            const errorData = await response.json();
            alert(`Error processing file: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Error uploading file');
        }
      },
      error: function(error) {
        console.error('Error parsing file:', error);
        alert('Error parsing file');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeModal}>
          Batal
        </Button>
        <Button type="submit" className="bg-green-500 text-white">
          Simpan
        </Button>
      </div>
    </form>
  );
}