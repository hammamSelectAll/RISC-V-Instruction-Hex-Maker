import { InstructionFields, InstructionOutput } from '../types';
import { getImmediateBitWidth } from './instructionUtils';

export const generateInstruction = (fields: InstructionFields): InstructionOutput => {
  const { type, rs1, rs2, rd, immediate, opcode, funct3, funct7 } = fields;
  
  // Convert values to binary strings
  const opcodeBin = opcode.padStart(7, '0');
  const funct3Bin = funct3.padStart(3, '0');
  const funct7Bin = funct7.padStart(7, '0');
  
  // Register indices (5 bits each)
  const rs1Bin = rs1 !== null ? rs1.toString(2).padStart(5, '0') : '00000';
  const rs2Bin = rs2 !== null ? rs2.toString(2).padStart(5, '0') : '00000';
  const rdBin = rd !== null ? rd.toString(2).padStart(5, '0') : '00000';
  
  // Get immediate bit width based on instruction type
  const immWidth = getImmediateBitWidth(type);
  
  // Convert immediate to binary string and ensure proper length
  const immBin = immediate.toString(2).padStart(immWidth, '0').slice(-immWidth);
  
  let instructionBinary = '';
  
  // Assemble instruction based on type
  switch (type) {
    case 'R':
      instructionBinary = funct7Bin + rs2Bin + rs1Bin + funct3Bin + rdBin + opcodeBin;
      break;
      
    case 'I':
      instructionBinary = immBin + rs1Bin + funct3Bin + rdBin + opcodeBin;
      break;
      
    case 'S': {
      // Split immediate into two parts
      const immHigh = immBin.slice(0, 7);
      const immLow = immBin.slice(-5);
      instructionBinary = immHigh + rs2Bin + rs1Bin + funct3Bin + immLow + opcodeBin;
      break;
    }
      
    case 'B': {
      // Special immediate encoding for B-type
      // imm[12|10:5] + rs2 + rs1 + funct3 + imm[4:1|11] + opcode
      const immHigh = immBin.slice(0, 7);
      const immLow = immBin.slice(-5);
      instructionBinary = immHigh + rs2Bin + rs1Bin + funct3Bin + immLow + opcodeBin;
      break;
    }
      
    case 'U':
      instructionBinary = immBin + rdBin + opcodeBin;
      break;
      
    case 'J': {
      // Special immediate encoding for J-type
      // imm[20|10:1|11|19:12] + rd + opcode
      instructionBinary = immBin + rdBin + opcodeBin;
      break;
    }
  }
  
  // Ensure instruction is 32 bits
  instructionBinary = instructionBinary.padStart(32, '0');
  
  // Convert binary to hexadecimal
  const instructionHex = '0x' + parseInt(instructionBinary, 2).toString(16).padStart(8, '0').toUpperCase();
  
  return {
    binary: instructionBinary,
    hex: instructionHex,
  };
};