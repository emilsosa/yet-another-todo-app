export interface Todo {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	deleted: boolean;
	archived: boolean;
}
