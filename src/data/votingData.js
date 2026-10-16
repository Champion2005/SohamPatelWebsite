// Expiry timestamps formatted in Eastern Time (America/Toronto / Windsor, ON)
// Each entry expires at the end of its respective voting day (23:59:59 EDT)
export const advanceVotingData = [
  {
    id: 'mic-mac',
    date: 'Sat, Oct 17',
    time: '10am – 6pm',
    specialBadge: 'Drive-Thru',
    locationName: 'Mic Mac Park',
    address: '1125 Prince Rd (enter via Matchette Rd)',
    copyText: '1125 Prince Rd, Windsor, ON',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=1125+Prince+Rd+Windsor+ON',
    expiresAt: '2026-10-17T23:59:59-04:00'
  },
  {
    id: 'precious-blood',
    date: 'Mon, Oct 19',
    time: '10am – 8pm',
    specialBadge: null,
    locationName: 'Most Precious Blood Parish',
    address: '1947 Meldrum Rd',
    copyText: '1947 Meldrum Rd, Windsor, ON',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=1947+Meldrum+Rd+Windsor+ON',
    expiresAt: '2026-10-19T23:59:59-04:00'
  }
];

export const electionDayData = {
  date: 'Mon, Oct 26',
  time: '10am – 8pm',
  note: 'Vote at any Ward 9 location',
  expiresAt: '2026-10-26T23:59:59-04:00',
  locations: [
    {
      id: 'ed-1',
      code: '9-1',
      name: 'Signature Tributes Event Centre',
      address: '3310 Dougall Avenue',
      copyText: '3310 Dougall Avenue, Windsor, ON',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=3310+Dougall+Avenue+Windsor+ON'
    },
    {
      id: 'ed-2',
      code: '9-2',
      name: 'Devonwood Community Church',
      address: '3407 Woodward Boulevard',
      copyText: '3407 Woodward Boulevard, Windsor, ON',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=3407+Woodward+Boulevard+Windsor+ON'
    },
    {
      id: 'ed-3',
      code: '9-3',
      name: 'Windsor Christian Fellowship Church',
      address: '4490 Seventh Concession Road',
      copyText: '4490 Seventh Concession Road, Windsor, ON',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=4490+Seventh+Concession+Road+Windsor+ON'
    },
    {
      id: 'ed-4',
      code: '9-4',
      name: 'Roseland Trinity United Church',
      address: '3919 Howard Avenue',
      copyText: '3919 Howard Avenue, Windsor, ON',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=3919+Howard+Avenue+Windsor+ON'
    }
  ]
};
