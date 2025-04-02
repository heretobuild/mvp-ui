import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  User,
  Plus,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import RecordsSummaryHeader from "./RecordsSummaryHeader";

interface ImmunizationRecordsViewProps {
  onAddRecord?: () => void;
  onEditRecord?: (id: string) => void;
  onDeleteRecord?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

const ImmunizationRecordsView: React.FC<ImmunizationRecordsViewProps> = ({
  onAddRecord = () => {},
  onEditRecord = () => {},
  onDeleteRecord = () => {},
  onViewRecord = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const immunizationRecords = [
    {
      id: "1",
      title: "COVID-19 Vaccination",
      date: "2023-04-15",
      provider: "City Health Department",
      type: "COVID-19",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=300&q=80",
      details: {
        vaccine: "Pfizer-BioNTech",
        doseNumber: "2 of 2",
        lotNumber: "EL0725",
        location: "Left Arm",
        nextDose: "Booster recommended after 6 months",
      },
      status: "Complete",
    },
    {
      id: "2",
      title: "COVID-19 Booster",
      date: "2023-10-22",
      provider: "Walgreens Pharmacy",
      type: "COVID-19",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=300&q=80",
      details: {
        vaccine: "Moderna",
        doseNumber: "Booster",
        lotNumber: "039K20A",
        location: "Left Arm",
        nextDose: "Annual boosters may be recommended",
      },
      status: "Complete",
    },
    {
      id: "3",
      title: "Influenza Vaccination",
      date: "2023-09-10",
      provider: "CVS Pharmacy",
      type: "Influenza",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=300&q=80",
      details: {
        vaccine: "Quadrivalent Flu Vaccine",
        doseNumber: "Annual",
        lotNumber: "D8043-1",
        location: "Right Arm",
        nextDose: "Recommended annually",
      },
      status: "Complete",
    },
    {
      id: "4",
      title: "Tdap Vaccination",
      date: "2020-06-05",
      provider: "Dr. Sarah Johnson",
      type: "Tdap",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&q=80",
      details: {
        vaccine: "Adacel",
        doseNumber: "Booster",
        lotNumber: "AC52B220AA",
        location: "Left Arm",
        nextDose: "Recommended every 10 years",
      },
      status: "Complete",
    },
    {
      id: "5",
      title: "Hepatitis B Vaccination",
      date: "2019-03-15",
      provider: "Community Health Clinic",
      type: "Hepatitis B",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&q=80",
      details: {
        vaccine: "Engerix-B",
        doseNumber: "3 of 3",
        lotNumber: "AHBVB946A",
        location: "Right Arm",
        nextDose: "Series complete",
      },
      status: "Complete",
    },
    {
      id: "6",
      title: "Shingrix (Shingles) Vaccination",
      date: "2022-11-20",
      provider: "Walgreens Pharmacy",
      type: "Shingles",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1576765608866-5b51046452be?w=300&q=80",
      details: {
        vaccine: "Shingrix",
        doseNumber: "1 of 2",
        lotNumber: "3K5ML",
        location: "Left Arm",
        nextDose: "Second dose due in 2-6 months",
      },
      status: "Incomplete",
    },
  ];

  const filteredRecords = immunizationRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Group records by type
  const recordsByType = filteredRecords.reduce(
    (acc, record) => {
      if (!acc[record.type]) {
        acc[record.type] = [];
      }
      acc[record.type].push(record);
      return acc;
    },
    {} as Record<string, typeof immunizationRecords>,
  );

  // Get upcoming or incomplete vaccinations
  const incompleteVaccinations = immunizationRecords.filter(
    (record) => record.status === "Incomplete",
  );

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Immunization Records</h1>
        <Button onClick={onAddRecord} className="flex items-center gap-2">
          <Plus size={16} />
          Add Immunization Record
        </Button>
      </div>

      {/* Vaccination Status Summary */}
      <RecordsSummaryHeader
        title="Vaccination Status"
        gradientColors="bg-gradient-to-r from-blue-50 to-indigo-50"
        borderColor="border-blue-100"
        summaryItems={[
          {
            icon: <Shield className="h-6 w-6 text-green-600" />,
            label: "COVID-19",
            value: (
              <div className="flex items-center text-sm">
                <CheckCircle2 className="h-3 w-3 text-green-600 mr-1" />
                <p className="text-xs text-green-600">
                  Fully vaccinated + Booster
                </p>
              </div>
            ),
            bgColor: "bg-green-100",
            textColor: "text-green-600",
          },
          {
            icon: <Shield className="h-6 w-6 text-green-600" />,
            label: "Influenza",
            value: (
              <div className="flex items-center text-sm">
                <CheckCircle2 className="h-3 w-3 text-green-600 mr-1" />
                <p className="text-xs text-green-600">Current for 2023-2024</p>
              </div>
            ),
            bgColor: "bg-green-100",
            textColor: "text-green-600",
          },
          {
            icon: <Shield className="h-6 w-6 text-yellow-600" />,
            label: "Shingles",
            value: (
              <div className="flex items-center text-sm">
                <AlertCircle className="h-3 w-3 text-yellow-600 mr-1" />
                <p className="text-xs text-yellow-600">1 of 2 doses complete</p>
              </div>
            ),
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-600",
          },
        ]}
        alertItems={incompleteVaccinations.map((record) => ({
          icon: <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />,
          text: (
            <span>
              <span className="font-medium">{record.type}</span>:{" "}
              {record.details.nextDose}
            </span>
          ),
        }))}
        alertTitle="Upcoming Vaccinations:"
        alertBgColor="bg-yellow-50"
        alertBorderColor="border-yellow-100"
        alertTextColor="text-yellow-800"
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search immunization records..."
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

      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          {Object.keys(recordsByType).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(recordsByType).map(([type, records]) => (
                <div key={type}>
                  <h3 className="text-lg font-medium mb-3">
                    {type} Vaccinations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {records.map((record) => (
                      <Card
                        key={record.id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-40 bg-gray-100 relative">
                          <img
                            src={record.thumbnailUrl}
                            alt={record.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge
                            className={`absolute top-2 right-2 ${record.status === "Complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {record.status}
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {record.title}
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>{record.provider}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-3">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-medium">Vaccine:</span>{" "}
                                {record.details.vaccine}
                              </div>
                              <div>
                                <span className="font-medium">Dose:</span>{" "}
                                {record.details.doseNumber}
                              </div>
                              <div>
                                <span className="font-medium">Lot #:</span>{" "}
                                {record.details.lotNumber}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span>{" "}
                                {record.details.location}
                              </div>
                            </div>
                            {record.details.nextDose && (
                              <div className="mt-2 text-xs">
                                <span className="font-medium">Next Dose:</span>{" "}
                                {record.details.nextDose}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewRecord(record.id)}
                              className="flex-1"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEditRecord(record.id)}
                              className="flex-1"
                            >
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Shield className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  No immunization records found
                </p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Immunization Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {Object.keys(recordsByType).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(recordsByType).map(([type, records]) => (
                <div key={type}>
                  <h3 className="text-lg font-medium mb-3">
                    {type} Vaccinations
                  </h3>
                  <div className="flex flex-col gap-4">
                    {records.map((record) => (
                      <Card key={record.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-[180px] h-[140px] bg-gray-100 relative">
                              <img
                                src={record.thumbnailUrl}
                                alt={record.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge
                                className={`absolute top-2 right-2 ${record.status === "Complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                              >
                                {record.status}
                              </Badge>
                            </div>
                            <div className="flex-grow p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-lg">
                                    {record.title}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>
                                      {new Date(
                                        record.date,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <User className="h-4 w-4 mr-1" />
                                    <span>{record.provider}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onViewRecord(record.id)}
                                  >
                                    View Details
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEditRecord(record.id)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <span className="font-medium">Vaccine:</span>{" "}
                                  {record.details.vaccine}
                                </div>
                                <div>
                                  <span className="font-medium">Dose:</span>{" "}
                                  {record.details.doseNumber}
                                </div>
                                <div>
                                  <span className="font-medium">Lot #:</span>{" "}
                                  {record.details.lotNumber}
                                </div>
                                <div>
                                  <span className="font-medium">Location:</span>{" "}
                                  {record.details.location}
                                </div>
                              </div>
                              {record.details.nextDose && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">
                                    Next Dose:
                                  </span>{" "}
                                  {record.details.nextDose}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Shield className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  No immunization records found
                </p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Immunization Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImmunizationRecordsView;
