import React, { useState } from 'react';
import { Home } from './pages/Home';
import { ScanBill } from './pages/ScanBill';
import { SplitBill } from './pages/SplitBill';
import { Summary } from './pages/Summary';
import { Header } from './components/Header';
export function App() {
  const [currentStep, setCurrentStep] = useState('home');
  const [billData, setBillData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [assignments, setAssignments] = useState({});
  const goToStep = step => {
    setCurrentStep(step);
  };
  const handleBillScanned = data => {
    setBillData(data);
    setCurrentStep('split');
  };
  const handleParticipantsUpdate = people => {
    setParticipants(people);
  };
  const handleAssignments = itemAssignments => {
    setAssignments(itemAssignments);
    setCurrentStep('summary');
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentStep={currentStep} />
      <main className="flex-1">
        {currentStep === 'home' && <Home onGetStarted={() => goToStep('scan')} />}
        {currentStep === 'scan' && <ScanBill onBillScanned={handleBillScanned} />}
        {currentStep === 'split' && <SplitBill billData={billData} participants={participants} onParticipantsUpdate={handleParticipantsUpdate} onSplitComplete={handleAssignments} />}
        {currentStep === 'summary' && <Summary billData={billData} participants={participants} assignments={assignments} onStartOver={() => {
        setBillData(null);
        setParticipants([]);
        setAssignments({});
        goToStep('home');
      }} />}
      </main>
    </div>;
}