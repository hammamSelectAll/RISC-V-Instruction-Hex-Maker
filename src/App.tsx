import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import InstructionTypeSelector from './components/InstructionTypeSelector';
import RegisterGrid from './components/RegisterGrid';
import InstructionFields from './components/InstructionFields';
import ImmediateInput from './components/ImmediateInput';
import InstructionVisualizer from './components/InstructionVisualizer';
import OutputDisplay from './components/OutputDisplay';
import { InstructionType } from './types';
import { generateInstruction } from './utils/instructionGenerator';

function App() {
  const [instructionType, setInstructionType] = useState<InstructionType>('R');
  const [rs1, setRs1] = useState<number | null>(null);
  const [rs2, setRs2] = useState<number | null>(null);
  const [rd, setRd] = useState<number | null>(null);
  const [immediate, setImmediate] = useState<number>(0);
  const [opcode, setOpcode] = useState<string>('0000000');
  const [funct3, setFunct3] = useState<string>('000');
  const [funct7, setFunct7] = useState<string>('0000000');
  const [binaryOutput, setBinaryOutput] = useState<string>('');
  const [hexOutput, setHexOutput] = useState<string>('');
  const [activeSelection, setActiveSelection] = useState<'rs1' | 'rs2' | 'rd' | null>('rs1');

  const handleGenerateInstruction = () => {
    const result = generateInstruction({
      type: instructionType,
      rs1,
      rs2,
      rd,
      immediate,
      opcode,
      funct3,
      funct7,
    });
    
    setBinaryOutput(result.binary);
    setHexOutput(result.hex);
  };

  // Determine which registers are needed based on instruction type
  const needsRs1 = ['R', 'I', 'S', 'B'].includes(instructionType);
  const needsRs2 = ['R', 'S', 'B'].includes(instructionType);
  const needsRd = ['R', 'I', 'U', 'J'].includes(instructionType);

  // Reset registers when instruction type changes
  const handleInstructionTypeChange = (type: InstructionType) => {
    setInstructionType(type);
    setRs1(null);
    setRs2(null);
    setRd(null);
    setActiveSelection(needsRs1 ? 'rs1' : (needsRd ? 'rd' : null));
  };

  const handleRegisterSelect = (index: number) => {
    if (!activeSelection) return;

    switch (activeSelection) {
      case 'rs1':
        setRs1(index);
        setActiveSelection(needsRs2 ? 'rs2' : (needsRd ? 'rd' : null));
        break;
      case 'rs2':
        setRs2(index);
        setActiveSelection(needsRd ? 'rd' : null);
        break;
      case 'rd':
        setRd(index);
        setActiveSelection(null);
        break;
    }
  };

  const handleRegisterRemove = (type: 'rs1' | 'rs2' | 'rd') => {
    switch (type) {
      case 'rs1':
        setRs1(null);
        if (!rs2) setActiveSelection('rs1');
        break;
      case 'rs2':
        setRs2(null);
        if (!rd) setActiveSelection('rs2');
        break;
      case 'rd':
        setRd(null);
        setActiveSelection('rd');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <header className="mb-8 flex items-center">
        <Cpu className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold">RISC-V Instruction Hex Maker</h1>
      </header>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <InstructionTypeSelector 
            selectedType={instructionType} 
            onSelectType={handleInstructionTypeChange} 
          />
          
          <InstructionFields 
            instructionType={instructionType}
            opcode={opcode}
            funct3={funct3}
            funct7={funct7}
            setOpcode={setOpcode}
            setFunct3={setFunct3}
            setFunct7={setFunct7}
          />
          
          {['I', 'S', 'B', 'U', 'J'].includes(instructionType) && (
            <ImmediateInput 
              value={immediate}
              onChange={setImmediate}
              instructionType={instructionType}
            />
          )}
          
          <InstructionVisualizer 
            type={instructionType}
            rs1={rs1}
            rs2={rs2}
            rd={rd}
            immediate={immediate}
            opcode={opcode}
            funct3={funct3}
            funct7={funct7}
          />
          
          <div className="mt-8">
            <button 
              onClick={handleGenerateInstruction}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md"
            >
              Generate Instruction
            </button>
          </div>
          
          <OutputDisplay 
            binaryOutput={binaryOutput}
            hexOutput={hexOutput}
          />
        </div>
        
        <div className="md:col-span-4">
          <RegisterGrid 
            rs1={needsRs1 ? rs1 : null}
            rs2={needsRs2 ? rs2 : null}
            rd={needsRd ? rd : null}
            activeSelection={activeSelection}
            onRegisterSelect={handleRegisterSelect}
            onRegisterRemove={handleRegisterRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default App;