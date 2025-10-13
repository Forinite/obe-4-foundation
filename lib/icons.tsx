// app/lib/icons.ts

import {
    Heart,
    Stethoscope,
    Building,
    Users,
    Target,
    Shield,
    DollarSignIcon,
    LandPlotIcon,
    PersonStandingIcon, BookA, BookX
} from 'lucide-react';
import React, { JSX } from 'react';
import {DocumentIcon} from "@heroicons/react/24/solid";

export const iconMap: Record<string, React.ComponentType<{ className?: string }> | (() => JSX.Element)> = {
    Heart: Heart,
    Stethoscope: Stethoscope,
    Building: Building,
    Users: Users, // For objectives/approach (e.g., community-focused)
    Target: Target, // For objectives (e.g., goals)
    Shield: Shield, // For approach (e.g., protection, support)
    'Ambulance': () => <span aria-hidden="true">🚑</span>,
    'MoneyBag': DollarSignIcon,
    'Land': LandPlotIcon,
    'Document': DocumentIcon,
    'Doctor': PersonStandingIcon,
    'Books': BookA,
    'Book': BookX,
    '🏥': () => <span aria-hidden="true">🏥</span>,
};

export const renderIcon = (icon: string, className: string = 'w-5 h-5 text-cyan-600 dark:text-cyan-400') => {
    const IconComponent = iconMap[icon];
    if (!IconComponent) {
        return <span aria-hidden="true" className={className}>{icon || '❓'}</span>;
    }
    return <IconComponent className={className} aria-hidden="true" />;
};