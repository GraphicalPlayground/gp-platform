import React from 'react';
import AnnouncementCard from './AnnouncementCard.jsx';

export default { title: 'Components/AnnouncementCard' };

const ann = { id: 'a1', type: 'new', title: 'Welcome!', body: 'Welcome to the platform', at: 'now', read: false };

export const Example = () => <AnnouncementCard ann={ann} onDismiss={(id) => console.log('dismiss', id)} />;
