// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useParams } from 'next/navigation';
import { CertificateDocument } from '@/components/certificate';
import dynamic from 'next/dynamic';
import type { CertificateProps } from '@/components/certificate';

const MOCK_DATA: CertificateProps = {
  fullname: 'John Doe',
  id: 'A3K8-M9P2-X7R4',
  title: 'Memory Architecture & Custom Allocators',
  description: 'This is to certify that you have successfully completed the online course in **Memory Architecture & Custom Allocators**, demonstrating proficiency in custom memory management and smart pointer design in modern C++.',
  date: new Date('07-29-2026'),
  leftSignature: 'hugo-cathelain',
  rightSignature: 'mallory-scotton'
};

const idRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), { ssr: false });

export default function CertificatePage() {
  const params = useParams();
  const certificateId = params['id'];

  if (!certificateId) {
    return <div>Certificate ID not provided</div>;
  }

  if (!idRegex.test(certificateId as string)) {
    return <div>Invalid certificate ID format</div>;
  }

  const certificateData = { ...MOCK_DATA, id: certificateId as string };

  if (!certificateData) {
    return <div>Certificate not found</div>;
  }

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <CertificateDocument
        title={certificateData.title}
        id={certificateId as string}
        fullname={certificateData.fullname}
        description={certificateData.description}
        date={certificateData.date}
        leftSignature={certificateData.leftSignature}
        rightSignature={certificateData.rightSignature}
      />
    </PDFViewer>
  );
}
