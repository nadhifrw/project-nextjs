'use client';

import AddDosen from "@/components/dosen/AddDosen"
import { DosenTable } from "@/components/dosen/DosenTable";
import React, { useEffect, useState } from 'react';

type Dosen = {
    nidn: string;
    nama: string;
    department: {
      nama: string;
    };
};

export default function Page() {
    const [data, setData] = useState<Dosen[]>([]);

    // Fetching data from Prisma (you might do this in an API route instead)
    useEffect(() => {
        async function fetchData() {
        const res = await fetch('/api/dosen');
        const dosenData = await res.json();
        setData(dosenData);
        }
        fetchData();
    }, []);
    
    return(
        <main>
            <div className="">
                <div className="m-4">
                    <AddDosen/>
                </div>
                <div className="shadow-xl m-4 p-4 border border-solid rounded-md">
                    <DosenTable data={data}/>
                </div>
            </div>
        </main>
    )
}