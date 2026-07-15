// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Font, Link } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { GPlaydLogoOnly, GPlaydLogoWithText } from './gplayd';
import { SignatureMalloryScotton } from './signatures/mallory-scotton';

Font.register({
  family: 'PP Mori',
  fonts: [
    { src: '/fonts/PP Mori/PPMori-Extralight.otf', fontWeight: 200 },
    { src: '/fonts/PP Mori/PPMori-Regular.otf', fontWeight: 400 },
    { src: '/fonts/PP Mori/PPMori-SemiBold.otf', fontWeight: 600 }
  ]
});
Font.register({
  family: 'GT Haptik',
  fonts: [
    { src: '/fonts/GT Haptik/GT-Haptik-Black.woff2', fontWeight: 900 },
    { src: '/fonts/GT Haptik/GT-Haptik-Bold.woff2', fontWeight: 700 },
    { src: '/fonts/GT Haptik/GT-Haptik-Medium.woff2', fontWeight: 500 },
    { src: '/fonts/GT Haptik/GT-Haptik-Regular.woff2', fontWeight: 400 },
    { src: '/fonts/GT Haptik/GT-Haptik-Light.woff2', fontWeight: 300 },
    { src: '/fonts/GT Haptik/GT-Haptik-Thin.woff2', fontWeight: 200 },
    { src: '/fonts/GT Haptik/GT-Haptik-Lazer.woff2', fontWeight: 100 }
  ]
});

const px2pt = (px: number) => px * 0.75; // 1px (96dpi) = 0.75pt (72dpi)

// Tailwind's arbitrary px values converted to pt (PDF's native unit).
// 1px (96dpi) = 0.75pt (72dpi), so multiplying by 0.75 keeps the exact
// same physical proportions as the original browser layout.
const CERT_WIDTH = px2pt(1134);
const CERT_HEIGHT = px2pt(761);

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fbfaf8'
  },
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  mainContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: px2pt(134)
  },
  certificateTitle: {
    fontFamily: 'PP Mori',
    fontWeight: 600,
    fontSize: px2pt(21),
    color: '#28254C'
  },
  completionText: {
    fontFamily: 'GT Haptik',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: px2pt(34),
    marginTop: px2pt(31),
    color: '#28254C'
  },
  presentedTo: {
    fontFamily: 'PP Mori',
    fontWeight: 400,
    fontSize: px2pt(16),
    letterSpacing: px2pt(16 * 0.03),
    color: '#A5A5C0',
    marginTop: px2pt(27)
  },
  recipientName: {
    fontFamily: 'GT Haptik',
    fontWeight: 900,
    fontSize: px2pt(55),
    marginTop: px2pt(16),
    color: '#28254C',
    letterSpacing: px2pt(55 * 0.04),
    marginBottom: px2pt(14)
  },
  certificateDescription: {
    fontFamily: 'PP Mori',
    fontSize: px2pt(16),
    letterSpacing: px2pt(16 * 0.03),
    color: '#A5A5C0',
    marginTop: px2pt(22),
    textAlign: 'center',
    width: px2pt(650)
  },
  certificateDescriptionBold: {
    fontFamily: 'PP Mori',
    fontWeight: 700,
    color: '#A5A5C0'
  },
  topRightLogo: {
    position: 'absolute',
    top: px2pt(57),
    right: px2pt(50)
  },
  leftSignatureBlock: {
    position: 'absolute',
    left: px2pt(136),
    top: px2pt(564),
    display: 'flex',
    flexDirection: 'column',
    gap: px2pt(14)
  },
  rightSignatureBlock: {
    position: 'absolute',
    left: px2pt(762),
    top: px2pt(564),
    display: 'flex',
    flexDirection: 'column',
    gap: px2pt(14)
  },
  signatureImageWrap: {
    position: 'absolute',
    marginTop: px2pt(-91),
    marginLeft: px2pt(40)
  },
  divider: {
    width: px2pt(251),
    height: px2pt(1),
    borderRadius: 9999,
    backgroundColor: '#BCBDDE'
  },
  mainDivider: {
    width: px2pt(996),
    height: px2pt(2),
    borderRadius: 9999,
    backgroundColor: '#BCBDDE'
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: px2pt(4),
    paddingLeft: px2pt(1)
  },
  name: {
    fontFamily: 'GT Haptik',
    fontWeight: 700,
    fontSize: px2pt(13),
    color: '#8F8FAC',
    letterSpacing: px2pt(0.52)
  },
  role: {
    fontFamily: 'PP Mori',
    fontWeight: 400,
    fontSize: px2pt(13),
    color: '#A5A5C0'
  },
  subtitle: {
    marginTop: px2pt(47),
    fontFamily: 'PP Mori',
    fontWeight: 600,
    fontSize: px2pt(11),
    color: '#A5A5C0',
    textTransform: 'uppercase',
    marginBottom: px2pt(2)
  },
  date: {
    fontFamily: 'PP Mori',
    fontWeight: 400,
    fontSize: px2pt(13),
    color: '#434242'
  },
  certificateId: {
    fontFamily: 'PP Mori',
    fontWeight: 400,
    fontSize: px2pt(13),
    color: '#117CBD',
    textDecoration: 'none'
  }
});

