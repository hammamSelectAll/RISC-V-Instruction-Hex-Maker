import React from 'react';
import { InstructionType } from '../types';
import { getInstructionTypeDescription } from '../utils/instructionUtils';

interface InstructionTypeSelectorProps {
  selectedType: InstructionType;
  onSelectType: (type: InstructionType) => void;
}

const instructionTypes: InstructionType[] = ['R', 'I', 'S', 'B', 'U', 'J'];

const InstructionTypeSelector: React.FC<InstructionTypeSelectorProps> = ({ 
  selectedType, 
  onSelectType 
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Instruction Type</h2>
      <div className="flex flex-wrap gap-2">
        {instructionTypes.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`
              py-2 px-4 rounded-md font-medium transition-colors
              ${selectedType === type 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {type}-Type
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        {getInstructionTypeDescription(selectedType)}
      </div>
    </div>
  );
};

export default InstructionTypeSelector;