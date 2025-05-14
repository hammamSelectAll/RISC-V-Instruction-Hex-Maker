import React, { useState } from 'react';
import { RegisterInfo } from '../types';
import { X } from 'lucide-react';

interface RegisterGridProps {
  rs1: number | null;
  rs2: number | null;
  rd: number | null;
  activeSelection: 'rs1' | 'rs2' | 'rd' | null;
  onRegisterSelect: (index: number) => void;
  onRegisterRemove: (type: 'rs1' | 'rs2' | 'rd') => void;
}

const registers: RegisterInfo[] = [
  { index: 0, abiName: 'zero' },
  { index: 1, abiName: 'ra' },
  { index: 2, abiName: 'sp' },
  { index: 3, abiName: 'gp' },
  { index: 4, abiName: 'tp' },
  { index: 5, abiName: 't0' },
  { index: 6, abiName: 't1' },
  { index: 7, abiName: 't2' },
  { index: 8, abiName: 's0' },
  { index: 9, abiName: 's1' },
  { index: 10, abiName: 'a0' },
  { index: 11, abiName: 'a1' },
  { index: 12, abiName: 'a2' },
  { index: 13, abiName: 'a3' },
  { index: 14, abiName: 'a4' },
  { index: 15, abiName: 'a5' },
  { index: 16, abiName: 'a6' },
  { index: 17, abiName: 'a7' },
  { index: 18, abiName: 's2' },
  { index: 19, abiName: 's3' },
  { index: 20, abiName: 's4' },
  { index: 21, abiName: 's5' },
  { index: 22, abiName: 's6' },
  { index: 23, abiName: 's7' },
  { index: 24, abiName: 's8' },
  { index: 25, abiName: 's9' },
  { index: 26, abiName: 's10' },
  { index: 27, abiName: 's11' },
  { index: 28, abiName: 't3' },
  { index: 29, abiName: 't4' },
  { index: 30, abiName: 't5' },
  { index: 31, abiName: 't6' },
];

const RegisterGrid: React.FC<RegisterGridProps> = ({
  rs1,
  rs2,
  rd,
  activeSelection,
  onRegisterSelect,
  onRegisterRemove,
}) => {
  const [manualInput, setManualInput] = useState<string>('');
  const [showManualInput, setShowManualInput] = useState(false);

  const getRegisterClass = (index: number) => {
    let className = "relative p-4 rounded-lg transition-all duration-200 ";
    
    // Selection state
    if (rs1 === index || rs2 === index || rd === index) {
      className += "bg-blue-50 border-2 ";
      if (rs1 === index) className += "border-blue-500 ";
      if (rs2 === index) className += "border-emerald-500 ";
      if (rd === index) className += "border-purple-500 ";
    } else {
      className += "border-2 border-transparent hover:border-gray-200 ";
    }
    
    // Active selection highlight
    if (activeSelection) {
      className += "cursor-pointer hover:bg-gray-50 ";
      if (activeSelection === 'rs1' && rs1 !== index) className += "hover:border-blue-300 ";
      if (activeSelection === 'rs2' && rs2 !== index) className += "hover:border-emerald-300 ";
      if (activeSelection === 'rd' && rd !== index) className += "hover:border-purple-300 ";
    } else {
      className += "cursor-default ";
    }

    return className;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(manualInput);
    if (!isNaN(value) && value >= 0 && value <= 31 && activeSelection) {
      onRegisterSelect(value);
      setManualInput('');
      setShowManualInput(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Registers</h2>
        <div className="flex items-center gap-2">
          {activeSelection && (
            <>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Select {activeSelection.toUpperCase()}
              </span>
              <button
                onClick={() => setShowManualInput(!showManualInput)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Manual Input
              </button>
            </>
          )}
        </div>
      </div>

      {showManualInput && activeSelection && (
        <form onSubmit={handleManualSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="31"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter register number (0-31)"
              className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Set
            </button>
          </div>
        </form>
      )}
      
      <div className="grid grid-cols-4 gap-2">
        {registers.map((reg) => (
          <div 
            key={reg.index}
            className={getRegisterClass(reg.index)}
            onClick={() => activeSelection && onRegisterSelect(reg.index)}
          >
            <div className="text-xs text-gray-500">x{reg.index}</div>
            <div className="font-medium">{reg.abiName}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex gap-2 text-sm">
        {rs1 !== null && (
          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center gap-2">
            rs1: x{rs1}
            <button
              onClick={() => onRegisterRemove('rs1')}
              className="hover:bg-blue-200 rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}
        {rs2 !== null && (
          <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded flex items-center gap-2">
            rs2: x{rs2}
            <button
              onClick={() => onRegisterRemove('rs2')}
              className="hover:bg-emerald-200 rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}
        {rd !== null && (
          <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded flex items-center gap-2">
            rd: x{rd}
            <button
              onClick={() => onRegisterRemove('rd')}
              className="hover:bg-purple-200 rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterGrid;