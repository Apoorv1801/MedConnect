// Centralized cancellation/reschedule policy for test bookings.
// Keeping these as named constants (rather than scattered magic numbers)
// means changing the business rule later is a one-line edit here, not a
// hunt through every component. These should eventually be enforced
// server-side too — a client-side check alone can be bypassed by anyone
// who edits requests directly or changes their device clock.

export const CANCEL_CUTOFF_HOURS = 4;
export const RESCHEDULE_CUTOFF_HOURS = 6;

// Parses a slot string like "9:00 AM - 11:00 AM" combined with a
// "YYYY-MM-DD" date into a Date representing the slot's START time.
export function getSlotStartDateTime(dateStr, slotStr) {
    if (!dateStr || !slotStr) return null;

    const startPart = slotStr.split(" - ")[0].trim(); // e.g. "9:00 AM"
    const [time, meridiem] = startPart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

export function getHoursUntilSlot(dateStr, slotStr) {
    const slotStart = getSlotStartDateTime(dateStr, slotStr);
    if (!slotStart) return null;
    return (slotStart.getTime() - Date.now()) / (1000 * 60 * 60);
}

// A booking's *displayed* status is derived, not just read from
// booking.status — a booking can still say "upcoming" in storage while
// its slot has already passed, so we check the actual time too.
export function getBookingDisplayStatus(booking) {
    if (booking.status === "cancelled") return "cancelled";

    const hoursUntil = getHoursUntilSlot(booking.date, booking.slot);
    if (hoursUntil !== null && hoursUntil < 0) return "completed";

    return "upcoming";
}

export function canCancelBooking(booking) {
    if (getBookingDisplayStatus(booking) !== "upcoming") return false;
    const hoursUntil = getHoursUntilSlot(booking.date, booking.slot);
    return hoursUntil !== null && hoursUntil >= CANCEL_CUTOFF_HOURS;
}

export function canRescheduleBooking(booking) {
    if (getBookingDisplayStatus(booking) !== "upcoming") return false;
    const hoursUntil = getHoursUntilSlot(booking.date, booking.slot);
    return hoursUntil !== null && hoursUntil >= RESCHEDULE_CUTOFF_HOURS;
}