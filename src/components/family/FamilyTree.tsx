import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, UserPlus, Edit, Trash, ChevronRight, Users } from "lucide-react";
import FamilyMemberForm from "./FamilyMemberForm";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl?: string;
  recordCount?: number;
  reminderCount?: number;
}

interface FamilyTreeProps {
  members?: FamilyMember[];
  onAddMember?: () => void;
  onEditMember?: (id: string) => void;
  onDeleteMember?: (id: string) => void;
  onSelectMember?: (id: string) => void;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  members = [
    {
      id: "1",
      name: "Jane Doe",
      relationship: "Self",
      dateOfBirth: "1985-06-15",
      gender: "Female",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      recordCount: 12,
      reminderCount: 3,
    },
    {
      id: "2",
      name: "John Doe",
      relationship: "Spouse",
      dateOfBirth: "1983-09-22",
      gender: "Male",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      recordCount: 8,
      reminderCount: 1,
    },
    {
      id: "3",
      name: "Emma Doe",
      relationship: "Daughter",
      dateOfBirth: "2015-03-10",
      gender: "Female",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      recordCount: 5,
      reminderCount: 2,
    },
    {
      id: "4",
      name: "Robert Doe",
      relationship: "Father",
      dateOfBirth: "1955-11-28",
      gender: "Male",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      recordCount: 10,
      reminderCount: 4,
    },
  ],
  onAddMember = () => {},
  onEditMember = (id) => {},
  onDeleteMember = (id) => {},
  onSelectMember = (id) => {},
}) => {
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowAddMemberForm(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setShowAddMemberForm(true);
  };

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Family Health Management</h1>
          <p className="text-muted-foreground">
            Manage health records for your entire family
          </p>
        </div>
        <Button onClick={handleAddMember}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Family Member
        </Button>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(v) => setViewMode(v as "grid" | "list")}
        className="mb-6"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <Badge variant="outline" className="ml-2">
            <Users className="mr-1 h-3 w-3" /> {members.length} Family Members
          </Badge>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline">{member.relationship}</Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {member.relationship !== "Self" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteMember(member.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    className="flex flex-col items-center text-center cursor-pointer"
                    onClick={() => onSelectMember(member.id)}
                  >
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.gender}, {calculateAge(member.dateOfBirth)} years
                    </p>
                    <div className="flex gap-4 mt-4 w-full justify-center">
                      <div className="text-center">
                        <p className="font-bold">{member.recordCount}</p>
                        <p className="text-xs text-muted-foreground">Records</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{member.reminderCount}</p>
                        <p className="text-xs text-muted-foreground">
                          Reminders
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMember(member.id);
                      }}
                    >
                      View Records <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelectMember(member.id)}
                  >
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="font-medium truncate">{member.name}</h3>
                        <Badge variant="outline" className="ml-2">
                          {member.relationship}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.gender}, {calculateAge(member.dateOfBirth)}{" "}
                        years
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mr-4">
                      <div className="text-center">
                        <p className="font-bold">{member.recordCount}</p>
                        <p className="text-xs text-muted-foreground">Records</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{member.reminderCount}</p>
                        <p className="text-xs text-muted-foreground">
                          Reminders
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMember(member);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {member.relationship !== "Self" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteMember(member.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showAddMemberForm && (
        <FamilyMemberForm
          open={showAddMemberForm}
          onOpenChange={setShowAddMemberForm}
          member={selectedMember}
          onSubmit={(data) => {
            console.log("Form submitted:", data);
            setShowAddMemberForm(false);
          }}
        />
      )}
    </div>
  );
};

export default FamilyTree;
