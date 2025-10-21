// app/lib/icons.ts


import React, { JSX } from 'react';
import {
    // 🔥 ALL 17 CORE + 10 MEDICAL = 27 TOTAL!
    Target, Map, BarChart3, Users, Heart, Activity, Zap, Shield, Star,
    Clock, Phone, Mail, MapPin, Twitter, Linkedin, Calendar, HelpCircle,
    Stethoscope, Building, DollarSignIcon, LandPlotIcon, PersonStandingIcon, BookA, BookX
} from 'lucide-react';
import { DocumentIcon } from "@heroicons/react/24/solid";

// 🔥 ALL 27 ICONS PRESERVED!
export const iconMap: Record<string, React.ComponentType<{ className?: string }> | (() => JSX.Element)> = {
    // 🔥 17 CORE ICONS
    target: Target,
    map: Map,
    barChart3: BarChart3,
    users: Users,
    heart: Heart,
    activity: Activity,
    zap: Zap,
    shield: Shield,
    star: Star,
    clock: Clock,
    phone: Phone,
    mail: Mail,
    mapPin: MapPin,
    twitter: Twitter,
    linkedin: Linkedin,
    calendar: Calendar,
    helpCircle: HelpCircle,
    // 🔥 10 MEDICAL ICONS (ALL PRESERVED!)
    stethoscope: Stethoscope,
    building: Building,
    moneyBag: DollarSignIcon,
    land: LandPlotIcon,
    doctor: PersonStandingIcon,
    books: BookA,
    book: BookX,
    ambulance: () => <span aria-hidden="true">🚑</span>,
    hospital: () => <span aria-hidden="true">🏥</span>,
    document: DocumentIcon,
    shield2: () => <span aria-hidden="true">🛡️</span>,
    people: () => <span aria-hidden="true">👥️️</span>,
    alert: () => <span aria-hidden="true">🚨</span>,
    handshake: () => <span aria-hidden="true">🤝</span>,
};

export const renderIcon = (icon: string, className: string = 'w-5 h-5 text-cyan-600 dark:text-cyan-400') => {
    const IconComponent = iconMap[icon];
    if (!IconComponent) {
        return <span aria-hidden="true" className={className}>{icon || '❓'}</span>;
    }
    return <IconComponent className={className} aria-hidden="true" />;
};

// 🔥 ALL 27 OPTIONS = FULL DROPDOWN!
export function renderIconOptions() {
    return (
        <>
            {/* 🔥 17 CORE ICONS */}
            <option value="target">🎯 Target</option>
            <option value="map">🗺️ Map</option>
            <option value="barChart3">📊 Chart</option>
            <option value="users">👥 Users</option>
            <option value="heart">❤️ Heart</option>
            <option value="activity">⚡ Activity</option>
            <option value="zap">⚡ Zap</option>
            <option value="shield">🛡️ Shield</option>
            <option value="star">⭐ Star</option>
            <option value="clock">⏰ Clock</option>
            <option value="phone">📞 Phone</option>
            <option value="mail">✉️ Mail</option>
            <option value="mapPin">📍 Location</option>
            <option value="twitter">🐦 Twitter</option>
            <option value="linkedin">💼 LinkedIn</option>
            <option value="calendar">📅 Calendar</option>
            <option value="helpCircle">❓ Help</option>

            {/* 🔥 10 MEDICAL ICONS (ALL PRESERVED!) */}
            <optgroup label="🏥 Medical Icons">
                <option value="stethoscope">🩺 Stethoscope</option>
                <option value="building">🏢 Building</option>
                <option value="moneyBag">💰 Money Bag</option>
                <option value="land">🌾 Land Plot</option>
                <option value="doctor">👨‍⚕️ Doctor</option>
                <option value="books">📚 Books A</option>
                <option value="book">📖 Book X</option>
                <option value="ambulance">🚑 Ambulance</option>
                <option value="hospital">🏥 Hospital</option>
                <option value="document">📋 Document</option>
            </optgroup>
        </>
    );
}