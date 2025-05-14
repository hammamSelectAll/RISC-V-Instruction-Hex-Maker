import { InstructionType, BitField, InstructionFields } from '../types';

export const getInstructionTypeDescription = (type: InstructionType): string => {
  switch (type) {
    case 'R':
      return 'Register-Register operations (e.g., ADD, SUB, SLL). Uses two source registers and one destination register.';
    case 'I':
      return 'Register-Immediate operations (e.g., ADDI, SLTI) and loads (e.g., LW, LH, LB). Uses one source register, one immediate value, and one destination register.';
    case 'S':
      return 'Store operations (e.g., SW, SH, SB). Uses two source registers and an immediate value to store a value to memory.';
    case 'B':
      return 'Branch operations (e.g., BEQ, BNE, BLT). Compares two registers and branches to a PC-relative target if the condition is true.';
    case 'U':
      return 'Upper-immediate operations (e.g., LUI, AUIPC). Places a 20-bit immediate in the upper 20 bits of the destination register.';
    case 'J':
      return 'Jump operations (e.g., JAL). Jumps to a PC-relative target and stores the return address in a register.';
  }
};

export const getImmediateBitWidth = (type: InstructionType): number => {
  switch (type) {
    case 'R':
      return 0; // R-type doesn't use immediates
    case 'I':
      return 12;
    case 'S':
      return 12;
    case 'B':
      return 12;
    case 'U':
      return 20;
    case 'J':
      return 20;
    default:
      return 12;
  }
};

export const getInstructionBitFields = (fields: InstructionFields): BitField[] => {
  const { type, rs1, rs2, rd, immediate, opcode, funct3, funct7 } = fields;
  
  // Convert register indices to binary strings
  const rs1Bin = rs1 !== null ? rs1.toString(2).padStart(5, '0') : '00000';
  const rs2Bin = rs2 !== null ? rs2.toString(2).padStart(5, '0') : '00000';
  const rdBin = rd !== null ? rd.toString(2).padStart(5, '0') : '00000';
  
  // Get immediate as binary string based on the instruction type
  const immWidth = getImmediateBitWidth(type);
  const immBin = immediate.toString(2).padStart(immWidth, '0').slice(-immWidth);
  
  // Define colors for different sections
  const colors = {
    funct7: '#FFCDD2', // light red
    rs2: '#C8E6C9',    // light green
    rs1: '#BBDEFB',    // light blue
    funct3: '#FFE0B2', // light orange
    rd: '#D1C4E9',     // light purple
    opcode: '#F5F5F5', // light gray
    imm: '#E1BEE7',    // light pink
  };
  
  // Define bit fields based on instruction type
  switch (type) {
    case 'R':
      return [
        { name: 'funct7', bits: 7, value: funct7, color: colors.funct7 },
        { name: 'rs2', bits: 5, value: rs2Bin, color: colors.rs2 },
        { name: 'rs1', bits: 5, value: rs1Bin, color: colors.rs1 },
        { name: 'funct3', bits: 3, value: funct3, color: colors.funct3 },
        { name: 'rd', bits: 5, value: rdBin, color: colors.rd },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
    
    case 'I':
      return [
        { name: 'imm[11:0]', bits: 12, value: immBin, color: colors.imm },
        { name: 'rs1', bits: 5, value: rs1Bin, color: colors.rs1 },
        { name: 'funct3', bits: 3, value: funct3, color: colors.funct3 },
        { name: 'rd', bits: 5, value: rdBin, color: colors.rd },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
    
    case 'S':
      return [
        { name: 'imm[11:5]', bits: 7, value: immBin.slice(0, 7), color: colors.imm },
        { name: 'rs2', bits: 5, value: rs2Bin, color: colors.rs2 },
        { name: 'rs1', bits: 5, value: rs1Bin, color: colors.rs1 },
        { name: 'funct3', bits: 3, value: funct3, color: colors.funct3 },
        { name: 'imm[4:0]', bits: 5, value: immBin.slice(-5), color: colors.imm },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
    
    case 'B':
      return [
        { name: 'imm[12|10:5]', bits: 7, value: immBin.slice(0, 7), color: colors.imm },
        { name: 'rs2', bits: 5, value: rs2Bin, color: colors.rs2 },
        { name: 'rs1', bits: 5, value: rs1Bin, color: colors.rs1 },
        { name: 'funct3', bits: 3, value: funct3, color: colors.funct3 },
        { name: 'imm[4:1|11]', bits: 5, value: immBin.slice(-5), color: colors.imm },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
    
    case 'U':
      return [
        { name: 'imm[31:12]', bits: 20, value: immBin, color: colors.imm },
        { name: 'rd', bits: 5, value: rdBin, color: colors.rd },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
    
    case 'J':
      return [
        { name: 'imm[20|10:1|11|19:12]', bits: 20, value: immBin, color: colors.imm },
        { name: 'rd', bits: 5, value: rdBin, color: colors.rd },
        { name: 'opcode', bits: 7, value: opcode, color: colors.opcode },
      ];
      
    default:
      return [];
  }
};