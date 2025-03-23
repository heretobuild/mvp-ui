import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, Calendar, Clock, Edit, Plus, Trash2 } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "appointment" | "medication";
  description?: string;
  status: "upcoming" | "completed" | "missed";
}

interface RemindersViewProps {
  reminders?: Reminder[];
  onAddReminder?: () => void;
  onEditReminder?: (reminder: Reminder) => void;
  onDeleteReminder?: (reminderId: string) => void;
}

const RemindersView = ({
  reminders = [
    {
      id: "1",
      title: "Annual Physical Checkup",
      date: "2023-06-15",
      time: "10:00 AM",
      type: "appointment",
      description: "Annual physical examination with Dr. Smith",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Dental Cleaning",
      date: "2023-07-22",
      time: "2:30 PM",
      type: "appointment",
      description: "Regular dental cleaning with Dr. Johnson",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Blood Pressure Medication",
      date: "2023-06-10",
      time: "8:00 AM",
      type: "medication",
      description: "Refill prescription for blood pressure medication",
      status: "upcoming",
    },
    {
      id: "4",
      title: "Eye Exam",
      date: "2023-05-05",
      time: "3:15 PM",
      type: "appointment",
      description: "Annual eye examination with Dr. Williams",
      status: "completed",
    },
    {
      id: "5",
      title: "Allergy Medication",
      date: "2023-05-20",
      time: "9:00 AM",
      type: "medication",
      description: "Refill prescription for allergy medication",
      status: "missed",
    },
  ],
  onAddReminder = () => {},
  onEditReminder = () => {},
  onDeleteReminder = () => {},
}: RemindersViewProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAddReminderDialog, setShowAddReminderDialog] = useState(false);

  // Filter reminders based on active tab
  const filteredReminders = reminders.filter((reminder) => {
    if (activeTab === "all") return true;
    if (activeTab === "appointments") return reminder.type === "appointment";
    if (activeTab === "medications") return reminder.type === "medication";
    return reminder.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <Button onClick={() => setShowAddReminderDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>

        {[
          "upcoming",
          "completed",
          "missed",
          "appointments",
          "medications",
          "all",
        ].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filteredReminders.length === 0 ? (
              <div className="text-center py-10">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No reminders found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeTab === "upcoming" &&
                    "You don't have any upcoming reminders."}
                  {activeTab === "completed" &&
                    "You don't have any completed reminders."}
                  {activeTab === "missed" &&
                    "You don't have any missed reminders."}
                  {activeTab === "appointments" &&
                    "You don't have any appointment reminders."}
                  {activeTab === "medications" &&
                    "You don't have any medication reminders."}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowAddReminderDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add a reminder
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReminders.map((reminder) => (
                  <Card key={reminder.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{reminder.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {reminder.type === "appointment"
                              ? "Appointment"
                              : "Medication Refill"}
                          </CardDescription>
                        </div>
                        {getStatusBadge(reminder.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(reminder.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{reminder.time}</span>
                        </div>
                        {reminder.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {reminder.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex space-x-2 w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => onEditReminder(reminder)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => onDeleteReminder(reminder.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Reminder Dialog - This would typically use the ReminderFormDialog component */}
      <Dialog
        open={showAddReminderDialog}
        onOpenChange={setShowAddReminderDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              This would use the ReminderFormDialog component to add a new
              reminder.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddReminderDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onAddReminder();
                setShowAddReminderDialog(false);
              }}
            >
              Add Reminder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemindersView;
