"use client";
import { useEffect, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface BetaBannerProps {
  onClose?: () => void;
  visible: boolean;
}

export const BetaBanner = forwardRef<HTMLDivElement, BetaBannerProps>(
  function BetaBanner({ onClose, visible }, ref) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClose = () => {
      if (onClose) onClose();
      // Dispatch custom event for immediate layout update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('betaBannerClosed'));
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <div className={cn(
          "transition-opacity duration-300",
          mounted ? "opacity-0" : "opacity-100"
        )}>
          <div className="bg-blue-500 rounded-lg shadow-lg">
            <div className="hidden sm:flex items-center gap-2 p-4">
              <Skeleton className="h-4 w-4 bg-blue-600 shrink-0" />
              <Skeleton className="h-4 w-64 bg-blue-400" />
              <Skeleton className="h-4 w-32 bg-blue-400 shrink-0" />
            </div>
            <div className="sm:hidden flex items-center gap-2 p-4">
              <Skeleton className="h-4 w-4 bg-blue-600 shrink-0" />
              <Skeleton className="h-4 w-40 bg-blue-400" />
              <Skeleton className="h-4 w-28 bg-blue-400 shrink-0" />
            </div>
          </div>
        </div>
        <div className={cn(
          "transition-opacity duration-300",
          mounted ? "opacity-100" : "opacity-0"
        )}>
          <div className="bg-blue-500 text-white text-center py-3 px-6 text-sm font-medium rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                🚀 neurolint is currently in beta. We&lsquo;re actively improving and would{' '}
                <a
                  href="https://github.com/daveroyal/neurolint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200 transition-colors"
                >
                  love your feedback!
                </a>
              </span>
              <span className="sm:hidden">
                🚀 We&lsquo;re in beta!{' '}
                <a
                  href="https://github.com/daveroyal/neurolint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200 transition-colors"
                >
                  Your feedback
                </a>
                {' '}shapes neurolint.
              </span>
              <button
                onClick={handleClose}
                aria-label="Close beta banner"
                className="text-white hover:text-blue-200 text-lg font-bold focus:outline-none"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
); 