import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse'

interface FileUploadFormProps {
  closeModal: () => void; // Define the type of closeModal as a function that returns void
}

export function FileUploadForm({ closeModal }: FileUploadFormProps) {
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

    // Use PapaParse to parse the file
    Papa.parse(file, {
      header: true, // Assuming your CSV has a header row
      complete: async function(results) {
        console.log("Parsed Results:", results.data); // Data parsed from the CSV file

        try {
          // POST request to upload the parsed CSV data to your backend
          const response = await fetch('/api/upload-dosen', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: results.data }),
          });

          if (response.ok) {
            alert('File uploaded successfully');
            closeModal(); // Close the modal after success
          } else {
            alert('Error uploading file');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
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
