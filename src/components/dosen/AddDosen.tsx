import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FileUploadForm } from './FileUploadForm';

export default function UploadDosenModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="bg-green-500 text-white">
        Tambah Dosen
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Dosen</DialogTitle>
            <DialogDescription>
              Upload file .csv untuk menambahkan dosen ke dalam database
            </DialogDescription>
          </DialogHeader>
          <FileUploadForm closeModal={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

