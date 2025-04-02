import React from "react";
import ExpensesView from "../dashboard/ExpensesView";

export default function ExpensesViewStoryboard() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <ExpensesView
        onAddExpense={() => console.log("Add expense")}
        onEditExpense={(id) => console.log(`Edit expense ${id}`)}
        onDeleteExpense={(id) => console.log(`Delete expense ${id}`)}
        onViewExpense={(id) => console.log(`View expense ${id}`)}
      />
    </div>
  );
}
