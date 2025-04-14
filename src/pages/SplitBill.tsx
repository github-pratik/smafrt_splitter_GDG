import React, { useEffect, useState } from 'react';
import { PlusIcon, MinusIcon, UserPlusIcon, TrashIcon } from 'lucide-react';
import { mockParticipants } from '../utils/mockData';
export function SplitBill({
  billData,
  participants,
  onParticipantsUpdate,
  onSplitComplete
}) {
  const [people, setPeople] = useState(participants.length ? participants : mockParticipants.slice(0, 2));
  const [newPersonName, setNewPersonName] = useState('');
  const [itemAssignments, setItemAssignments] = useState({});
  const [tipPercent, setTipPercent] = useState(18);
  useEffect(() => {
    onParticipantsUpdate(people);
  }, [people, onParticipantsUpdate]);
  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      // Generate a random color for the new person
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#EF4444'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setPeople([...people, {
        id: Date.now(),
        name: newPersonName.trim(),
        color: randomColor
      }]);
      setNewPersonName('');
    }
  };
  const handleRemovePerson = id => {
    setPeople(people.filter(person => person.id !== id));
    // Remove this person's assignments
    const updatedAssignments = {
      ...itemAssignments
    };
    Object.keys(updatedAssignments).forEach(itemId => {
      updatedAssignments[itemId] = updatedAssignments[itemId].filter(assignedId => assignedId !== id);
    });
    setItemAssignments(updatedAssignments);
  };
  const togglePersonForItem = (itemId, personId) => {
    setItemAssignments(prev => {
      const current = prev[itemId] || [];
      const updated = current.includes(personId) ? current.filter(id => id !== personId) : [...current, personId];
      return {
        ...prev,
        [itemId]: updated
      };
    });
  };
  const getItemTotal = item => {
    const assignees = itemAssignments[item.id] || [];
    if (assignees.length === 0) return 0;
    const perPerson = item.price / assignees.length;
    return perPerson;
  };
  const calculatePersonTotal = personId => {
    let total = 0;
    billData.items.forEach(item => {
      const assignees = itemAssignments[item.id] || [];
      if (assignees.includes(personId)) {
        total += item.price / assignees.length;
      }
    });
    // Add proportional tax
    const proportion = total / billData.subtotal;
    const tax = billData.tax * proportion;
    const tip = billData.subtotal * (tipPercent / 100) * proportion;
    return {
      items: total,
      tax,
      tip,
      total: total + tax + tip
    };
  };
  const handleSplitComplete = () => {
    // Calculate final assignments with costs
    const finalAssignments = {};
    people.forEach(person => {
      finalAssignments[person.id] = calculatePersonTotal(person.id);
    });
    onSplitComplete({
      itemAssignments,
      finalAssignments,
      tipPercent
    });
  };
  const isAllItemsAssigned = () => {
    // Check if all items have at least one person assigned
    return billData.items.every(item => (itemAssignments[item.id] || []).length > 0);
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Split Your Bill</h1>
      {/* People Management Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">
          Who's splitting the bill?
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {people.map(person => <div key={person.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1" style={{
          borderLeft: `4px solid ${person.color}`
        }}>
              <span className="mr-2">{person.name}</span>
              <button onClick={() => handleRemovePerson(person.id)} className="text-gray-500 hover:text-red-500">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>)}
        </div>
        <div className="flex">
          <input type="text" value={newPersonName} onChange={e => setNewPersonName(e.target.value)} placeholder="Add person" className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
          <button onClick={handleAddPerson} disabled={!newPersonName.trim()} className="bg-indigo-600 text-white px-4 rounded-r-lg disabled:bg-indigo-300">
            <UserPlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Tip Selection */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Tip</h2>
        <div className="flex items-center justify-between">
          <button onClick={() => setTipPercent(Math.max(0, tipPercent - 1))} className="bg-gray-200 rounded-full p-1">
            <MinusIcon className="h-5 w-5" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-2xl font-bold">{tipPercent}%</span>
          </div>
          <button onClick={() => setTipPercent(tipPercent + 1)} className="bg-gray-200 rounded-full p-1">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => setTipPercent(15)} className={`px-4 py-2 rounded ${tipPercent === 15 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}>
            15%
          </button>
          <button onClick={() => setTipPercent(18)} className={`px-4 py-2 rounded ${tipPercent === 18 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}>
            18%
          </button>
          <button onClick={() => setTipPercent(20)} className={`px-4 py-2 rounded ${tipPercent === 20 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}>
            20%
          </button>
          <button onClick={() => setTipPercent(25)} className={`px-4 py-2 rounded ${tipPercent === 25 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}>
            25%
          </button>
        </div>
      </div>
      {/* Item Assignment */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-lg font-semibold mb-3">Assign Items</h2>
        <p className="text-sm text-gray-600 mb-4">
          Tap on each person who should pay for an item. Items will be split
          equally among selected people.
        </p>
        <div className="divide-y">
          {billData.items.map(item => <div key={item.id} className="py-3">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-700">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {people.map(person => {
              const isSelected = (itemAssignments[item.id] || []).includes(person.id);
              return <button key={person.id} onClick={() => togglePersonForItem(item.id, person.id)} className={`
                        px-3 py-1 rounded-full text-sm
                        ${isSelected ? 'text-white' : 'text-gray-700 bg-gray-100 border border-gray-300'}
                      `} style={isSelected ? {
                backgroundColor: person.color
              } : {}}>
                      {person.name}
                    </button>;
            })}
              </div>
            </div>)}
        </div>
      </div>
      {/* Summary Preview */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-lg font-semibold mb-3">Current Split Preview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {people.map(person => {
          const totals = calculatePersonTotal(person.id);
          return <div key={person.id} className="border rounded-lg p-3" style={{
            borderLeft: `4px solid ${person.color}`
          }}>
                <div className="font-medium mb-1">{person.name}</div>
                <div className="text-xl font-bold">
                  ${totals.total.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  Items: ${totals.items.toFixed(2)} • Tax: $
                  {totals.tax.toFixed(2)} • Tip: ${totals.tip.toFixed(2)}
                </div>
              </div>;
        })}
        </div>
      </div>
      {/* Continue Button */}
      <div className="flex justify-center">
        <button onClick={handleSplitComplete} disabled={!isAllItemsAssigned()} className={`
            py-3 px-8 rounded-lg font-bold text-white
            ${isAllItemsAssigned() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}
          `}>
          Continue to Settle Up
        </button>
      </div>
      {!isAllItemsAssigned() && <p className="text-orange-500 text-center mt-2 text-sm">
          Please assign all items before continuing
        </p>}
    </div>;
}