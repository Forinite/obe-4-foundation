// app/types/index.ts

export interface Link {
    href: string;
    label: string;
}

export interface OpenDay {
    day: string;
    time: string;
}

export interface Service {
    icon: string;
    title: string;
    description: string;
}

export interface Objective {
    icon: string;
    title: string;
    items: string[];
}

export interface Approach {
    icon: string;
    title: string;
    description: string;
}

export interface ChallengeItem {
    icon: string;
    text: string;
}

export interface VisionStatement {
    title: string;
    mainStatement: string;
    goals: string[];
}


export interface HomeData {
    _id: string;
    _type: 'home';
    missionStatements: string[];
    missionInfo: {
        percentage: number;
        text: string;
        list: string[];
    };
    visionStatement: VisionStatement;
    services: Service[];
}

export interface AboutData {
    _id: string;
    _type: 'about';
    challengeData: {
        statistic: number;
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
    };
}

export interface FooterData {
    _id: string;
    _type: 'footer';
    programLinks: Link[];
}



