import React from 'react';
import { QrReader } from 'react-qr-reader';

interface QRScannerProps {
  onScan: (result: string | null) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  return (
    <div style={{ width: '300px' }}>
      <QrReader
        // Gamitan natin ng error handling para hindi magreklamo ang linter at para mas reliable
        onResult={(result, error) => {
          if (error) {
            console.error('QR scan error:', error);
            onScan(null);
            return;
          }

          if (!result) {
            onScan(null);
            return;
          }

          // result can be a string or an object with getText() or text properties.
          const resObj = result as unknown as { getText?: () => string; text?: string };

          let text: string | null = null;
          if (typeof result === 'string') {
            text = result;
          } else if (resObj.getText && typeof resObj.getText === 'function') {
            text = resObj.getText();
          } else if (typeof resObj.text === 'string') {
            text = resObj.text;
          }

          onScan(text);
        }}
        constraints={{ facingMode: 'user' }}
      />
    </div>
  );
};