import React, { useState, useEffect } from 'react';
import { InstructionType } from '../types';
import { getImmediateBitWidth } from '../utils/instructionUtils';

interface ImmediateInputProps {
  value: number;
  onChange: (value: number) => void;
  instructionType: InstructionType;
}

const ImmediateInput: React.FC<ImmediateInputProps> = ({
  value,
  onChange,
  instructionType
}) => {
  const [inputValue, setInputValue] = useState('0x0');
  const bitWidth = getImmediateBitWidth(instructionType);
  
  // Max value based on bit width (2^bitWidth - 1)
  const maxValue = (1 << bitWidth) - 1;
  
  // Update input when value changes externally
  useEffect(() => {
    setInputValue('0x' + value.toString(16).padStart(Math.ceil(bitWidth / 4), '0'));
  }, [value, bitWidth]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Ensure it starts with 0x
    if (!newValue.startsWith('0x')) {
      newValue = '0x' + newValue.replace(/^0x/i, '');
    }
    
    // Remove invalid hex characters
    newValue = newValue.replace(/[^0-9a-fx]/gi, '');
    
    setInputValue(newValue);
    
    // Convert to number and update
    try {
      const numValue = parseInt(newValue, 16);
      if (!isNaN(numValue) && numValue <= maxValue) {
        onChange(numValue);
      }
    } catch (e) {
      // Invalid hex, don't update
    }
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    onChange(numValue);
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Immediate Value</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hex Value (max {bitWidth} bits)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="0x0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visual Slider (0 - {maxValue.toString(16)}h)
          </label>
          <input
            type="range"
            min="0"
            max={maxValue}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="text-center p-2 bg-gray-100 rounded">
          <span className="font-mono text-sm">
            {value.toString(16).padStart(8, '0').toUpperCase().replace(/^/, '0x')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImmediateInput;