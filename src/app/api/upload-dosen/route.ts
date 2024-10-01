import { NextRequest, NextResponse } from 'next/server';
import { Formidable, IncomingForm } from 'formidable';
import fs from 'fs';
import Papa from 'papaparse';
import { Readable } from 'stream';
import prisma from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file upload
  },
};

// Convert NextRequest to a format Formidable can handle
async function convertNextRequestToNodeRequest(req: NextRequest) {
  const readableStream = new Readable({
    read() {
      this.push(req.body);
      this.push(null);
    },
  });

  return {
    req: readableStream,
    headers: req.headers,
    method: req.method,
    url: req.url,
  };
}

// Function to parse the form and extract the uploaded file
const parseForm = (req: any): Promise<{ fields: any; files: any }> => {
  const form = new Formidable({ multiples: true, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// Helper function to parse CSV using PapaParse
const parseCSV = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const results: any[] = [];

    Papa.parse(fileStream, {
      header: true, // Assuming your CSV has headers
      complete: (result) => {
        resolve(result.data); // Result.data will be an array of objects representing rows
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

// Handle the POST request for CSV file upload
export async function POST(req: NextRequest) {
  try {
    // Convert NextRequest to Node.js request
    const nodeRequest = await convertNextRequestToNodeRequest(req);

    const { files } = await parseForm(nodeRequest.req);

    if (!files || !files.file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const filePath = files.file.filepath;

    // Parse CSV using PapaParse
    const data = await parseCSV(filePath);

    // Insert parsed CSV data into Prisma database
    for (const row of data) {
      await prisma.dosen.create({
        data: {
          nidn: row.NIDN,
          nama: row.NamaDosen,
          department: {
            connect: { id_department: Number(row.DepartmentId) },
          },
        },
      });
    }

    return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error inserting data' }, { status: 500 });
  }
}
