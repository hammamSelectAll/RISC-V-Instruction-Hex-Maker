import React from 'react';
import { InstructionType } from '../types';

interface InstructionFieldsProps {
  instructionType: InstructionType;
  opcode: string;
  funct3: string;
  funct7: string;
  setOpcode: (value: string) => void;
  setFunct3: (value: string) => void;
  setFunct7: (value: string) => void;
}

const InstructionFields: React.FC<InstructionFieldsProps> = ({
  instructionType,
  opcode,
  funct3,
  funct7,
  setOpcode,
  setFunct3,
  setFunct7,
}) => {
  const handleOpcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove non-binary characters
    value = value.replace(/[^0-1]/g, '');
    
    // Limit to 7 bits
    if (value.length > 7) {
      value = value.substring(0, 7);
    }
    
    setOpcode(value.padStart(7, '0'));
  };

  const handleFunct3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove non-binary characters
    value = value.replace(/[^0-1]/g, '');
    
    // Limit to 3 bits
    if (value.length > 3) {
      value = value.substring(0, 3);
    }
    
    setFunct3(value.padStart(3, '0'));
  };

  const handleFunct7Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove non-binary characters
    value = value.replace(/[^0-1]/g, '');
    
    // Limit to 7 bits
    if (value.length > 7) {
      value = value.substring(0, 7);
    }
    
    setFunct7(value.padStart(7, '0'));
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Instruction Fields</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opcode (7 bits)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              0b
            </span>
            <input
              type="text"
              value={opcode}
              onChange={handleOpcodeChange}
              className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="0000000"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funct3 (3 bits)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              0b
            </span>
            <input
              type="text"
              value={funct3}
              onChange={handleFunct3Change}
              className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="000"
            />
          </div>
        </div>
        
        {instructionType === 'R' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Funct7 (7 bits)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                0b
              </span>
              <input
                type="text"
                value={funct7}
                onChange={handleFunct7Change}
                className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="0000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionFields;