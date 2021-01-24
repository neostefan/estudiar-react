const engineering_depts = [
    "Systems",
    "Electrical",
    "Mechanical",
    "Chemical",
    "Petrochemical",
    "Biomedical",
    "Surveying"
];

const science_depts = [
    "Geology",
    "Pharmacy",
    "Marine Biology",
    "Zoology"
]

const faculties = [
    "Engineering",
    "Science"
];

const years = [
    1,
    2,
    3,
    4,
    5
]

const checkErrorItem = (arr, type) => {
    if(arr.length > 0) {
        return arr.find(item => (item.type === type));
    } else {
        return undefined;
    }
}

export {
    engineering_depts,
    science_depts,
    faculties,
    years,
    checkErrorItem
}
