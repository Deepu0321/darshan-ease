export interface Temple {
  id: string;
  name: string;
  location: string;
  state: string;
  description: string;
  image: string;
  rating: number;
  timings: string;
  facilities: string[];
  category: "Ancient" | "Popular" | "Heritage" | "Pilgrimage";
  featured?: boolean;
}

export interface Slot {
  id: string;
  templeId: string;
  date: string;
  time: string;
  seats: number;
  totalSeats: number;
  price: number;
  type: "Regular" | "Special" | "VIP";
}

export interface Booking {
  id: string;
  templeId: string;
  templeName: string;
  date: string;
  time: string;
  persons: number;
  amount: number;
  status: "Upcoming" | "Completed" | "Cancelled";
  ticketNo: string;
}

export interface Donation {
  id: string;
  templeId: string;
  templeName: string;
  amount: number;
  method: "UPI" | "Card" | "Netbanking";
  date: string;
}

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=70`;

export const temples: Temple[] = [
  { id: "t1", name: "Somnath Temple", location: "Prabhas Patan", state: "Gujarat", description: "One of the twelve Jyotirlinga shrines of Lord Shiva, standing majestically on the Arabian Sea shore.", image: img("photo-1609858056921-c530b7db2338"), rating: 4.9, timings: "6:00 AM – 9:30 PM", facilities: ["Prasadam", "Wheelchair", "Locker", "Parking"], category: "Ancient", featured: true },
  { id: "t2", name: "Tirupati Balaji", location: "Tirumala", state: "Andhra Pradesh", description: "The world's most visited shrine, home to Lord Venkateswara atop the Tirumala hills.", image: img("photo-1582719471384-894fbb16e074"), rating: 4.95, timings: "3:00 AM – 12:00 AM", facilities: ["Prasadam", "Cloak Room", "Free Meals", "Guest House"], category: "Pilgrimage", featured: true },
  { id: "t3", name: "Kashi Vishwanath", location: "Varanasi", state: "Uttar Pradesh", description: "The sacred abode of Lord Shiva on the banks of the holy Ganga in Varanasi.", image: img("photo-1561361513-2d000a50f0dc"), rating: 4.85, timings: "2:30 AM – 11:00 PM", facilities: ["Prasadam", "Ganga Aarti", "Priest Assistance"], category: "Ancient", featured: true },
  { id: "t4", name: "Meenakshi Amman", location: "Madurai", state: "Tamil Nadu", description: "A stunning temple complex dedicated to Goddess Meenakshi and Lord Sundareswarar.", image: img("photo-1621996659490-3275b4d0d951"), rating: 4.8, timings: "5:00 AM – 10:00 PM", facilities: ["Prasadam", "Museum", "Parking"], category: "Heritage", featured: true },
  { id: "t5", name: "Jagannath Puri", location: "Puri", state: "Odisha", description: "Home to Lord Jagannath, famous for the annual Rath Yatra festival.", image: img("photo-1590077428593-a55bb07c4665"), rating: 4.88, timings: "5:00 AM – 9:00 PM", facilities: ["Prasadam", "Mahaprasad Hall", "Parking"], category: "Pilgrimage" },
  { id: "t6", name: "Golden Temple", location: "Amritsar", state: "Punjab", description: "The holiest Gurdwara of Sikhism, radiating peace and community service.", image: img("photo-1588083949404-c4f1ed1323b3"), rating: 4.97, timings: "24 Hours", facilities: ["Langar", "Sarovar", "Museum", "Rest House"], category: "Popular" },
  { id: "t7", name: "Kedarnath", location: "Rudraprayag", state: "Uttarakhand", description: "A sacred Himalayan shrine perched at 3,583 m, part of the Char Dham Yatra.", image: img("photo-1626621341517-bbf3d9990a23"), rating: 4.9, timings: "4:00 AM – 9:00 PM", facilities: ["Palki", "Medical Camp", "Helipad"], category: "Pilgrimage" },
  { id: "t8", name: "Sabarimala Ayyappa", location: "Pathanamthitta", state: "Kerala", description: "Forest shrine of Lord Ayyappa deep in the Western Ghats.", image: img("photo-1580500550469-7be5cbc0ac52"), rating: 4.82, timings: "4:00 AM – 11:00 PM", facilities: ["Prasadam", "Guides", "Rest Area"], category: "Popular" },
];

export const slots: Slot[] = temples.flatMap((t, i) => [
  { id: `${t.id}-s1`, templeId: t.id, date: "2026-07-10", time: "06:00 AM", seats: 32 + i, totalSeats: 100, price: 100, type: "Regular" },
  { id: `${t.id}-s2`, templeId: t.id, date: "2026-07-10", time: "10:30 AM", seats: 12, totalSeats: 60, price: 300, type: "Special" },
  { id: `${t.id}-s3`, templeId: t.id, date: "2026-07-11", time: "04:00 PM", seats: 8, totalSeats: 30, price: 750, type: "VIP" },
  { id: `${t.id}-s4`, templeId: t.id, date: "2026-07-12", time: "07:00 AM", seats: 45, totalSeats: 100, price: 100, type: "Regular" },
]);

export const bookings: Booking[] = [
  { id: "b1", templeId: "t1", templeName: "Somnath Temple", date: "2026-07-10", time: "06:00 AM", persons: 2, amount: 200, status: "Upcoming", ticketNo: "DE-8842" },
  { id: "b2", templeId: "t3", templeName: "Kashi Vishwanath", date: "2026-07-15", time: "05:00 AM", persons: 4, amount: 400, status: "Upcoming", ticketNo: "DE-8843" },
  { id: "b3", templeId: "t2", templeName: "Tirupati Balaji", date: "2026-06-01", time: "09:00 AM", persons: 3, amount: 900, status: "Completed", ticketNo: "DE-8721" },
  { id: "b4", templeId: "t4", templeName: "Meenakshi Amman", date: "2026-05-19", time: "07:00 AM", persons: 2, amount: 200, status: "Cancelled", ticketNo: "DE-8613" },
  { id: "b5", templeId: "t6", templeName: "Golden Temple", date: "2026-04-11", time: "10:00 AM", persons: 5, amount: 500, status: "Completed", ticketNo: "DE-8511" },
];

export const donations: Donation[] = [
  { id: "d1", templeId: "t1", templeName: "Somnath Temple", amount: 1100, method: "UPI", date: "2026-06-20" },
  { id: "d2", templeId: "t2", templeName: "Tirupati Balaji", amount: 5100, method: "Card", date: "2026-06-05" },
  { id: "d3", templeId: "t6", templeName: "Golden Temple", amount: 2100, method: "Netbanking", date: "2026-05-14" },
];

export const monthlyStats = [
  { month: "Jan", bookings: 420, donations: 32000, revenue: 84000 },
  { month: "Feb", bookings: 510, donations: 41000, revenue: 96000 },
  { month: "Mar", bookings: 605, donations: 47500, revenue: 118000 },
  { month: "Apr", bookings: 720, donations: 52000, revenue: 141000 },
  { month: "May", bookings: 812, donations: 61000, revenue: 158000 },
  { month: "Jun", bookings: 905, donations: 68500, revenue: 174000 },
  { month: "Jul", bookings: 980, donations: 71000, revenue: 189000 },
];

export const testimonials = [
  { name: "Priya Sharma", role: "Devotee, Delhi", quote: "Booking Somnath darshan took two minutes. No queues, no confusion – DarshanEase is a blessing.", avatar: "https://i.pravatar.cc/120?img=47" },
  { name: "Rahul Iyer", role: "Devotee, Bengaluru", quote: "Beautifully designed. My family booked Tirupati VIP darshan and even donated online, all in one place.", avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Anjali Verma", role: "Devotee, Mumbai", quote: "The temple guides, timings and facilities info is incredibly detailed. Highly recommend.", avatar: "https://i.pravatar.cc/120?img=32" },
];

export const faqs = [
  { q: "How do I book a darshan slot?", a: "Browse temples, open the temple detail page, pick a slot and confirm the number of persons. You'll receive an e-ticket instantly." },
  { q: "Can I cancel my booking?", a: "Yes. Upcoming bookings can be cancelled up to 6 hours before the scheduled darshan time from your Bookings page." },
  { q: "Are donations tax-exempt?", a: "Donations made through DarshanEase to registered trusts receive an 80G receipt via email within 24 hours." },
  { q: "Is DarshanEase safe?", a: "All payments are processed over encrypted channels and your personal details are never shared with third parties." },
];

export const adminUsers = [
  { id: "u1", name: "Priya Sharma", email: "priya@example.com", role: "USER", joined: "2026-01-14", bookings: 12 },
  { id: "u2", name: "Rahul Iyer", email: "rahul@example.com", role: "USER", joined: "2026-02-02", bookings: 8 },
  { id: "u3", name: "Anjali Verma", email: "anjali@example.com", role: "USER", joined: "2026-02-19", bookings: 5 },
  { id: "u4", name: "Somnath Trust", email: "organizer@somnath.org", role: "ORGANIZER", joined: "2025-12-01", bookings: 0 },
  { id: "u5", name: "Tirupati Board", email: "organizer@ttd.org", role: "ORGANIZER", joined: "2025-11-11", bookings: 0 },
  { id: "u6", name: "Root Admin", email: "admin@darshanease.in", role: "ADMIN", joined: "2025-10-01", bookings: 0 },
];