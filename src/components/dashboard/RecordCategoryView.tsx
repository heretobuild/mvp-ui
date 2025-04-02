import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Filter,
  Search,
  AlertCircle,
  Leaf,
  Pill,
  Droplets,
} from "lucide-react";
import RecordsSummaryHeader from "./RecordsSummaryHeader";
// Removed the import for RecordCard since it's not being used

interface Record {
  id: string;
  title: string;
  date: string;
  provider: string;
  type: string;
  thumbnailUrl: string;
}

interface RecordCategoryViewProps {
  category?: "medical" | "vision" | "immunization" | "medications" | "allergy";
  records?: Record[];
  onAddRecord?: () => void;
  onEditRecord?: (id: string) => void;
  onDeleteRecord?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

const RecordCategoryView: React.FC<RecordCategoryViewProps> = ({
  category = "medical",
  records = category === "allergy"
    ? [
        {
          id: "1",
          title: "Peanut Allergy Test",
          date: "2023-05-15",
          provider: "Dr. Allison Chen",
          type: "Food Allergy",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&q=80",
        },
        {
          id: "2",
          title: "Pollen Allergy Assessment",
          date: "2023-04-22",
          provider: "Dr. Marcus Williams",
          type: "Environmental",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1573495804683-641191e042ea?w=300&q=80",
        },
        {
          id: "3",
          title: "Penicillin Sensitivity Test",
          date: "2023-03-10",
          provider: "City Medical Center",
          type: "Medication",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80",
        },
        {
          id: "4",
          title: "Latex Allergy Evaluation",
          date: "2023-02-05",
          provider: "Dr. Sarah Johnson",
          type: "Contact",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80",
        },
        {
          id: "5",
          title: "Shellfish Allergy Test",
          date: "2023-01-18",
          provider: "Allergy Specialists Inc.",
          type: "Food Allergy",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1565280654386-466aaf482d66?w=300&q=80",
        },
        {
          id: "6",
          title: "Gluten Sensitivity Evaluation",
          date: "2023-01-05",
          provider: "Digestive Health Center",
          type: "Food Allergy",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80",
        },
        {
          id: "7",
          title: "Dust Mite Allergy Test",
          date: "2022-12-12",
          provider: "Dr. Emily Rodriguez",
          type: "Environmental",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&q=80",
        },
      ]
    : [
        {
          id: "1",
          title: "Annual Physical",
          date: "2023-05-15",
          provider: "Dr. Smith",
          type: "Examination",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&q=80",
        },
        {
          id: "2",
          title: "Blood Test Results",
          date: "2023-04-22",
          provider: "City Lab",
          type: "Lab Results",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&q=80",
        },
        {
          id: "3",
          title: "X-Ray Report",
          date: "2023-03-10",
          provider: "Imaging Center",
          type: "Radiology",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&q=80",
        },
        {
          id: "4",
          title: "Specialist Consultation",
          date: "2023-02-05",
          provider: "Dr. Johnson",
          type: "Consultation",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=300&q=80",
        },
      ],
  onAddRecord = () => console.log("Add record clicked"),
  onEditRecord = (id) => console.log(`Edit record ${id}`),
  onDeleteRecord = (id) => console.log(`Delete record ${id}`),
  onViewRecord = (id) => console.log(`View record ${id}`),
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Get category title with proper capitalization
  const getCategoryTitle = () => {
    return category.charAt(0).toUpperCase() + category.slice(1) + " Records";
  };

  // Filter records based on search query and filter type
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.date &&
        new Date(record.date)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      record.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Get unique record types for filter dropdown
  const recordTypes = [
    "all",
    ...new Set(records.map((record) => record.type.toLowerCase())),
  ];

  // Get allergy-specific data for summary header
  const getAllergySummaryData = () => {
    if (category !== "allergy") return null;

    const foodAllergies = records.filter(
      (record) => record.type === "Food Allergy",
    ).length;
    const environmentalAllergies = records.filter(
      (record) => record.type === "Environmental",
    ).length;
    const medicationAllergies = records.filter(
      (record) => record.type === "Medication",
    ).length;
    const contactAllergies = records.filter(
      (record) => record.type === "Contact",
    ).length;

    return {
      foodAllergies,
      environmentalAllergies,
      medicationAllergies,
      contactAllergies,
      totalAllergies: records.length,
    };
  };

  // Render allergy summary header if category is allergy
  const renderAllergySummaryHeader = () => {
    if (category !== "allergy") return null;

    const allergyData = getAllergySummaryData();

    return (
      <RecordsSummaryHeader
        title="Allergy Summary"
        gradientColors="bg-gradient-to-r from-red-50 to-orange-50"
        borderColor="border-red-100"
        summaryItems={[
          {
            icon: <Droplets className="h-6 w-6 text-red-600" />,
            label: "Food Allergies",
            value: allergyData.foodAllergies,
            bgColor: "bg-red-100",
            textColor: "text-red-600",
          },
          {
            icon: <Leaf className="h-6 w-6 text-green-600" />,
            label: "Environmental",
            value: allergyData.environmentalAllergies,
            bgColor: "bg-green-100",
            textColor: "text-green-600",
          },
          {
            icon: <Pill className="h-6 w-6 text-blue-600" />,
            label: "Medication",
            value: allergyData.medicationAllergies,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
          },
        ]}
        alertItems={[
          {
            icon: <AlertCircle className="h-4 w-4 text-red-600" />,
            text: (
              <>
                <span className="font-medium">Peanut Allergy</span>
                <span className="text-gray-600">
                  {" "}
                  - Severe, requires EpiPen
                </span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-red-600" />,
            text: (
              <>
                <span className="font-medium">Penicillin</span>
                <span className="text-gray-600"> - Moderate reaction</span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-orange-500" />,
            text: (
              <>
                <span className="font-medium">Shellfish</span>
                <span className="text-gray-600"> - Moderate to severe</span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
            text: (
              <>
                <span className="font-medium">Gluten</span>
                <span className="text-gray-600"> - Mild sensitivity</span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
            text: (
              <>
                <span className="font-medium">Pollen</span>
                <span className="text-gray-600"> - Seasonal, mild</span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
            text: (
              <>
                <span className="font-medium">Dust Mites</span>
                <span className="text-gray-600"> - Year-round, mild</span>
              </>
            ),
          },
          {
            icon: <AlertCircle className="h-4 w-4 text-orange-500" />,
            text: (
              <>
                <span className="font-medium">Latex</span>
                <span className="text-gray-600"> - Moderate reaction</span>
              </>
            ),
          },
        ]}
        alertTitle="Critical Allergies:"
        alertBgColor="bg-red-50"
        alertBorderColor="border-red-100"
        alertTextColor="text-red-800"
      />
    );
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getCategoryTitle()}</h1>
        <Button onClick={onAddRecord} className="flex items-center gap-2">
          <Plus size={16} />
          Add Record
        </Button>
      </div>

      {/* Render allergy summary header if applicable */}
      {renderAllergySummaryHeader()}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter size={18} className="text-gray-500" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {recordTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all"
                    ? "All Types"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="h-40 bg-gray-100">
                    <img
                      src={record.thumbnailUrl}
                      alt={record.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.provider}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <div className="mt-2 mb-3">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {record.type}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewRecord(record.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditRecord(record.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteRecord(record.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <p className="text-gray-500 mb-4">No records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Record
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
                      <div className="w-full md:w-[120px] h-[120px] bg-gray-100">
                        <img
                          src={record.thumbnailUrl}
                          alt={record.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{record.title}</h3>
                            <p className="text-sm text-gray-500">
                              {record.provider}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(record.date).toLocaleDateString()}
                            </p>
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                              {record.type}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewRecord(record.id)}
                            >
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditRecord(record.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteRecord(record.id)}
                            >
                              Delete
                            </Button>
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
                <p className="text-gray-500 mb-4">No records found</p>
                <Button
                  variant="outline"
                  onClick={onAddRecord}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecordCategoryView;
