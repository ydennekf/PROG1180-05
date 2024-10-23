// sample employee Data for testing.
export let employees = [
    {
        "username": "jdoe",
        "firstName": "John",
        "lastName": "Doe",
        "department": "admin",
        "password": "admin123",
        "accessibilityPreferences": {
            "darkMode": false,
            "preferredLanguage": "en",
            "recentReports":[],
            "pageLength": 10
        },
        
    },
    {
        "username": "asmith",
        "firstName": "Alice",
        "lastName": "Smith",
        "department": "engineering",
        "password": "eningeer123",
        "accessibilityPreferences": {
            "darkMode": true,
            "preferredLanguage": "es",
            "recentReports":[],
            "pageLength": 10
        },
    },
    {
        "username": "btaylor",
        "firstName": "Bob",
        "lastName": "Taylor",
        "department": "QA",
        "password": "QA123",
        "accessibilityPreferences": {
            "darkMode": false,
            "preferredLanguage": "fr",
            "recentReports":[],
            "pageLength": 10
        },
    
    },
    {
        "username": "lwhite",
        "firstName": "Linda",
        "lastName": "White",
        "department": "sales",
        "password": "sales123",
        "accessibilityPreferences": {
            "darkMode": true,
            "preferredLanguage": "en",
            "recentReports":[],
            "pageLength": 10
        },
    }
];


export function getEmployeeByUsername(username){
    return employees.find(e => e.username === username)
}