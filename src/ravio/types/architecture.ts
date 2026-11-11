/**
 * Architecture Blueprint Types
 */

export interface FolderNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  responsibility: string;
  isEstablishedInFoundation: boolean;
  children?: FolderNode[];
}

export interface ReusableComponentSpec {
  name: string;
  category: 'Foundation / Atoms' | 'Molecules' | 'Organisms' | 'Editorial Layouts' | 'Commerce Modules';
  path: string;
  purpose: string;
  propsContract: string;
  antiSlopGuarantees: string[];
  status: 'scaffolded' | 'ready-in-foundation' | 'next-stage';
}

export interface FoundationRequirementCheck {
  id: string;
  number: string;
  title: string;
  objective: string;
  solution: string;
  deliverables: string[];
  status: 'completed' | 'in-review';
}
