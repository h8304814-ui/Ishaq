import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, Minimize2, Check } from 'lucide-react';

interface ResponsiveTesterBarProps {
  currentSimulatedWidth: string | null;
  onSetSimulatedWidth: (width: string | null) => void;
}

export const ResponsiveTesterBar: React.FC<ResponsiveTesterBarProps> = ({
  currentSimulatedWidth,
  onSetSimulatedWidth,
}) => {
  const [actualWidth, setActualWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => setActualWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const presets = [
    { label: '320px', width: '320px', icon: Smartphone, desc: 'Compact Mobile (iPhone SE)' },
    { label: '360px', width: '360px', icon: Smartphone, desc: 'Android (Galaxy)' },
    { label: '375px', width: '375px', icon: Smartphone, desc: 'iPhone standard' },
    { label: '390px', width: '390px', icon: Smartphone, desc: 'iPhone 14/15/16' },
    { label: '430px', width: '430px', icon: Smartphone, desc: 'iPhone Pro Max' },
    { label: '768px', width: '768px', icon: Tablet, desc: 'iPad / Tablet' },
    { label: '1024px', width: '1024px', icon: Monitor, desc: 'Laptop' },
    { label: 'Full', width: null, icon: Maximize2, desc: 'Full Screen Fluid' },
  ];

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-stone-900/90 hover:bg-stone-950 text-amber-300 border border-stone-700 shadow-xl rounded-full px-3.5 py-2 text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all active:scale-95"
          title="Open Responsive Screen Size Tester"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Screen Tester ({currentSimulatedWidth || `${actualWidth}px`})</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-4 z-50 max-w-xl mx-auto">
      <div className="bg-stone-950/95 text-stone-200 border border-stone-800 rounded-2xl shadow-2xl p-2.5 sm:p-3 backdrop-blur-md">
        
        {/* Top bar with actual window width & minimize */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[11px] px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-stone-100">Responsive Device Tester:</span>
            <span className="text-amber-400 font-mono font-bold tabular-nums">
              {currentSimulatedWidth ? `Simulating ${currentSimulatedWidth}` : `Actual: ${actualWidth}px`}
            </span>
          </div>

          <button
            onClick={() => setIsCollapsed(true)}
            aria-label="Minimize tester"
            className="text-stone-400 hover:text-stone-200 p-1 rounded"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 px-0.5">
          {presets.map((preset) => {
            const isActive = currentSimulatedWidth === preset.width;
            const Icon = preset.icon;
            return (
              <button
                key={preset.label}
                onClick={() => onSetSimulatedWidth(preset.width)}
                title={preset.desc}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{preset.label}</span>
                {isActive && <Check className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
