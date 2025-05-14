import React, { useState } from 'react';
import { InstructionType, BitField } from '../types';
import { getInstructionBitFields } from '../utils/instructionUtils';

interface InstructionVisualizerProps {
  type: InstructionType;
  rs1: number | null;
  rs2: number | null;
  rd: number | null;
  immediate: number;
  opcode: string;
  funct3: string;
  funct7: string;
}

const InstructionVisualizer: React.FC<InstructionVisualizerProps> = (props) => {
  const bitFields = getInstructionBitFields(props);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleFieldClick = (field: BitField) => {
    setEditingField(field.name);
    setEditValue(field.value);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the value update through props
    setEditingField(null);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Instruction Layout</h2>
      
      <div className="flex flex-col">
        {/* Bit position indicators */}
        <div className="flex justify-between text-xs text-gray-500 mb-1 px-1">
          <span>31</span>
          <span>0</span>
        </div>
        
        {/* Bit fields visualization */}
        <div className="flex w-full h-16 rounded-md overflow-hidden">
          {bitFields.map((field, index) => {
            // Calculate width percentage based on number of bits
            const widthPercentage = (field.bits / 32) * 100;
            
            return (
              <div 
                key={index}
                className="relative flex flex-col justify-between h-full border-r last:border-r-0 border-gray-300 cursor-pointer hover:brightness-95 transition-all"
                style={{ 
                  width: `${widthPercentage}%`,
                  backgroundColor: field.color,
                }}
                onClick={() => handleFieldClick(field)}
              >
                <div className="text-xs font-medium text-center px-1 py-1 bg-opacity-80 bg-white">
                  {field.name}
                </div>
                <div className="text-xs font-mono text-center py-1 bg-opacity-80 bg-white">
                  {field.value}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Edit modal */}
        {editingField && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Edit {editingField}
              </h3>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Binary Value
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      0b
                    </span>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value.replace(/[^0-1]/g, ''))}
                      className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter binary value"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingField(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Type indicator */}
        <div className="mt-3 text-center text-sm font-medium">
          {props.type}-Type Instruction
        </div>
      </div>
    </div>
  );
};

export default InstructionVisualizer;