import { Button } from "./ui/button"

export function AddDataPengabdian(){
    return (
        <div>
             <Button className="bg-green-500 hover:bg-green-700">Tambah Pengabdian</Button>
        </div>
    )
}

export function AddDataPenelitian(){
    return (
        <div>
             <Button className="bg-green-500 hover:bg-green-700">Tambah Penelitian</Button>
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