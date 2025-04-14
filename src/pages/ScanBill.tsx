import React, { useState } from 'react';
import { CameraIcon, UploadIcon, Loader2Icon } from 'lucide-react';
import { mockBillData } from '../utils/mockData';
export function ScanBill({
  onBillScanned
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleScanReceipt = () => {
    setIsProcessing(true);
    // Simulate OCR processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onBillScanned(mockBillData);
    }, 2000);
  };
  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Scan Your Bill</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <p className="text-gray-600 text-center mb-4">
            Take a photo of your receipt or upload an image
          </p>
          {uploadedImage ? <div className="relative">
              <img src={uploadedImage} alt="Uploaded receipt" className="w-full h-64 object-contain border rounded-lg" />
              <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                ✕
              </button>
            </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <CameraIcon className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No image uploaded yet</p>
              <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md inline-flex items-center">
                <UploadIcon className="h-4 w-4 mr-2" />
                <span>Upload Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>}
        </div>
        <div className="flex justify-center">
          <button onClick={handleScanReceipt} disabled={isProcessing || !uploadedImage} className={`
              flex items-center justify-center w-full py-3 px-6 rounded-lg
              ${uploadedImage && !isProcessing ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              font-medium transition-colors
            `}>
            {isProcessing ? <>
                <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </> : <>
                <CameraIcon className="h-5 w-5 mr-2" />
                Scan Receipt
              </>}
          </button>
        </div>
        {/* Demo shortcut for this prototype */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-3">
            For demo purposes only:
          </p>
          <button onClick={() => onBillScanned(mockBillData)} className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
            Use Sample Bill Data
          </button>
        </div>
      </div>
    </div>;
}