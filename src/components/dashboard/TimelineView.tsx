import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, FilterIcon, Search } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  category:
    | "medical"
    | "dental"
    | "vision"
    | "immunization"
    | "medication"
    | "other";
  provider: string;
  description: string;
}

const categoryColors: Record<TimelineEvent["category"], string> = {
  medical: "bg-blue-100 text-blue-800",
  dental: "bg-green-100 text-green-800",
  vision: "bg-purple-100 text-purple-800",
  immunization: "bg-yellow-100 text-yellow-800",
  medication: "bg-red-100 text-red-800",
  other: "bg-gray-100 text-gray-800",
};

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Annual Physical Examination",
    date: "2023-10-15",
    category: "medical",
    provider: "Dr. Sarah Johnson",
    description:
      "Routine annual physical examination. Blood pressure: 120/80, Heart rate: 72 bpm.",
  },
  {
    id: "2",
    title: "Dental Cleaning",
    date: "2023-09-05",
    category: "dental",
    provider: "Dr. Michael Chen",
    description: "Regular dental cleaning and checkup. No cavities found.",
  },
  {
    id: "3",
    title: "Eye Examination",
    date: "2023-08-20",
    category: "vision",
    provider: "Dr. Emily Rodriguez",
    description:
      "Annual eye exam. Prescription updated: -1.75 (left), -2.00 (right).",
  },
  {
    id: "4",
    title: "Flu Vaccination",
    date: "2023-11-10",
    category: "immunization",
    provider: "Walgreens Pharmacy",
    description: "Annual influenza vaccination administered.",
  },
  {
    id: "5",
    title: "Prescription Refill",
    date: "2023-12-01",
    category: "medication",
    provider: "CVS Pharmacy",
    description: "Monthly refill of maintenance medication.",
  },
  {
    id: "6",
    title: "Allergy Test",
    date: "2023-07-15",
    category: "other",
    provider: "Dr. Robert Williams",
    description: "Comprehensive allergy panel testing.",
  },
  {
    id: "7",
    title: "Blood Work",
    date: "2023-10-16",
    category: "medical",
    provider: "Quest Diagnostics",
    description: "Complete blood count and metabolic panel.",
  },
  {
    id: "8",
    title: "Dental X-Rays",
    date: "2023-09-06",
    category: "dental",
    provider: "Dr. Michael Chen",
    description: "Full mouth X-rays taken for dental records.",
  },
];

interface TimelineViewProps {
  events?: TimelineEvent[];
}

const TimelineView = ({ events = mockTimelineEvents }: TimelineViewProps) => {
  const [view, setView] = useState<"chronological" | "category">(
    "chronological",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  // Filter events based on search, category, and date range
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;

    const matchesDateRange =
      (!dateRange.from || event.date >= dateRange.from) &&
      (!dateRange.to || event.date <= dateRange.to);

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  // Sort events chronologically (newest first)
  const chronologicalEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Group events by category
  const eventsByCategory = filteredEvents.reduce<
    Record<string, TimelineEvent[]>
  >((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {});

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Health Timeline</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={view === "chronological" ? "default" : "outline"}
              onClick={() => setView("chronological")}
            >
              Chronological
            </Button>
            <Button
              variant={view === "category" ? "default" : "outline"}
              onClick={() => setView("category")}
            >
              By Category
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="dental">Dental</SelectItem>
                <SelectItem value="vision">Vision</SelectItem>
                <SelectItem value="immunization">Immunization</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="From"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                  className="w-[140px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">-</span>
                <Input
                  type="date"
                  placeholder="To"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, to: e.target.value })
                  }
                  className="w-[140px]"
                />
              </div>
            </div>
          </div>
        </div>

        {view === "chronological" ? (
          <div className="space-y-4">
            {chronologicalEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No records found matching your filters.
                </p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                {chronologicalEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <Card className="w-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                          <Badge className={categoryColors[event.category]}>
                            {event.category.charAt(0).toUpperCase() +
                              event.category.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">
                          Provider: {event.provider}
                        </p>
                        <p className="text-sm mt-2">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="mb-4">
              {Object.keys(eventsByCategory).length === 0 ? (
                <TabsTrigger value="empty" disabled>
                  No Categories
                </TabsTrigger>
              ) : (
                Object.keys(eventsByCategory).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))
              )}
            </TabsList>

            {Object.keys(eventsByCategory).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No records found matching your filters.
                </p>
              </div>
            ) : (
              Object.entries(eventsByCategory).map(
                ([category, categoryEvents]) => (
                  <TabsContent
                    key={category}
                    value={category}
                    className="space-y-4"
                  >
                    {categoryEvents.map((event) => (
                      <Card key={event.id} className="w-full">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium">
                            Provider: {event.provider}
                          </p>
                          <p className="text-sm mt-2">{event.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ),
              )
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
