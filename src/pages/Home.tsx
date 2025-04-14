import React from 'react';
import { CameraIcon, SplitIcon, CreditCardIcon, CheckCircleIcon } from 'lucide-react';
export function Home({
  onGetStarted
}) {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Snap. Split. Settle.
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Effortless bill-splitting with AI + OCR
          </p>
          <button onClick={onGetStarted} className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
            Get Started
          </button>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Snap</h3>
              <p className="text-gray-600">
                Take a photo of your receipt. Our AI instantly recognizes all
                items and prices.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SplitIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Split</h3>
              <p className="text-gray-600">
                Assign items to people in your group with a simple tap. Add tax
                and tip automatically.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Settle</h3>
              <p className="text-gray-600">
                See who owes what and settle up instantly through Venmo, PayPal,
                or other payment apps.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered OCR</h3>
                <p className="text-gray-600">
                  Our advanced AI recognizes items and prices with exceptional
                  accuracy, even on poorly printed receipts.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Fair Split Calculator
                </h3>
                <p className="text-gray-600">
                  Automatically calculates tax and tip proportionally based on
                  what each person ordered.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Payment Integration
                </h3>
                <p className="text-gray-600">
                  Send payment requests directly through popular payment apps
                  with just one tap.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expense History</h3>
                <p className="text-gray-600">
                  Keep track of all your shared expenses and settlements in one
                  place.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={onGetStarted} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
              Try SmartSplit Now
            </button>
          </div>
        </div>
      </section>
    </div>;
}