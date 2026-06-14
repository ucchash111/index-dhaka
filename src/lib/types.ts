export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Application {
  id: string;
  name: string;
  email: string;
  building: string;
  link: string;
  status: ApplicationStatus;
  created_at: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  building: string;
  featured: boolean;
  avatar_url: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  type: "weekly" | "dinner" | "showcase";
  date: string;
  location: string;
  description: string;
  created_at: string;
}
