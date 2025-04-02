import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  Shield,
} from "lucide-react";

interface SummaryItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

interface AlertItem {
  icon: React.ReactNode;
  text: React.ReactNode;
}

interface RecordsSummaryHeaderProps {
  title: string;
  gradientColors: string;
  borderColor: string;
  summaryItems: SummaryItem[];
  alertItems?: AlertItem[];
  alertTitle?: string;
  alertBgColor?: string;
  alertBorderColor?: string;
  alertTextColor?: string;
}

const RecordsSummaryHeader: React.FC<RecordsSummaryHeaderProps> = ({
  title,
  gradientColors,
  borderColor,
  summaryItems,
  alertItems = [],
  alertTitle = "Important Information:",
  alertBgColor = "bg-yellow-50",
  alertBorderColor = "border-yellow-100",
  alertTextColor = "text-yellow-800",
}) => {
  return (
    <Card className={`mb-6 ${gradientColors} ${borderColor}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summaryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white p-3 rounded-lg"
            >
              <div className={`${item.bgColor} p-2 rounded-full`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className={`text-2xl font-bold ${item.textColor}`}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {alertItems.length > 0 && (
          <div
            className={`mt-4 p-3 ${alertBgColor} rounded-lg border ${alertBorderColor}`}
          >
            <h4 className={`text-sm font-medium ${alertTextColor} mb-2`}>
              {alertTitle}
            </h4>
            <ul className="space-y-1">
              {alertItems.map((item, index) => (
                <li key={index} className="text-xs flex items-start gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecordsSummaryHeader;
