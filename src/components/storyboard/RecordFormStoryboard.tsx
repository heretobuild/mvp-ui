import React, { useState } from "react";
import RecordFormDialog from "../records/RecordFormDialog";
import { Button } from "@/components/ui/button";

const RecordFormStoryboard = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="bg-white w-full h-full p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Record Form with Patient Portal Integration
      </h1>
      <p className="text-center max-w-md mb-8">
        Add a new health record manually, by uploading a document, or by
        connecting to your patient portal.
      </p>

      <Button onClick={() => setShowDialog(true)}>Add New Record</Button>

      <RecordFormDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={(data) => {
          console.log("Form submitted:", data);
          setShowDialog(false);
        }}
      />
    </div>
  );
};

export default RecordFormStoryboard;
