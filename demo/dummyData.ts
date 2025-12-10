
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
];
