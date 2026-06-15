export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Project {
  name: string;
  url: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  referred_by: string | null;
  building: string;
  link: string;
  projects: Project[] | string;
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
