// hospitalId links a lab to the hospital it's physically run out of.
// Not every lab is hospital-run — most are standalone diagnostic chains,
// hence hospitalId is null for them. Only linked when the lab and hospital
// are genuinely in the same city, since a hospital-run lab wouldn't be in
// a different city from its hospital.
const labsData = [
    { id: 1, name: "Apollo Diagnostics", city: "Vadodara", rating: 4.6, hospitalId: 1 },
    { id: 2, name: "SRL Diagnostics", city: "Vadodara", rating: 4.3, hospitalId: null },
    { id: 3, name: "Metropolis Healthcare", city: "Vadodara", rating: 4.5, hospitalId: null },
    { id: 4, name: "Thyrocare", city: "Vadodara", rating: 4.2, hospitalId: null },
    { id: 5, name: "Dr Lal PathLabs", city: "Vadodara", rating: 4.4, hospitalId: null },
];

export default labsData;