import { Priority } from "./Priority";

export interface Task {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    status: boolean;
    priority: Priority;
  }