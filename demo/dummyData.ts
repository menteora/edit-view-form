
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
}

export const DUMMY_USERS: User[] = [
    { id: 1, name: "Mario Rossi", email: "mario.rossi@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Luigi Verdi", email: "luigi.verdi@example.com", role: "User", status: "Active" },
    { id: 3, name: "Giovanna Bianchi", email: "giovanna.bianchi@example.com", role: "Editor", status: "Inactive" },
    { id: 4, name: "Anna Neri", email: "anna.neri@example.com", role: "User", status: "Active" },
    { id: 5, name: "Paolo Gialli", email: "paolo.gialli@example.com", role: "Admin", status: "Active" },
    { id: 6, name: "Giulia Bianchi", email: "giulia.bianchi@example.com", role: "User", status: "Active" },
    { id: 7, name: "Roberto Neri", email: "roberto.neri@example.com", role: "Editor", status: "Active" },
    { id: 8, name: "Elena Verde", email: "elena.verde@example.com", role: "Admin", status: "Inactive" },
    { id: 9, name: "Marco Blu", email: "marco.blu@example.com", role: "User", status: "Active" },
    { id: 10, name: "Sofia Rosa", email: "sofia.rosa@example.com", role: "User", status: "Inactive" },
    { id: 11, name: "Alessandro Viola", email: "alessandro.viola@example.com", role: "Editor", status: "Active" },
    { id: 12, name: "Chiara Arancio", email: "chiara.arancio@example.com", role: "Admin", status: "Active" },
    { id: 13, name: "Davide Marrone", email: "davide.marrone@example.com", role: "User", status: "Active" },
    { id: 14, name: "Valentina Turchese", email: "valentina.turchese@example.com", role: "User", status: "Active" },
    { id: 15, name: "Lorenzo Grigi", email: "lorenzo.grigi@example.com", role: "Editor", status: "Inactive" },
];