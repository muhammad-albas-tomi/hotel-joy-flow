// Mock data for Hotel Booking System

export interface RoomType {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  available: number;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
  createdAt: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  roomTypeId: string;
  status: "available" | "occupied" | "maintenance" | "reserved" | "cleaning";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";
  status: "active" | "suspended";
  createdAt: string;
}

export const roomTypes: RoomType[] = [
  {
    id: "1",
    name: "Economy Room",
    category: "economy",
    description:
      "Cozy and affordable room perfect for solo travelers or couples. Features essential amenities for a comfortable stay.",
    price: 450000,
    capacity: 2,
    size: 20,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "TV",
      "Private Bathroom",
      "Towels",
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
    ],
    available: 5,
  },
  {
    id: "2",
    name: "Standard Room",
    category: "standard",
    description:
      "Spacious room with modern amenities and comfortable furnishings. Ideal for business travelers and leisure guests.",
    price: 750000,
    capacity: 2,
    size: 28,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Coffee Maker",
    ],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    ],
    available: 8,
  },
  {
    id: "3",
    name: "Deluxe Room",
    category: "deluxe",
    description:
      "Elegant room with premium amenities, city views, and luxurious bedding. Perfect for a memorable stay.",
    price: 1200000,
    capacity: 2,
    size: 35,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Coffee Maker",
      "Bathrobe",
      "City View",
      "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
    ],
    available: 4,
  },
  {
    id: "4",
    name: "Suite Room",
    category: "suite",
    description:
      "Luxurious suite with separate living area, premium amenities, and stunning views. The ultimate comfort experience.",
    price: 2500000,
    capacity: 3,
    size: 55,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Coffee Maker",
      "Bathrobe",
      "Panoramic View",
      "Room Service",
      "Living Room",
      "Jacuzzi",
      "Butler Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800",
    ],
    available: 2,
  },
  {
    id: "5",
    name: "Family Room",
    category: "family",
    description:
      "Spacious room designed for families with multiple beds, kid-friendly amenities, and extra space for everyone.",
    price: 1800000,
    capacity: 5,
    size: 50,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Coffee Maker",
      "Extra Beds",
      "Kids Amenities",
      "Connecting Rooms Available",
    ],
    images: [
      "https://images.unsplash.com/photo-1594560913095-8cf34bab82ad?w=800",
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800",
    ],
    available: 3,
  },
];

export const rooms: Room[] = [
  { id: "1", number: "101", floor: 1, roomTypeId: "1", status: "available" },
  { id: "2", number: "102", floor: 1, roomTypeId: "1", status: "occupied" },
  { id: "3", number: "103", floor: 1, roomTypeId: "1", status: "available" },
  { id: "4", number: "201", floor: 2, roomTypeId: "2", status: "available" },
  { id: "5", number: "202", floor: 2, roomTypeId: "2", status: "maintenance" },
  { id: "6", number: "203", floor: 2, roomTypeId: "2", status: "available" },
  { id: "7", number: "301", floor: 3, roomTypeId: "3", status: "reserved" },
  { id: "8", number: "302", floor: 3, roomTypeId: "3", status: "available" },
  { id: "9", number: "401", floor: 4, roomTypeId: "4", status: "available" },
  { id: "10", number: "402", floor: 4, roomTypeId: "4", status: "occupied" },
  { id: "11", number: "501", floor: 5, roomTypeId: "5", status: "available" },
  { id: "12", number: "502", floor: 5, roomTypeId: "5", status: "cleaning" },
];

export const bookings: Booking[] = [
  {
    id: "BK001",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+62 812 3456 7890",
    roomType: "Deluxe Room",
    roomNumber: "301",
    checkIn: "2026-01-03",
    checkOut: "2026-01-05",
    adults: 2,
    children: 0,
    totalPrice: 2400000,
    status: "confirmed",
    createdAt: "2026-01-01",
  },
  {
    id: "BK002",
    guestName: "Jane Smith",
    guestEmail: "jane@example.com",
    guestPhone: "+62 813 4567 8901",
    roomType: "Suite Room",
    roomNumber: "402",
    checkIn: "2026-01-03",
    checkOut: "2026-01-07",
    adults: 2,
    children: 1,
    totalPrice: 10000000,
    status: "checked-in",
    createdAt: "2025-12-28",
  },
  {
    id: "BK003",
    guestName: "Ahmad Rizki",
    guestEmail: "ahmad@example.com",
    guestPhone: "+62 814 5678 9012",
    roomType: "Standard Room",
    roomNumber: "201",
    checkIn: "2026-01-04",
    checkOut: "2026-01-06",
    adults: 1,
    children: 0,
    totalPrice: 1500000,
    status: "pending",
    specialRequests: "Early check-in if possible",
    createdAt: "2026-01-02",
  },
  {
    id: "BK004",
    guestName: "Maria Garcia",
    guestEmail: "maria@example.com",
    guestPhone: "+62 815 6789 0123",
    roomType: "Family Room",
    roomNumber: "501",
    checkIn: "2026-01-05",
    checkOut: "2026-01-08",
    adults: 2,
    children: 2,
    totalPrice: 5400000,
    status: "pending",
    specialRequests: "Need extra bed for children",
    createdAt: "2026-01-03",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@hotel.com",
    role: "admin",
    status: "active",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Staff Member",
    email: "staff@hotel.com",
    role: "staff",
    status: "active",
    createdAt: "2025-06-15",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    createdAt: "2025-11-20",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    status: "active",
    createdAt: "2025-12-01",
  },
];

export const hotelInfo = {
  name: "Grand Azure Hotel",
  tagline: "Where Luxury Meets Comfort",
  description:
    "Experience unparalleled hospitality at Grand Azure Hotel. Located in the heart of the city, we offer world-class amenities, stunning views, and personalized service that will make your stay unforgettable.",
  address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220",
  phone: "+62 21 1234 5678",
  email: "info@grandazure.com",
  whatsapp: "+62 812 9876 5432",
  socialMedia: {
    instagram: "@grandazurehotel",
    facebook: "grandazurehotel",
    twitter: "@grandazure",
  },
  checkInTime: "14:00",
  checkOutTime: "12:00",
  coordinates: { lat: -6.2088, lng: 106.8456 },
};

export const facilities = [
  { name: "Free WiFi", icon: "Wifi" },
  { name: "Swimming Pool", icon: "Waves" },
  { name: "Restaurant", icon: "UtensilsCrossed" },
  { name: "Fitness Center", icon: "Dumbbell" },
  { name: "Spa & Wellness", icon: "Sparkles" },
  { name: "Free Parking", icon: "Car" },
  { name: "24/7 Reception", icon: "Clock" },
  { name: "Room Service", icon: "ConciergeBell" },
  { name: "Laundry", icon: "Shirt" },
  { name: "Airport Shuttle", icon: "Plane" },
  { name: "Business Center", icon: "Briefcase" },
  { name: "Meeting Rooms", icon: "Users" },
];

export const otaLinks = [
  { name: "Agoda", url: "https://agoda.com", logo: "🏨" },
  { name: "Booking.com", url: "https://booking.com", logo: "🔵" },
  { name: "Traveloka", url: "https://traveloka.com", logo: "🟢" },
  { name: "Expedia", url: "https://expedia.com", logo: "🟡" },
  { name: "Airbnb", url: "https://airbnb.com", logo: "🔴" },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
