import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, Plus, Pill, AlertCircle } from "lucide-react";
import RecordsSummaryHeader from "./RecordsSummaryHeader";

interface MedicationsViewProps {
  onAddMedication?: () => void;
  onEditMedication?: (id: string) => void;
  onDeleteMedication?: (id: string) => void;
  onViewMedication?: (id: string) => void;
}

const MedicationsView: React.FC<MedicationsViewProps> = ({
  onAddMedication = () => {},
  onEditMedication = () => {},
  onDeleteMedication = () => {},
  onViewMedication = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");

  const medications = [
    {
      id: "1",
      name: "Amoxicillin",
      dosage: "100 mg",
      frequency: "Once daily",
      startDate: "2023-05-15",
      endDate: "2023-05-25",
      prescribedBy: "Dr. Sarah Johnson",
      status: "Completed",
      type: "Antibiotic",
      instructions: "Take with food",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
      refillsRemaining: 0,
    },
    {
      id: "2",
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Twice daily",
      startDate: "2023-01-10",
      endDate: null,
      prescribedBy: "Dr. Michael Chen",
      status: "Active",
      type: "Supplement",
      instructions: "Take with meals",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=300&q=80",
      refillsRemaining: 3,
    },
    {
      id: "3",
      name: "Cabergoline",
      dosage: "25 mg",
      frequency: "Once weekly",
      startDate: "2023-03-22",
      endDate: null,
      prescribedBy: "Dr. Emily Rodriguez",
      status: "Active",
      type: "Hormone",
      instructions: "Take at bedtime",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80",
      refillsRemaining: 2,
    },
    {
      id: "4",
      name: "Lisinopril",
      dosage: "10 mg",
      frequency: "Once daily",
      startDate: "2022-11-15",
      endDate: null,
      prescribedBy: "Dr. Sarah Johnson",
      status: "Active",
      type: "Blood Pressure",
      instructions: "Take in the morning",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&q=80",
      refillsRemaining: 1,
    },
    {
      id: "5",
      name: "Atorvastatin",
      dosage: "20 mg",
      frequency: "Once daily",
      startDate: "2022-10-05",
      endDate: null,
      prescribedBy: "Dr. Sarah Johnson",
      status: "Active",
      type: "Cholesterol",
      instructions: "Take in the evening",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1626716493137-b67fe9501501?w=300&q=80",
      refillsRemaining: 0,
    },
    {
      id: "6",
      name: "Ibuprofen",
      dosage: "400 mg",
      frequency: "As needed",
      startDate: "2023-06-10",
      endDate: null,
      prescribedBy: "Dr. Michael Chen",
      status: "Active",
      type: "Pain Relief",
      instructions: "Take with food, not to exceed 3 tablets per day",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&q=80",
      refillsRemaining: null,
    },
  ];

  // Filter medications based on search query and active tab
  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.type.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && med.status === "Active";
    if (activeTab === "completed")
      return matchesSearch && med.status === "Completed";

    return matchesSearch;
  });

  // Get medications that need refills (refillsRemaining === 0 but status is Active)
  const needsRefill = medications.filter(
    (med) => med.status === "Active" && med.refillsRemaining === 0,
  );

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medications</h1>
        <Button onClick={onAddMedication} className="flex items-center gap-2">
          <Plus size={16} />
          Add Medication
        </Button>
      </div>

      {/* Medication Summary */}
      <RecordsSummaryHeader
        title="Medication Summary"
        gradientColors="bg-gradient-to-r from-purple-50 to-pink-50"
        borderColor="border-purple-100"
        summaryItems={[
          {
            icon: <Pill className="h-6 w-6 text-purple-600" />,
            label: "Active Medications",
            value: medications.filter((med) => med.status === "Active").length,
            bgColor: "bg-purple-100",
            textColor: "text-purple-600",
          },
          {
            icon: <Clock className="h-6 w-6 text-blue-600" />,
            label: "Daily Medications",
            value: medications.filter(
              (med) =>
                med.frequency.includes("daily") && med.status === "Active",
            ).length,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
          },
          {
            icon: <AlertCircle className="h-6 w-6 text-red-600" />,
            label: "Needs Refill",
            value: needsRefill.length,
            bgColor: "bg-red-100",
            textColor: "text-red-600",
          },
        ]}
        alertItems={
          needsRefill.length > 0
            ? needsRefill.map((med) => ({
                icon: <AlertCircle className="h-4 w-4 text-red-600" />,
                text: (
                  <>
                    <span className="font-medium">{med.name}</span>
                    <span className="text-gray-600">
                      {" "}
                      ({med.dosage}, {med.frequency})
                    </span>
                  </>
                ),
              }))
            : []
        }
        alertTitle="Medications Needing Refill:"
        alertBgColor="bg-red-50"
        alertBorderColor="border-red-100"
        alertTextColor="text-red-800"
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="min-w-[150px]">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="grid" className="flex-1">
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-1">
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Medications</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          {filteredMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedications.map((medication) => (
                <Card
                  key={medication.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gray-100 relative">
                    <img
                      src={medication.thumbnailUrl}
                      alt={medication.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${medication.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {medication.status}
                    </Badge>
                    {medication.status === "Active" &&
                      medication.refillsRemaining === 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                          Refill Needed
                        </Badge>
                      )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{medication.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="font-medium">{medication.dosage}</span>
                      <span className="mx-2">•</span>
                      <span>{medication.frequency}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        Since{" "}
                        {new Date(medication.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="text-xs">
                        <div className="mb-1">
                          <span className="font-medium">Prescribed by:</span>{" "}
                          {medication.prescribedBy}
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Type:</span>{" "}
                          {medication.type}
                        </div>
                        {medication.refillsRemaining !== null && (
                          <div className="mb-1">
                            <span className="font-medium">Refills:</span>{" "}
                            {medication.refillsRemaining}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Instructions:</span>{" "}
                          {medication.instructions}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewMedication(medication.id)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditMedication(medication.id)}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Pill className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No medications found</p>
                <Button
                  variant="outline"
                  onClick={onAddMedication}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Medication
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {filteredMedications.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredMedications.map((medication) => (
                <Card key={medication.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-[120px] h-[120px] bg-gray-100 relative">
                        <img
                          src={medication.thumbnailUrl}
                          alt={medication.name}
                          className="w-full h-full object-cover"
                        />
                        {medication.status === "Active" &&
                          medication.refillsRemaining === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-red-100 text-red-800">
                              Refill Needed
                            </Badge>
                          )}
                      </div>
                      <div className="flex-grow p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-lg">
                                {medication.name}
                              </h3>
                              <Badge
                                className={`ml-2 ${medication.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                              >
                                {medication.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="font-medium">
                                {medication.dosage}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{medication.frequency}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                Since{" "}
                                {new Date(
                                  medication.startDate,
                                ).toLocaleDateString()}
                              </span>
                              {medication.endDate && (
                                <span>
                                  {" "}
                                  to{" "}
                                  {new Date(
                                    medication.endDate,
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <Badge className="mt-2 bg-purple-100 text-purple-800">
                              {medication.type}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewMedication(medication.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEditMedication(medication.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">
                                Prescribed by:
                              </span>{" "}
                              {medication.prescribedBy}
                            </div>
                            {medication.refillsRemaining !== null && (
                              <div>
                                <span className="font-medium">
                                  Refills remaining:
                                </span>{" "}
                                {medication.refillsRemaining}
                              </div>
                            )}
                          </div>
                          <div className="mt-1 text-sm">
                            <span className="font-medium">Instructions:</span>{" "}
                            {medication.instructions}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Pill className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No medications found</p>
                <Button
                  variant="outline"
                  onClick={onAddMedication}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Medication
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicationsView;
