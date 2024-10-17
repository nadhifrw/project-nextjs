import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PengabdianFileUploadForm } from './PengabdianFileUploadForm';

export default function AddDataPengabdian(){
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button 
                className="bg-green-500 hover:bg-green-700"
                onClick={() => setOpen(true)}
            >
                Tambah Pengabdian
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Pengabdian</DialogTitle>
                        <DialogDescription>
                            Upload file .csv untuk menambahkan data pengabdian ke dalam database.
                        </DialogDescription>
                    </DialogHeader>
                    <PengabdianFileUploadForm closeModal={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}