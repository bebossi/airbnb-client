export interface User {
  id: number;
  email: string;
  emailVerified: Date;
  image: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: Array<number>;

  accounts: Account[];
  listings: Listing[];
  reservations: Reservation[];
}

export interface Account {
  id: number;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: number;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  tokenType: string;
  scope: string;
  tokenId: string;
  sessionState: string;

  user: User;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: number;
  price: number;

  user: User;
  reservations: Reservation[];
}

export interface Reservation {
  id: number;
  userId: number;
  listingId: number;
  startDate: number;
  endDate: number;
  totalPrice: number;
  createdAt: number;

  user: User;
  listing: Listing;
}
