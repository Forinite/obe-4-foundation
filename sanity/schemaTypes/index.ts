//sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity';
import home from './home';
import about from './about';
import contact from './contact';
import galleryImage from './gallery';
import footer from './footer';
import link from './objects/links';
import openDay from './objects/openDay';
import service from './objects/service';
import objective from './objects/objective';
import approach from './objects/approach';
import challengeItem from './objects/challengeItem';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    about,
    contact,
    galleryImage,
    footer,
    link,
    openDay,
    service,
    objective,
    approach,
    challengeItem,
  ],
};