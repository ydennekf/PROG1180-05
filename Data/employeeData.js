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
            "pageLength": 10,
            "newReports": []
        },

        
    },
    {
        "username": "asmith",
        "firstName": "Alice",
        "lastName": "Smith",
        "department": "engineering",
        "password": "engineer123",
        "accessibilityPreferences": {
            "darkMode": true,
            "preferredLanguage": "es",
            "recentReports":[],
            "pageLength": 10,
            "newReports": []
        },
        getFormalName:function (){
            return this.firstName + " " + this.lastName
        }
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
            "pageLength": 10,
            "newReports": []
        },

    
    },
    {
        "username": "lwhite",
        "firstName": "Linda",
        "lastName": "White",
        "department": "purchasing",
        "password": "sales123",
        "accessibilityPreferences": {
            "darkMode": true,
            "preferredLanguage": "en",
            "recentReports":[],
            "pageLength": 10,
            "newReports": []
        },

    }
];


export function getEmployeeByUsername(username){
    return employees.find(e => e.username === username)
}