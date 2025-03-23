import React from "react";
import VisionRecordsView from "../dashboard/VisionRecordsView";

const VisionRecordsStoryboard = () => {
  return (
    <div className="bg-white w-full h-full">
      <VisionRecordsView
        onAddRecord={() => console.log("Add vision record")}
        onEditRecord={(id) => console.log(`Edit vision record ${id}`)}
        onDeleteRecord={(id) => console.log(`Delete vision record ${id}`)}
        onViewRecord={(id) => console.log(`View vision record ${id}`)}
      />
    </div>
  );
};

export default VisionRecordsStoryboard;
