export enum Priority {
  Low,
  Medium,
  High
}

export default interface Task {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  status: boolean;
  priority: Priority;
}