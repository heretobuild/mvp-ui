import React from "react";

interface SummaryDisplayProps {
  children: React.ReactNode;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ children }) => {
  return <div className="summary-display">{children}</div>;
};

export default SummaryDisplay;
