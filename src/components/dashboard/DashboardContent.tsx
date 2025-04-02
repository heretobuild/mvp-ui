import React, { useState } from "react";
import RecordCategoryView from "./RecordCategoryView";
import VisionRecordsView from "./VisionRecordsView";
import DentalRecordsView from "./DentalRecordsView";
import ImmunizationRecordsView from "./ImmunizationRecordsView";
import MedicationsView from "./MedicationsView";
import FamilyTree from "../family/FamilyTree";
import HealthInsights from "../insights/HealthInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RecordFormDialog from "../records/RecordFormDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, X, Users, FileText, Upload, Link } from "lucide-react";

interface DashboardContentProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  onAddRecord?: (mode?: "manual" | "upload" | "portal") => void;
  onEditRecord?: (id: string) => void;
  onDeleteRecord?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeView = "medical",
  onViewChange = () => {},
  onAddRecord = (mode) => {
    setRecordFormMode(mode || "manual");
    setShowRecordForm(true);
  },
  onEditRecord = () => {},
  onDeleteRecord = () => {},
  onViewRecord = () => {},
}) => {
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const [showQuickTips, setShowQuickTips] = useState(false);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [recordFormMode, setRecordFormMode] = useState<
    "manual" | "upload" | "portal"
  >("manual");

  // Determine if the active view is a record category
  const isRecordCategory = [
    "medical",
    "vision",
    "immunization",
    "medications",
    "allergy",
    "family",
    "insights",
  ].includes(activeView);

  return (
    <div className="w-full h-full overflow-auto bg-gray-50 px-2 sm:px-4 md:px-6">
      {/* Welcome Card - Only shown on first visit or until dismissed */}
      {showWelcomeCard && (
        <div className="p-2 sm:p-4">
          <Card className="relative bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-700 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-blue-600/20"
              onClick={() => setShowWelcomeCard(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardContent className="pt-6 pb-4">
              <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-6">
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    Welcome to Harbura Health Records
                  </h3>
                  <p className="text-blue-100 mt-2">
                    Your personal health information, organized and secure in
                    one place. Start by adding your first record or explore the
                    different sections.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    onClick={() => setShowQuickTips(true)}
                  >
                    Quick Tips
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-white text-blue-700 hover:bg-blue-50">
                        <Plus className="mr-2 h-4 w-4" />
                        Add First Record
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setRecordFormMode("manual");
                          setShowRecordForm(true);
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Manual Entry
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRecordFormMode("upload");
                          setShowRecordForm(true);
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRecordFormMode("portal");
                          setShowRecordForm(true);
                        }}
                      >
                        <Link className="mr-2 h-4 w-4" />
                        Connect to EMR Portal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Area */}
      <Tabs value={activeView} onValueChange={onViewChange} className="w-full">
        <TabsContent value="medical">
          <RecordCategoryView
            category="medical"
            onAddRecord={onAddRecord}
            onEditRecord={onEditRecord}
            onDeleteRecord={onDeleteRecord}
            onViewRecord={onViewRecord}
          />
        </TabsContent>

        <TabsContent value="vision">
          <VisionRecordsView
            onAddRecord={onAddRecord}
            onEditRecord={onEditRecord}
            onDeleteRecord={onDeleteRecord}
            onViewRecord={onViewRecord}
          />
        </TabsContent>

        <TabsContent value="immunization">
          <ImmunizationRecordsView
            onAddRecord={onAddRecord}
            onEditRecord={onEditRecord}
            onDeleteRecord={onDeleteRecord}
            onViewRecord={onViewRecord}
          />
        </TabsContent>

        <TabsContent value="medications">
          <MedicationsView
            onAddMedication={onAddRecord}
            onEditMedication={onEditRecord}
            onDeleteMedication={onDeleteRecord}
            onViewMedication={onViewRecord}
          />
        </TabsContent>

        <TabsContent value="allergy">
          <RecordCategoryView
            category="allergy"
            onAddRecord={onAddRecord}
            onEditRecord={onEditRecord}
            onDeleteRecord={onDeleteRecord}
            onViewRecord={onViewRecord}
          />
        </TabsContent>

        <TabsContent value="family">
          <FamilyTree
            onAddMember={() => console.log("Add family member")}
            onEditMember={(id) => console.log(`Edit family member ${id}`)}
            onDeleteMember={(id) => console.log(`Delete family member ${id}`)}
            onSelectMember={(id) => console.log(`Select family member ${id}`)}
          />
        </TabsContent>

        <TabsContent value="insights">
          <HealthInsights />
        </TabsContent>

        {/* Dashboard Overview - shown when no specific category is selected */}
        <TabsContent value="overview">
          <div className="p-6 bg-white">
            <h1 className="text-2xl font-bold mb-6">Health Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 animate-in fade-in duration-500">
              {/* Recent Records Card */}
              <Card>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Records</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 pb-3 border-b last:border-0"
                      >
                        <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                            <line x1="9" y1="9" x2="10" y2="9" />
                            <line x1="9" y1="13" x2="15" y2="13" />
                            <line x1="9" y1="17" x2="15" y2="17" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {
                              [
                                "Annual Physical",
                                "Blood Test",
                                "X-Ray Results",
                              ][i - 1]
                            }
                          </p>
                          <p className="text-sm text-gray-500">
                            {["2 days ago", "1 week ago", "2 weeks ago"][i - 1]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => onViewChange("medical")}
                  >
                    View All Records
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips Dialog */}
      <Dialog open={showQuickTips} onOpenChange={setShowQuickTips}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-semibold">Quick Tips</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Organize by Categories</p>
                  <p className="text-sm text-gray-500">
                    Keep your records organized by using the appropriate
                    categories: Medical, Dental, Vision, etc.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Upload Documents</p>
                  <p className="text-sm text-gray-500">
                    Add documents or images to your records for easy reference
                    later.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Set Reminders</p>
                  <p className="text-sm text-gray-500">
                    Don't miss appointments or medication refills by setting up
                    reminders.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">View Timeline</p>
                  <p className="text-sm text-gray-500">
                    Use the timeline view to see your health history in
                    chronological order.
                  </p>
                </div>
              </li>
            </ul>
            <Button
              className="w-full mt-2"
              onClick={() => setShowQuickTips(false)}
            >
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Record Form Dialog */}
      <RecordFormDialog
        open={showRecordForm}
        onOpenChange={setShowRecordForm}
        activeTab={recordFormMode}
      />
    </div>
  );
};

export default DashboardContent;
