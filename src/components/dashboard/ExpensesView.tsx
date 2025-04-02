import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  Upload,
  DollarSign,
  FileText,
  Calendar,
  Tag,
  Filter,
} from "lucide-react";

interface ExpensesViewProps {
  onAddExpense?: () => void;
  onEditExpense?: (id: string) => void;
  onDeleteExpense?: (id: string) => void;
  onViewExpense?: (id: string) => void;
}

const ExpensesView: React.FC<ExpensesViewProps> = ({
  onAddExpense = () => {},
  onEditExpense = () => {},
  onDeleteExpense = () => {},
  onViewExpense = () => {},
}) => {
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock data for expenses
  const mockExpenses = [
    {
      id: "1",
      date: "2024-05-15",
      category: "Doctor Visit",
      provider: "Dr. Sarah Johnson",
      description: "Annual physical examination",
      totalAmount: 150,
      insuranceCovered: 120,
      outOfPocket: 30,
      hasReceipt: true,
    },
    {
      id: "2",
      date: "2024-05-02",
      category: "Prescription",
      provider: "City Pharmacy",
      description: "Monthly medication refill",
      totalAmount: 85.5,
      insuranceCovered: 70,
      outOfPocket: 15.5,
      hasReceipt: true,
    },
    {
      id: "3",
      date: "2024-04-20",
      category: "Lab Test",
      provider: "Metro Medical Lab",
      description: "Blood work panel",
      totalAmount: 220,
      insuranceCovered: 180,
      outOfPocket: 40,
      hasReceipt: false,
    },
    {
      id: "4",
      date: "2024-04-10",
      category: "Specialist",
      provider: "Dr. Michael Chen",
      description: "Dermatology consultation",
      totalAmount: 175,
      insuranceCovered: 125,
      outOfPocket: 50,
      hasReceipt: true,
    },
    {
      id: "5",
      date: "2024-03-28",
      category: "Dental",
      provider: "Bright Smile Dental",
      description: "Teeth cleaning and checkup",
      totalAmount: 120,
      insuranceCovered: 90,
      outOfPocket: 30,
      hasReceipt: true,
    },
  ];

  // Calculate summary statistics
  const totalSpent = mockExpenses.reduce(
    (sum, expense) => sum + expense.totalAmount,
    0,
  );
  const totalOutOfPocket = mockExpenses.reduce(
    (sum, expense) => sum + expense.outOfPocket,
    0,
  );
  const totalInsuranceCovered = mockExpenses.reduce(
    (sum, expense) => sum + expense.insuranceCovered,
    0,
  );

  // Filter expenses by category if needed
  const filteredExpenses =
    activeCategory === "all"
      ? mockExpenses
      : mockExpenses.filter(
          (expense) =>
            expense.category.toLowerCase() === activeCategory.toLowerCase(),
        );

  // Categories for filtering
  const categories = [
    "All",
    "Doctor Visit",
    "Prescription",
    "Lab Test",
    "Specialist",
    "Dental",
    "Vision",
    "Other",
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Expenses
                </p>
                <h3 className="text-2xl font-bold">${totalSpent.toFixed(2)}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Out of Pocket
                </p>
                <h3 className="text-2xl font-bold">
                  ${totalOutOfPocket.toFixed(2)}
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Insurance Covered
                </p>
                <h3 className="text-2xl font-bold">
                  ${totalInsuranceCovered.toFixed(2)}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setActiveCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.toLowerCase()}
                  value={category.toLowerCase()}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setShowAddExpenseDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Health Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No expenses found. Add your first expense to get started.
                </p>
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onViewExpense(expense.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {expense.category === "Doctor Visit" && (
                          <FileText className="h-5 w-5 text-blue-600" />
                        )}
                        {expense.category === "Prescription" && (
                          <FileText className="h-5 w-5 text-purple-600" />
                        )}
                        {expense.category === "Lab Test" && (
                          <FileText className="h-5 w-5 text-amber-600" />
                        )}
                        {expense.category === "Specialist" && (
                          <FileText className="h-5 w-5 text-green-600" />
                        )}
                        {expense.category === "Dental" && (
                          <FileText className="h-5 w-5 text-red-600" />
                        )}
                        {expense.category === "Vision" && (
                          <FileText className="h-5 w-5 text-indigo-600" />
                        )}
                        {expense.category === "Other" && (
                          <FileText className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{expense.provider}</h4>
                        <p className="text-sm text-gray-500">
                          {expense.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-0.5 rounded">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(expense.date).toLocaleDateString()}
                          </span>
                          <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            <Tag className="h-3 w-3 mr-1" />
                            {expense.category}
                          </span>
                          {expense.hasReceipt && (
                            <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              <FileText className="h-3 w-3 mr-1" />
                              Receipt
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-semibold">
                        ${expense.totalAmount.toFixed(2)}
                      </p>
                      <div className="flex flex-col text-xs text-gray-500">
                        <span>
                          Insurance: ${expense.insuranceCovered.toFixed(2)}
                        </span>
                        <span className="font-medium text-amber-600">
                          You paid: ${expense.outOfPocket.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Expense Dialog */}
      <Dialog
        open={showAddExpenseDialog}
        onOpenChange={setShowAddExpenseDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Health Expense</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="doctor_visit">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor_visit">Doctor Visit</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="lab_test">Lab Test</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="vision">Vision</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="provider">Provider/Facility</Label>
              <Input
                id="provider"
                placeholder="Enter provider or facility name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the expense"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="total">Total Amount ($)</Label>
                <Input
                  id="total"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="insurance">Insurance Covered ($)</Label>
                <Input
                  id="insurance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="outOfPocket">Out of Pocket ($)</Label>
                <Input
                  id="outOfPocket"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddExpenseDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle saving the expense
                setShowAddExpenseDialog(false);
              }}
            >
              Save Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpensesView;
