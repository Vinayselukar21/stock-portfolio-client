
import { RefreshCw } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  lastUpdate: Date;
  isRefreshing: boolean;
}

export const Header = ({ lastUpdate, isRefreshing }: HeaderProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <h1 className="text-5xl font-light tracking-tight text-foreground mb-2">
          Portfolio
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <RefreshCw
          className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
        />
        <span>{lastUpdate ? formatTime(lastUpdate) : ""}</span>

        <ThemeToggle />
      </div>
    </div>
  );
};
