import React from "react";
import DentalRecordsView from "../dashboard/DentalRecordsView";

const DentalRecordsStoryboard = () => {
  return (
    <div className="bg-white w-full h-full">
      <DentalRecordsView
        onAddRecord={() => console.log("Add dental record")}
        onEditRecord={(id) => console.log(`Edit dental record ${id}`)}
        onDeleteRecord={(id) => console.log(`Delete dental record ${id}`)}
        onViewRecord={(id) => console.log(`View dental record ${id}`)}
      />
    </div>
  );
};

export default DentalRecordsStoryboard;
