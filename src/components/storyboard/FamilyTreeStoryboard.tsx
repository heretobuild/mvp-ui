import React from "react";
import FamilyTree from "../family/FamilyTree";

const FamilyTreeStoryboard = () => {
  return (
    <div className="bg-white w-full h-full">
      <FamilyTree
        onAddMember={() => console.log("Add family member")}
        onEditMember={(id) => console.log(`Edit family member ${id}`)}
        onDeleteMember={(id) => console.log(`Delete family member ${id}`)}
        onSelectMember={(id) => console.log(`Select family member ${id}`)}
      />
    </div>
  );
};

export default FamilyTreeStoryboard;
