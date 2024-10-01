import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FileUploadForm } from '@/components/dosen/FileUploadForm';

export function AddDataPengabdian(){
    const [open, setOpen] = useState(false);
    return (
        <div>
             <Button className="bg-green-500 hover:bg-green-700">Tambah Pengabdian</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Dosen</DialogTitle>
                        <DialogDescription>
                        Upload file .csv untuk menambahkan dosen ke dalam database.
                        </DialogDescription>
                    </DialogHeader>
                    <FileUploadForm closeModal={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
        </div>
    )
}

export function AddDataPenelitian(){
    const [open, setOpen] = useState(false);
    return (
        <div>
             <Button className="bg-green-500 hover:bg-green-700">Tambah Penelitian</Button>
             <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Dosen</DialogTitle>
                    <DialogDescription>
                    Upload file .csv untuk menambahkan dosen ke dalam database.
                    </DialogDescription>
                </DialogHeader>
                <FileUploadForm closeModal={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default function UploadsButton(){
    return (
        <div className="flex flex-row m-4">
            <div className="mr-2">
                <AddDataPengabdian/>
            </div>
            <div className="ml-2">
                <AddDataPengabdian/>
            </div>
        </div>
    )
}