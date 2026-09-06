// MOCK slot availability tracker.
//
// This only works within one browser (localStorage), so it can't actually
// prevent two different users from double-booking the same slot at the same
// time — that requires a real backend with a database transaction/lock.
// This exists purely so the UI (disabled/full slots, "X left" labels) is
// fully built and ready to swap over once the real API exists, e.g.:
//   GET  /api/labs/{labId}/slot-availability?date=&slot=
//   POST /api/bookings  (backend rejects if slot is full, atomically)

const STORAGE_KEY = "medconnect_slot_bookings";

export const SLOT_CAPACITY = 5;

function readStore() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function slotKey(labId, date, slot) {
    return `${labId}__${date}__${slot}`;
}

export function getSlotCount(labId, date, slot) {
    const store = readStore();
    return store[slotKey(labId, date, slot)] || 0;
}

export function isSlotFull(labId, date, slot) {
    return getSlotCount(labId, date, slot) >= SLOT_CAPACITY;
}

export function bookSlot(labId, date, slot) {
    const store = readStore();
    const key = slotKey(labId, date, slot);
    store[key] = (store[key] || 0) + 1;
    writeStore(store);
}

// Frees a slot — must be called whenever a booking is cancelled or
// rescheduled away from this slot, otherwise capacity is permanently
// "used up" even though no one actually holds it anymore.
export function unbookSlot(labId, date, slot) {
    const store = readStore();
    const key = slotKey(labId, date, slot);
    if (store[key]) {
        store[key] = Math.max(0, store[key] - 1);
        writeStore(store);
    }
}

// Test bookings and appointment bookings share this same slot store, but
// each type keys it differently: test bookings pass their raw numeric
// labId (unchanged, so existing bookings already in localStorage keep
// working), while appointment bookings are prefixed with "doctor-" so a
// doctor's numeric id (e.g. 3) can never collide with a lab's numeric id
// (e.g. 3) in the shared store. Anything reading/writing slot counts for
// a saved booking (Dashboard's cancel/reschedule, for example) should go
// through this instead of reading booking.labId directly.
export function getBookingResourceKey(booking) {
    if (booking.type === "appointment") {
        return `doctor-${booking.doctorId}`;
    }
    return booking.labId;
}