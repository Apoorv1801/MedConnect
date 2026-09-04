// Shared bookings store (mock, localStorage-based).
//
// Both the Tests module and the upcoming Doctor Appointments module should
// save bookings here using a common shape, so the dashboard can show both
// types together in one place. When the backend exists, this becomes:
//   GET  /api/bookings        (filtered to the logged-in user via JWT)
//   POST /api/bookings
//   PATCH /api/bookings/{id}  (status changes, e.g. cancellation)
//
// COMMON SHAPE — every booking must have these fields regardless of type:
// {
//   id: string,
//   type: "test" | "appointment",
//   userEmail: string,
//   status: "upcoming" | "completed" | "cancelled",
//   date: "YYYY-MM-DD",
//   slot: string,
//   createdAt: ISO timestamp,
// }
//
// TYPE-SPECIFIC FIELDS:
// - "test" bookings additionally have: labId, labName, items (array of
//   {testId, testName, price}), total, mode ("visit" | "home"), phone,
//   address (nullable)
// - "appointment" bookings (for the doctor booking flow) should additionally
//   have something like: doctorName, specialty, hospitalName, fee,
//   mode ("in-person" | "video") — exact fields are up to that flow, as
//   long as `type: "appointment"`, `date`, `slot`, and `status` are present,
//   since those four are what the dashboard actually reads to render a
//   booking generically before rendering type-specific details.

const STORAGE_KEY = "medconnect_bookings";

function readAll() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeAll(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function saveBooking(booking) {
    const bookings = readAll();
    bookings.push(booking);
    writeAll(bookings);
}

export function getBookingsForUser(userEmail) {
    return readAll().filter((b) => b.userEmail === userEmail);
}

export function updateBookingStatus(id, status) {
    const bookings = readAll();
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    writeAll(updated);
}

export function rescheduleBooking(id, newDate, newSlot) {
    const bookings = readAll();
    const updated = bookings.map((b) =>
        b.id === id ? { ...b, date: newDate, slot: newSlot } : b
    );
    writeAll(updated);
}