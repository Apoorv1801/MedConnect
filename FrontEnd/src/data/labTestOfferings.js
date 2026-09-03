const labTestOfferings =
    [
        {
            "id": 1,
            "testId": 1,
            "labId": 2,
            "price": 299,
            "homeCollectionAvailable": true,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 2,
            "testId": 1,
            "labId": 3,
            "price": 348,
            "homeCollectionAvailable": true,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 3,
            "testId": 1,
            "labId": 4,
            "price": 452,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 4,
            "testId": 2,
            "labId": 4,
            "price": 499,
            "homeCollectionAvailable": true,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 5,
            "testId": 2,
            "labId": 1,
            "price": 611,
            "homeCollectionAvailable": true,
            "turnaroundTime": "Same day"
        },
        {
            "id": 6,
            "testId": 2,
            "labId": 5,
            "price": 546,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 7,
            "testId": 2,
            "labId": 2,
            "price": 647,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 8,
            "testId": 3,
            "labId": 1,
            "price": 399,
            "homeCollectionAvailable": false,
            "turnaroundTime": "Same day"
        },
        {
            "id": 9,
            "testId": 3,
            "labId": 4,
            "price": 519,
            "homeCollectionAvailable": true,
            "turnaroundTime": "Same day"
        },
        {
            "id": 10,
            "testId": 3,
            "labId": 5,
            "price": 567,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 11,
            "testId": 4,
            "labId": 2,
            "price": 149,
            "homeCollectionAvailable": true,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 12,
            "testId": 4,
            "labId": 5,
            "price": 201,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 13,
            "testId": 4,
            "labId": 1,
            "price": 260,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 14,
            "testId": 5,
            "labId": 1,
            "price": 449,
            "homeCollectionAvailable": true,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 15,
            "testId": 5,
            "labId": 2,
            "price": 598,
            "homeCollectionAvailable": false,
            "turnaroundTime": "Same day"
        },
        {
            "id": 16,
            "testId": 5,
            "labId": 3,
            "price": 541,
            "homeCollectionAvailable": true,
            "turnaroundTime": "Same day"
        },
        {
            "id": 17,
            "testId": 6,
            "labId": 4,
            "price": 599,
            "homeCollectionAvailable": false,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 18,
            "testId": 6,
            "labId": 3,
            "price": 724,
            "homeCollectionAvailable": false,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 19,
            "testId": 6,
            "labId": 2,
            "price": 727,
            "homeCollectionAvailable": false,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 20,
            "testId": 7,
            "labId": 1,
            "price": 899,
            "homeCollectionAvailable": false,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 21,
            "testId": 7,
            "labId": 2,
            "price": 957,
            "homeCollectionAvailable": false,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 22,
            "testId": 7,
            "labId": 4,
            "price": 963,
            "homeCollectionAvailable": false,
            "turnaroundTime": "48 hrs"
        },
        {
            "id": 23,
            "testId": 8,
            "labId": 1,
            "price": 199,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 24,
            "testId": 8,
            "labId": 2,
            "price": 244,
            "homeCollectionAvailable": true,
            "turnaroundTime": "12 hrs"
        },
        {
            "id": 25,
            "testId": 8,
            "labId": 3,
            "price": 299,
            "homeCollectionAvailable": true,
            "turnaroundTime": "Same day"
        },
        {
            "id": 26,
            "testId": 8,
            "labId": 4,
            "price": 251,
            "homeCollectionAvailable": true,
            "turnaroundTime": "Same day"
        },
        {
            "id": 27,
            "testId": 9,
            "labId": 5,
            "price": 349,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 28,
            "testId": 9,
            "labId": 1,
            "price": 496,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 29,
            "testId": 9,
            "labId": 2,
            "price": 378,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 30,
            "testId": 10,
            "labId": 4,
            "price": 799,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        },
        {
            "id": 31,
            "testId": 10,
            "labId": 3,
            "price": 920,
            "homeCollectionAvailable": true,
            "turnaroundTime": "6 hrs"
        },
        {
            "id": 32,
            "testId": 10,
            "labId": 5,
            "price": 853,
            "homeCollectionAvailable": true,
            "turnaroundTime": "24 hrs"
        }
    ]
    ;

export default labTestOfferings;