import React from 'react';
import { ReceiptIcon } from 'lucide-react';
export function Header({
  currentStep
}) {
  const steps = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'scan',
    label: 'Snap'
  }, {
    id: 'split',
    label: 'Split'
  }, {
    id: 'summary',
    label: 'Settle'
  }];
  return <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ReceiptIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">SmartSplit</h1>
          </div>
          <div className="hidden sm:flex">
            {currentStep !== 'home' && <div className="flex space-x-4">
                {steps.slice(1).map(step => <div key={step.id} className={`flex items-center ${currentStep === step.id ? 'font-bold' : 'text-indigo-200'}`}>
                    <span>{step.label}</span>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </header>;
}