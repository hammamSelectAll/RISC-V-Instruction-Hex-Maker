export type InstructionType = 'R' | 'I' | 'S' | 'B' | 'U' | 'J';

export type RegisterIndex = number | null;

export interface InstructionFields {
  type: InstructionType;
  rs1: RegisterIndex;
  rs2: RegisterIndex;
  rd: RegisterIndex;
  immediate: number;
  opcode: string;
  funct3: string;
  funct7: string;
}

export interface InstructionOutput {
  binary: string;
  hex: string;
}

export interface BitField {
  name: string;
  bits: number;
  value: string;
  color: string;
}

export interface RegisterInfo {
  index: number;
  abiName: string;
}