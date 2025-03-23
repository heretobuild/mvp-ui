import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Calendar,
  User,
  Plus,
  AlertCircle,
} from "lucide-react";

interface DentalRecordsViewProps {
  onAddRecord?: () => void;
  onEditRecord?: (id: string) => void;
  onDeleteRecord?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

const DentalRecordsView: React.FC<DentalRecordsViewProps> = ({
  onAddRecord = () => {},
  onEditRecord = () => {},
  onDeleteRecord = () => {},
  onViewRecord = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const dentalRecords = [
    {
      id: "1",
      title: "Comprehensive Dental Examination",
      date: "2023-06-15",
      provider: "Dr. Michael Chen",
      type: "Examination",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&q=80",
      insights: [
        "Excellent overall oral health",
        "Minor plaque buildup on lower molars",
        "Recommended flossing daily",
      ],
      findings: {
        cavities: 0,
        plaque: "Minimal",
        gumHealth: "Good",
        xrays: "No issues detected",
      },
    },
    {
      id: "2",
      title: "Dental Cleaning",
      date: "2023-04-22",
      provider: "Dr. Michael Chen",
      type: "Cleaning",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&q=80",
      insights: [
        "Professional cleaning completed",
        "Removed tartar buildup",
        "Polished all teeth surfaces",
      ],
      findings: {
        plaque: "Moderate",
        tartar: "Some buildup on lower incisors",
        gumHealth: "Mild inflammation",
      },
    },
    {
      id: "3",
      title: "Dental X-Rays",
      date: "2023-02-10",
      provider: "Dr. Michael Chen",
      type: "X-Ray",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1590424263400-5b8699b3b8b4?w=300&q=80",
      insights: [
        "Full mouth X-rays completed",
        "No cavities detected",
        "Wisdom teeth positioning looks good",
      ],
      findings: {
        cavities: 0,
        rootIssues: "None",
        boneHealth: "Normal",
        wisdomTeeth: "Properly positioned",
      },
    },
    {
      id: "4",
      title: "Cavity Filling",
      date: "2022-11-05",
      provider: "Dr. Sarah Johnson",
      type: "Procedure",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&q=80",
      insights: [
        "Small cavity filled on upper right molar",
        "Composite filling material used",
        "No complications during procedure",
      ],
      findings: {
        location: "Upper right first molar",
        severity: "Minor",
        treatment: "Composite filling",
        followUp: "None required",
      },
    },
  ];

  const filteredRecords = dentalRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get the latest dental record
  const latestRecord = dentalRecords.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dental Records</h1>
        <Button onClick={onAddRecord} className="flex items-center gap-2">
          <Plus size={16} />
          Add Dental Record
        </Button>
      </div>

      {/* Latest Insights Card */}
      {latestRecord && (
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Latest Dental Insights</CardTitle>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200"
              >
                {new Date(latestRecord.date).toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={latestRecord.thumbnailUrl}
                  alt="Dental X-Ray"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="font-medium mb-2">
                  {latestRecord.title} with {latestRecord.provider}
                </h3>
                <div className="space-y-2">
                  {latestRecord.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-1 text-green-600">
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
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => onViewRecord(latestRecord.id)}
                >
                  View Full Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search dental records..."
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
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
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
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1">
                        Key Insights:
                      </h4>
                      <ul className="text-xs space-y-1">
                        {record.insights.slice(0, 2).map((insight, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <div className="min-w-4 mt-0.5 text-green-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <span>{insight}</span>
                          </li>
                        ))}
                        {record.insights.length > 2 && (
                          <li className="text-xs text-blue-600">
                            + {record.insights.length - 2} more
                          </li>
                        )}
                      </ul>
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
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No dental records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Dental Record
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
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              {record.type}
                            </Badge>
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
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-1">
                            Key Insights:
                          </h4>
                          <ul className="text-sm space-y-1">
                            {record.insights.map((insight, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-1"
                              >
                                <div className="min-w-4 mt-0.5 text-green-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                </div>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
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
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No dental records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Dental Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DentalRecordsView;
