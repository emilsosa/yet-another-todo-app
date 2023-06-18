export interface Todo {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	archived: boolean;
	tags: TodoTag[];
}

export interface TodoTag {
	id: number;
	name: string;
}
