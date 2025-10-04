// app/types/index.ts

// Reusable object types
export interface Link {
    href: string;
    label: string;
}

export interface OpenDay {
    day: string;
    time: string;
}

export interface Service {
    icon: string; // Emoji or icon identifier (e.g., '🚑', 'Heart')
    title: string;
    description: string;
}

export interface Objective {
    icon: string; // Emoji or icon identifier
    title: string;
    items: string[];
}

export interface Approach {
    icon: string; // Emoji or icon identifier
    title: string;
    description: string;
}

export interface ChallengeItem {
    icon: string; // Emoji or icon identifier
    text: string;
}

// Document types
export interface HomeData {
    _id: string; // Sanity document ID
    _type: 'home';
    missionStatements: string[];
    missionInfo: {
        percentage: number;
        text: string;
        list: string[];
    };
    services: Service[];
}

export interface AboutData {
    _id: string;
    _type: 'about';
    challengeData: {
        statistic: string;
        description: string;
        subDescription: string;
        items: ChallengeItem[];
    };
    objectives: Objective[];
    approach: Approach[];
}

export interface ContactData {
    _id: string;
    _type: 'contact';
    generalInfo: {
        address1: string;
        address2: string;
        phone1: string;
        phone2: string;
        email: string;
        twitter: string;
        linkedin: string;
        openDays: OpenDay[];
        charity: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
}

export interface GalleryImage {
    _id: string;
    _type: 'galleryImage';
    image: {
        _type: 'image';
        asset: {
            _ref: string;
            _type: 'reference';
        };
    }; // Sanity image object
    alt: string;
    caption?: string;
}

export interface FooterData {
    _id: string;
    _type: 'footer';
    quickLinks: Link[];
    programLinks: Link[];
}