interface FormattedTextProps {
  text: string;
  style?: Style | Style[];
  boldStyle?: Style | Style[];
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, style, boldStyle }) => {
  const lines = text.split('\n');

  return (
    <Text style={style}>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(\*\*.+?\*\*)/g).filter((part) => part.length > 0);

        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) => {
              const boldMatch = part.match(/^\*\*(.+)\*\*$/);
              if (boldMatch) {
                return (
                  <Text key={partIndex} style={boldStyle}>
                    {boldMatch[1]}
                  </Text>
                );
              }
              return part;
            })}
            {lineIndex < lines.length - 1 && '\n'}
          </React.Fragment>
        );
      })}
    </Text>
  );
};

export type FounderSlug = 'hugo-cathelain' | 'mallory-scotton' | 'ossan-msoili' | 'raphael-ostier' | 'nathan-fievet';

export interface CertificateProps {
  id: string;
  fullname: string;
  title: string;
  description: string;
  date: Date;
  leftSignature: FounderSlug;
  rightSignature: FounderSlug;
}

const founders: Record<FounderSlug, { name: string; role: string; signature: React.ReactNode }> = {
  'hugo-cathelain': {
    name: 'Hugo Cathelain',
    role: 'Co-Founder, Graphical Playground',
    signature: <SignatureMalloryScotton />
  },
  'mallory-scotton': {
    name: 'Mallory Scotton',
    role: 'Founder & Technical Lead, Graphical Playground',
    signature: <SignatureMalloryScotton />
  },
  'ossan-msoili': {
    name: 'Ossan Msoili',
    role: 'Co-Founder, Graphical Playground',
    signature: <SignatureMalloryScotton />
  },
  'raphael-ostier': {
    name: 'Raphaël Ostier',
    role: 'Co-Founder, Graphical Playground',
    signature: <SignatureMalloryScotton />
  },
  'nathan-fievet': {
    name: 'Nathan Fievet',
    role: 'Co-Founder, Graphical Playground',
    signature: <SignatureMalloryScotton />
  }
};

export const Certificate: React.FC<CertificateProps> = ({
  id,
  fullname,
  title,
  description,
  date,
  leftSignature,
  rightSignature
}) => {
  const formattedDate = date
    .toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    })

  return (
    <Page size={[CERT_WIDTH, CERT_HEIGHT]} style={styles.page}>
      <View style={styles.root}>
        {/* BACKGROUND */}
        <View style={styles.background}>
          <GPlaydLogoOnly />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* TOP RIGHT GPLAYD LOGO */}
          <View style={styles.topRightLogo}>
            <GPlaydLogoWithText />
          </View>

          {/* MAIN CONTENT */}
          <View style={styles.mainContent}>
            <Text style={styles.certificateTitle}>{title}</Text>
            <Text style={styles.completionText}>CERTIFICATE OF COMPLETION</Text>
            <Text style={styles.presentedTo}>Presented to</Text>
            <Text style={styles.recipientName}>{fullname}</Text>
            <View style={styles.mainDivider} />
            <FormattedText
              text={description}
              style={styles.certificateDescription}
              boldStyle={styles.certificateDescriptionBold}
            />
          </View>

          {/* LEFT SIGNATURE */}
          <View style={styles.leftSignatureBlock}>
            <View style={styles.divider} />
            <View style={styles.textBlock}>
              <Text style={styles.name}>{founders[leftSignature].name}</Text>
              <Text style={styles.role}>{founders[leftSignature].role}</Text>
              <Text style={styles.subtitle}>VERIFIED CERTIFICATE</Text>
              <Text style={styles.date}>Issued {formattedDate}</Text>
            </View>
            <View style={styles.signatureImageWrap}>{founders[leftSignature].signature}</View>
          </View>

          {/* RIGHT SIGNATURE */}
          <View style={styles.rightSignatureBlock}>
            <View style={styles.divider} />
            <View style={styles.textBlock}>
              <Text style={styles.name}>{founders[rightSignature].name}</Text>
              <Text style={styles.role}>{founders[rightSignature].role}</Text>
              <Text style={styles.subtitle}>VALID CERTIFICATE ID</Text>
              <Link src={`https://graphical-playground.com/certificate/${id}`} style={styles.certificateId}>
                {id}
              </Link>
            </View>
            <View style={styles.signatureImageWrap}>{founders[rightSignature].signature}</View>
          </View>
        </View>
      </View>
    </Page>
  );
};

// Certificate is now a <Page>, so it composes into any <Document>.
// This wrapper is just a convenience for when it's the only page.
export const CertificateDocument: React.FC<CertificateProps> = (props) => {
  const kebabCaseFullName = props.fullname.toLowerCase().replace(/\s+/g, '-');

  return (
    <Document
      title={`gplayd-cert-${props.id.toLowerCase()}-${kebabCaseFullName}.pdf`}
      author='Graphical Playground'
      subject='Certificate of Completion'
      creator='Graphical Playground'
      keywords='certificate completion learning gplayd graphical-playground'
      language='en-US'
      pageLayout='singlePage'
      creationDate={props.date}
    >
      <Certificate {...props} />
    </Document>
  );
};
