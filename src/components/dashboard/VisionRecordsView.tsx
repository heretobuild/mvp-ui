import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter, Calendar, User, Plus } from "lucide-react";

interface VisionRecordsViewProps {
  onAddRecord?: () => void;
  onEditRecord?: (id: string) => void;
  onDeleteRecord?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

const VisionRecordsView: React.FC<VisionRecordsViewProps> = ({
  onAddRecord = () => {},
  onEditRecord = () => {},
  onDeleteRecord = () => {},
  onViewRecord = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const visionRecords = [
    {
      id: "1",
      title: "Annual Eye Examination",
      date: "2023-05-15",
      provider: "Dr. Emily Rodriguez",
      type: "Comprehensive Exam",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=300&q=80",
      prescriptionDetails: {
        rightEye: "-1.75",
        leftEye: "-2.00",
        rightCylinder: "-0.50",
        leftCylinder: "-0.75",
        rightAxis: "180",
        leftAxis: "175",
        pdDistance: "62mm",
        addPower: "+1.00",
      },
      contactLensDetails: {
        brand: "Acuvue Oasys",
        type: "Bi-weekly",
        rightEye: "-1.75",
        leftEye: "-2.00",
        baseCurve: "8.4",
        diameter: "14.0",
      },
    },
    {
      id: "2",
      title: "Contact Lens Fitting",
      date: "2023-03-22",
      provider: "Dr. Emily Rodriguez",
      type: "Contact Lens",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1587742318817-4011a39fe361?w=300&q=80",
      contactLensDetails: {
        brand: "Dailies Total One",
        type: "Daily",
        rightEye: "-1.75",
        leftEye: "-2.00",
        baseCurve: "8.5",
        diameter: "14.1",
      },
    },
    {
      id: "3",
      title: "Glaucoma Screening",
      date: "2022-11-10",
      provider: "Dr. Michael Chen",
      type: "Screening",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=300&q=80",
      results: {
        intraocularPressure: {
          rightEye: "14 mmHg",
          leftEye: "15 mmHg",
        },
        visualFieldTest: "Normal",
        opticalCoherenceTomography: "Normal optic nerve appearance",
      },
    },
    {
      id: "4",
      title: "New Glasses Prescription",
      date: "2022-08-05",
      provider: "Dr. Emily Rodriguez",
      type: "Prescription",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&q=80",
      prescriptionDetails: {
        rightEye: "-1.50",
        leftEye: "-1.75",
        rightCylinder: "-0.50",
        leftCylinder: "-0.75",
        rightAxis: "180",
        leftAxis: "175",
        pdDistance: "62mm",
      },
    },
  ];

  const filteredRecords = visionRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vision Records</h1>
        <Button onClick={onAddRecord} className="flex items-center gap-2">
          <Plus size={16} />
          Add Vision Record
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search vision records..."
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
          {filteredRecords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredRecords.map((record) => (
                <Card
                  key={record.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gray-100 relative">
                    <img
                      src={record.thumbnailUrl}
                      alt={record.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800">
                      {record.type}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{record.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <User className="h-4 w-4 mr-1" />
                      <span>{record.provider}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {record.prescriptionDetails && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">
                          Prescription:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            Right: {record.prescriptionDetails.rightEye}
                          </div>
                          <div>Left: {record.prescriptionDetails.leftEye}</div>
                          {record.prescriptionDetails.rightCylinder && (
                            <>
                              <div>
                                Cyl (R):{" "}
                                {record.prescriptionDetails.rightCylinder}
                              </div>
                              <div>
                                Cyl (L):{" "}
                                {record.prescriptionDetails.leftCylinder}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    {record.contactLensDetails && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">
                          Contact Lenses:
                        </h4>
                        <div className="text-xs">
                          <div>
                            {record.contactLensDetails.brand} (
                            {record.contactLensDetails.type})
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div>
                              Right: {record.contactLensDetails.rightEye}
                            </div>
                            <div>Left: {record.contactLensDetails.leftEye}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewRecord(record.id)}
                        className="flex-1"
                      >
                        <Eye className="mr-1 h-4 w-4" /> View
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
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Eye className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No vision records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Vision Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {filteredRecords.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-[180px] h-[140px] bg-gray-100">
                        <img
                          src={record.thumbnailUrl}
                          alt={record.title}
                          className="w-full h-full object-cover"
                        />
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
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <User className="h-4 w-4 mr-1" />
                              <span>{record.provider}</span>
                            </div>
                            <Badge className="mt-2 bg-blue-100 text-blue-800">
                              {record.type}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewRecord(record.id)}
                            >
                              <Eye className="mr-1 h-4 w-4" /> View
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
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {record.prescriptionDetails && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                Prescription:
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  Right: {record.prescriptionDetails.rightEye}
                                </div>
                                <div>
                                  Left: {record.prescriptionDetails.leftEye}
                                </div>
                                {record.prescriptionDetails.rightCylinder && (
                                  <>
                                    <div>
                                      Cyl (R):{" "}
                                      {record.prescriptionDetails.rightCylinder}
                                    </div>
                                    <div>
                                      Cyl (L):{" "}
                                      {record.prescriptionDetails.leftCylinder}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {record.contactLensDetails && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                Contact Lenses:
                              </h4>
                              <div className="text-xs">
                                <div>
                                  {record.contactLensDetails.brand} (
                                  {record.contactLensDetails.type})
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  <div>
                                    Right: {record.contactLensDetails.rightEye}
                                  </div>
                                  <div>
                                    Left: {record.contactLensDetails.leftEye}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
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
                <Eye className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No vision records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Vision Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisionRecordsView;
