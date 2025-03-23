import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface PatientPortalConnectorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onImportSuccess?: (records: any[]) => void;
}

const portalProviders = [
  { id: "epic", name: "Epic MyChart" },
  { id: "cerner", name: "Cerner Patient Portal" },
  { id: "allscripts", name: "Allscripts FollowMyHealth" },
  { id: "nextgen", name: "NextGen Patient Portal" },
  { id: "meditech", name: "MEDITECH Patient Portal" },
  { id: "athena", name: "athenahealth Patient Portal" },
];

const PatientPortalConnector: React.FC<PatientPortalConnectorProps> = ({
  open = false,
  onOpenChange = () => {},
  onImportSuccess = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<
    "select" | "credentials" | "import"
  >("select");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [importStatus, setImportStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [importedRecords, setImportedRecords] = useState<any[]>([]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setActiveTab("credentials");
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("import");
    setImportStatus("loading");

    // Simulate API call to connect to patient portal
    setTimeout(() => {
      // Mock successful import
      const mockRecords = [
        {
          id: "p1",
          title: "Annual Physical",
          date: "2023-10-15",
          provider: "Dr. Smith",
        },
        {
          id: "p2",
          title: "Blood Test Results",
          date: "2023-09-22",
          provider: "City Lab",
        },
        {
          id: "p3",
          title: "Vaccination Record",
          date: "2023-08-10",
          provider: "Community Clinic",
        },
      ];

      setImportedRecords(mockRecords);
      setImportStatus("success");
    }, 2000);
  };

  const handleImportComplete = () => {
    onImportSuccess(importedRecords);
    onOpenChange(false);
  };

  const resetFlow = () => {
    setActiveTab("select");
    setSelectedProvider("");
    setCredentials({ username: "", password: "" });
    setImportStatus("idle");
    setImportedRecords([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to Patient Portal</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} className="w-full">
          <TabsContent value="select" className="mt-0">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select your healthcare provider</Label>
                <div className="grid grid-cols-1 gap-3">
                  {portalProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4"
                      onClick={() => handleProviderSelect(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="credentials" className="mt-0">
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("select")}
                >
                  Back
                </Button>
                <Button type="submit">Connect</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="import" className="mt-0">
            <div className="space-y-4 py-4">
              {importStatus === "loading" && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-center">
                    Connecting to patient portal and retrieving records...
                  </p>
                </div>
              )}

              {importStatus === "success" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>
                      Successfully connected! Found {importedRecords.length}{" "}
                      records.
                    </p>
                  </div>

                  <div className="border rounded-md divide-y">
                    {importedRecords.map((record) => (
                      <div
                        key={record.id}
                        className="p-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{record.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.provider} •{" "}
                            {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {importStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    There was an error connecting to the patient portal. Please
                    try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between pt-4">
                {importStatus !== "loading" && (
                  <Button type="button" variant="outline" onClick={resetFlow}>
                    Start Over
                  </Button>
                )}
                {importStatus === "success" && (
                  <Button type="button" onClick={handleImportComplete}>
                    Import Records
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientPortalConnector;
