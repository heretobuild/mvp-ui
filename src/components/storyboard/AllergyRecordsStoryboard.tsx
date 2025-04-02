import React from "react";
import RecordCategoryView from "../dashboard/RecordCategoryView";

const AllergyRecordsStoryboard = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <RecordCategoryView
        category="allergy"
        onAddRecord={() => console.log("Add allergy record")}
        onEditRecord={(id) => console.log(`Edit allergy record ${id}`)}
        onDeleteRecord={(id) => console.log(`Delete allergy record ${id}`)}
        onViewRecord={(id) => console.log(`View allergy record ${id}`)}
      />
    </div>
  );
};

export default AllergyRecordsStoryboard;
