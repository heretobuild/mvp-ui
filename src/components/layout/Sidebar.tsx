import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  Stethoscope,
  Eye,
  Syringe,
  Pill,
  FolderPlus,
  Clock,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  LogOut,
  Users,
  Activity,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  activePage = "dashboard",
  onNavigate = () => {},
}: SidebarProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(activePage);

  const handleNavigation = (page: string) => {
    setActiveCategory(page);
    onNavigate(page);
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      section: "main",
    },
    {
      id: "family",
      label: "Family Members",
      icon: <Users size={20} />,
      section: "main",
    },
    {
      id: "insights",
      label: "Health Insights",
      icon: <Activity size={20} />,
      section: "main",
    },
    {
      id: "medical",
      label: "Medical",
      icon: <FileText size={20} />,
      section: "records",
    },

    {
      id: "vision",
      label: "Vision",
      icon: <Eye size={20} />,
      section: "records",
    },
    {
      id: "immunization",
      label: "Immunization",
      icon: <Syringe size={20} />,
      section: "records",
    },
    {
      id: "medications",
      label: "Medications",
      icon: <Pill size={20} />,
      section: "records",
    },
    {
      id: "other",
      label: "Other Records",
      icon: <FolderPlus size={20} />,
      section: "records",
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: <Clock size={20} />,
      section: "features",
    },
    {
      id: "reminders",
      label: "Reminders",
      icon: <Bell size={20} />,
      section: "features",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      section: "account",
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={20} />,
      section: "account",
    },
  ];

  const renderNavigationItems = (section: string) => {
    return navigationItems
      .filter((item) => item.section === section)
      .map((item) => (
        <TooltipProvider key={item.id} delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeCategory === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1",
                  collapsed ? "px-2" : "px-4",
                )}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="flex items-center">
                  {item.icon}
                  {!collapsed && (
                    <span className="ml-3 text-sm">{item.label}</span>
                  )}
                </span>
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ));
  };

  return (
    <div
      className={cn(
        "h-full bg-background border-r flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[280px]",
      )}
    >
      <div className="p-4 flex justify-between items-center border-b">
        {!collapsed && (
          <div className="font-bold text-lg truncate">Harbura</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-6">{renderNavigationItems("main")}</div>

        {!collapsed && (
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">
            Records
          </div>
        )}
        <div className="mb-6">{renderNavigationItems("records")}</div>

        {!collapsed && (
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">
            Features
          </div>
        )}
        <div className="mb-6">{renderNavigationItems("features")}</div>
      </div>

      <div className="border-t p-2">{renderNavigationItems("account")}</div>
    </div>
  );
};

export default Sidebar;
