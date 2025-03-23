import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import DashboardContent from "./dashboard/DashboardContent";
import ReminderFormDialog from "./reminders/ReminderFormDialog";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("overview");
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [showRecordDetailDialog, setShowRecordDetailDialog] = useState(false);
  const [showReminderFormDialog, setShowReminderFormDialog] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<any | null>(null);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigate = (page: string) => {
    setActiveView(page);
  };

  const handleAddRecord = () => {
    setShowAddRecordDialog(true);
  };

  const handleEditRecord = (id: string) => {
    setSelectedRecordId(id);
    setShowAddRecordDialog(true);
  };

  const handleViewRecord = (id: string) => {
    setSelectedRecordId(id);
    setShowRecordDetailDialog(true);
  };

  const handleDeleteRecord = (id: string) => {
    // In a real app, this would show a confirmation dialog
    console.log(`Delete record ${id}`);
  };

  const handleAddReminder = () => {
    setSelectedReminder(null);
    setShowReminderFormDialog(true);
  };

  const handleEditReminder = (reminder: any) => {
    setSelectedReminder(reminder);
    setShowReminderFormDialog(true);
  };

  const handleDeleteReminder = (id: string) => {
    // In a real app, this would show a confirmation dialog
    console.log(`Delete reminder ${id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        onMenuToggle={handleToggleSidebar}
        userProfile={{
          name: "Jane Doe",
          email: "jane.doe@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        }}
        notificationCount={3}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          activePage={activeView}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 overflow-auto">
          <DashboardContent
            activeView={activeView}
            onViewChange={handleNavigate}
            onAddRecord={handleAddRecord}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
            onViewRecord={handleViewRecord}
            onAddReminder={handleAddReminder}
            onEditReminder={handleEditReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </main>
      </div>

      {/* Record Form Dialog */}
      {showAddRecordDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedRecordId ? "Edit Record" : "Add New Record"}
            </h2>
            <p className="text-gray-500 mb-4">
              This is a placeholder for the RecordFormDialog component.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowAddRecordDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setShowAddRecordDialog(false)}
              >
                {selectedRecordId ? "Save Changes" : "Add Record"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Detail Dialog */}
      {showRecordDetailDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Record Details</h2>
            <p className="text-gray-500 mb-4">
              This is a placeholder for the RecordDetailDialog component.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowRecordDetailDialog(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => {
                  setShowRecordDetailDialog(false);
                  handleEditRecord(selectedRecordId || "");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Form Dialog */}
      {showReminderFormDialog && (
        <ReminderFormDialog
          open={showReminderFormDialog}
          onOpenChange={setShowReminderFormDialog}
          reminder={selectedReminder}
          mode={selectedReminder ? "edit" : "add"}
        />
      )}
    </div>
  );
};

export default Home;
