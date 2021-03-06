const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Play volleyball' },
        'task-2': { id: 'task-2', content: 'Learn react' },
        'task-3': { id: 'task-3', content: 'Work' },
        'task-4': { id: 'task-4', content: 'Watch The Walking Dead show' },
        'task-5': { id: 'task-5', content: 'Disabled task' },
        'task-6': { id: 'task-6', content: 'Drink coke' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-3', 'task-5', 'task-6'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Doing',
            taskIds: ['task-2', 'task-4'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-1'],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;