import React, { useState } from "react";
import PatientPortalConnector from "../records/PatientPortalConnector";
import { Button } from "@/components/ui/button";

const PatientPortalStoryboard = () => {
  const [showConnector, setShowConnector] = useState(false);

  return (
    <div className="bg-white w-full h-full p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Patient Portal Integration</h1>
      <p className="text-center max-w-md mb-8">
        Connect to your healthcare provider's patient portal to import your
        medical records directly.
      </p>

      <Button onClick={() => setShowConnector(true)}>
        Connect to Patient Portal
      </Button>

      <PatientPortalConnector
        open={showConnector}
        onOpenChange={setShowConnector}
        onImportSuccess={(records) => {
          console.log("Imported records:", records);
          setShowConnector(false);
        }}
      />
    </div>
  );
};

export default PatientPortalStoryboard;
