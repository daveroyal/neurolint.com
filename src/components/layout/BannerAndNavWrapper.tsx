"use client";
import React, { useRef, useState } from 'react';
import { BetaBanner } from "@/components/layout/BetaBanner";
import { Navigation } from "@/components/layout/Navigation";

export function BannerAndNavWrapper({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(false);
  const [initialized, setInitialized] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Handle initial state and localStorage
  React.useEffect(() => {
    const checkBannerState = () => {
      if (typeof window === 'undefined') return;
      
      const closed = localStorage.getItem('betaBannerClosed');
      const shouldShow = closed !== 'true';
      
      setBannerVisible(shouldShow);
      setInitialized(true);
      setMounted(true);
    };

    checkBannerState();
  }, []);

  const handleBannerClose = () => {
    setBannerVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('betaBannerClosed', 'true');
    }
  };

  // Don't render anything until we've checked localStorage
  if (!initialized) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {mounted && (
        <BetaBanner 
          ref={bannerRef} 
          onClose={handleBannerClose}
          visible={bannerVisible}
        />
      )}
      <div className="relative z-50">
        <Navigation />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 