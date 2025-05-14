import React from 'react';

interface OutputDisplayProps {
  binaryOutput: string;
  hexOutput: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  binaryOutput,
  hexOutput
}) => {
  // Format binary output with spaces for readability
  const formattedBinary = binaryOutput
    ? binaryOutput.match(/.{1,4}/g)?.join(' ') || binaryOutput
    : '';
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Generated Instruction</h2>
      
      {(binaryOutput || hexOutput) ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Binary (32-bit)
            </label>
            <div className="font-mono bg-gray-100 p-3 rounded overflow-x-auto">
              {formattedBinary || 'Generate an instruction to see the output'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hexadecimal (32-bit)
            </label>
            <div className="font-mono bg-gray-100 p-3 rounded">
              {hexOutput || 'Generate an instruction to see the output'}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Configure the instruction fields and click "Generate Instruction" to see the output
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;