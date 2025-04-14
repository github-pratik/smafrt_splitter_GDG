import React, { useState } from 'react';
import { CheckCircleIcon, ShareIcon, HomeIcon } from 'lucide-react';
export function Summary({
  billData,
  participants,
  assignments,
  onStartOver
}) {
  const [paymentStatus, setPaymentStatus] = useState({});
  const handleMarkAsPaid = personId => {
    setPaymentStatus(prev => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };
  const handleShare = personId => {
    const person = participants.find(p => p.id === personId);
    const amount = assignments.finalAssignments[personId].total.toFixed(2);
    alert(`Payment request to ${person.name} for $${amount} would be sent here.`);
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-2">Bill Summary</h1>
      <p className="text-gray-600 text-center mb-8">
        {billData.restaurant} • {billData.date}
      </p>
      <div className="max-w-lg mx-auto">
        {/* Bill Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>${billData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax</span>
            <span>${billData.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">
              Tip ({assignments.tipPercent}%)
            </span>
            <span>
              ${(billData.subtotal * (assignments.tipPercent / 100)).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>
              $
              {(billData.subtotal + billData.tax + billData.subtotal * (assignments.tipPercent / 100)).toFixed(2)}
            </span>
          </div>
        </div>
        {/* Individual Payments */}
        <h2 className="text-xl font-semibold mb-4">Who Pays What</h2>
        {participants.map(person => {
        const personTotal = assignments.finalAssignments[person.id];
        const isPaid = paymentStatus[person.id];
        return <div key={person.id} className={`
                bg-white rounded-lg shadow-md p-4 mb-4 transition-all
                ${isPaid ? 'border-l-4 border-green-500 bg-green-50' : ''}
              `} style={!isPaid ? {
          borderLeft: `4px solid ${person.color}`
        } : {}}>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  <p className="text-2xl font-bold">
                    ${personTotal.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleShare(person.id)} disabled={isPaid} className={`
                      p-2 rounded-full
                      ${isPaid ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}
                    `}>
                    <ShareIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleMarkAsPaid(person.id)} className={`
                      p-2 rounded-full
                      ${isPaid ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}>
                    <CheckCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>${personTotal.items.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${personTotal.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tip:</span>
                  <span>${personTotal.tip.toFixed(2)}</span>
                </div>
              </div>
              {isPaid && <div className="mt-2 text-green-600 flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">Marked as paid</span>
                </div>}
            </div>;
      })}
        {/* Start Over Button */}
        <div className="flex justify-center mt-8">
          <button onClick={onStartOver} className="flex items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <HomeIcon className="h-5 w-5 mr-2" />
            Start Over
          </button>
        </div>
      </div>
    </div>;
}