import React from "react";
import ImmunizationRecordsView from "../dashboard/ImmunizationRecordsView";

const ImmunizationRecordsStoryboard = () => {
  return (
    <div className="bg-white w-full h-full">
      <ImmunizationRecordsView
        onAddRecord={() => console.log("Add immunization record")}
        onEditRecord={(id) => console.log(`Edit immunization record ${id}`)}
        onDeleteRecord={(id) => console.log(`Delete immunization record ${id}`)}
        onViewRecord={(id) => console.log(`View immunization record ${id}`)}
      />
    </div>
  );
};

export default ImmunizationRecordsStoryboard;
