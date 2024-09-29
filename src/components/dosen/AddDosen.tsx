'use client'

import { Button } from "@/components/ui/button"

export function AddButtonDosen(){
    return(
        <div className="w-full">
            <Button className="bg-green-500 hover:bg-green-700">Tambah Dosen</Button>
        </div>
    )
}

export default function DosenButton(){
    return (
        <div className="container mb-4">
            <AddButtonDosen/>
        </div>
    )
}