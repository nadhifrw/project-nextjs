import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PenelitianFileUploadForm } from './PenelitianFileUploadForm';

export default function AddDataPenelitian(){
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button 
                className="bg-green-500 hover:bg-green-700"
                onClick={() => setOpen(true)}
            >
                Tambah Penelitian
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Penelitian</DialogTitle>
                        <DialogDescription>
                            Upload file .csv untuk menambahkan data penelitian ke dalam database.
                        </DialogDescription>
                    </DialogHeader>
                    <PenelitianFileUploadForm closeModal={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

// export default function UploadsButton(){
//     return (
//         <div className="flex flex-row m-4">
//             <div className="mr-2">
//                 <AddDataPengabdian/>
//             </div>
//             <div className="ml-2">
//                 <AddDataPenelitian/>
//             </div>
//         </div>
//     )
// }