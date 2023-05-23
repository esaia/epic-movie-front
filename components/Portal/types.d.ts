import { ReactNode } from "react";

export interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal: (e: any) => void;
}
