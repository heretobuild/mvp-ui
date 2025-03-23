import React from "react";
import MedicationsView from "../dashboard/MedicationsView";

const MedicationsStoryboard = () => {
  return (
    <div className="bg-white w-full h-full">
      <MedicationsView
        onAddMedication={() => console.log("Add medication")}
        onEditMedication={(id) => console.log(`Edit medication ${id}`)}
        onDeleteMedication={(id) => console.log(`Delete medication ${id}`)}
        onViewMedication={(id) => console.log(`View medication ${id}`)}
      />
    </div>
  );
};

export default MedicationsStoryboard;
